import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

const SUPPORTED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
];

/**
 * Validates image file format and size limits.
 */
export function validateImageFile(file: File, maxMb: number = 5): ImageValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  const isTypeSupported = SUPPORTED_TYPES.includes(file.type.toLowerCase()) || file.type.startsWith('image/');
  if (!isTypeSupported) {
    return {
      valid: false,
      error: `Unsupported image format (${file.type || 'unknown'}). Please upload JPEG, PNG, WEBP, GIF, or SVG.`
    };
  }

  const maxBytes = maxMb * 1024 * 1024;
  if (file.size > maxBytes) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds maximum allowed size of ${maxMb} MB.`
    };
  }

  return { valid: true };
}

/**
 * Automatically compresses and resizes images client-side for fast loading.
 */
export function compressImage(
  file: File,
  maxWidth: number = 1000,
  maxHeight: number = 1000,
  quality: number = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Return original data URL if SVG or GIF to preserve animation / vectors
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved scaling
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Clean rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as webp or jpeg
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        // Fallback to uncompressed data URL if canvas fails
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads compressed service image to Firebase Storage (or fallback to persistent data URL).
 */
export async function uploadServiceImage(file: File): Promise<string> {
  const validation = validateImageFile(file, 5);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid image file');
  }

  // 1. Compress image client-side
  const compressedDataUrl = await compressImage(file, 1000, 1000, 0.85);

  // 2. Try Firebase Storage upload
  try {
    const filename = `service_images/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const storageRef = ref(storage, filename);
    await uploadString(storageRef, compressedDataUrl, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (storageErr: any) {
    console.warn('Firebase Storage notice (using Firestore/persistent dataUrl fallback):', storageErr?.message);
    // Return compressed Data URL which persists cleanly in Firestore / localCache
    return compressedDataUrl;
  }
}
