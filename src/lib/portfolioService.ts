import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  HeroSection, 
  AboutSection, 
  EducationItem, 
  SkillItem, 
  ProjectItem, 
  ExperienceItem, 
  CertificateItem, 
  AchievementItem, 
  LeadershipItem, 
  CVItem, 
  BlogPost, 
  ContactMessage, 
  SocialLink, 
  SiteSettings,
  MediaItem
} from '../types';
import { 
  initialHero, 
  initialAbout, 
  initialEducation, 
  initialSkills, 
  initialProjects, 
  initialExperience, 
  initialCertificates, 
  initialAchievements, 
  initialLeadership, 
  initialCV, 
  initialBlogPosts, 
  initialSocials, 
  initialSiteSettings 
} from './seedData';

// Storage keys for offline or quick fallback caching
const CACHE_KEY = 'daniel_owino_portfolio_cache_v1';

function loadCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

// Global initialization flag
let isSeeded = false;

export async function ensureInitialSeed() {
  if (isSeeded) return;
  try {
    // Check settings doc
    const settingsRef = doc(db, 'settings', 'config');
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, initialSiteSettings);
    }

    // Check hero doc
    const heroRef = doc(db, 'hero', 'main');
    const heroSnap = await getDoc(heroRef);
    if (!heroSnap.exists()) {
      await setDoc(heroRef, initialHero);
    }

    // Check about doc
    const aboutRef = doc(db, 'about', 'main');
    const aboutSnap = await getDoc(aboutRef);
    if (!aboutSnap.exists()) {
      await setDoc(aboutRef, initialAbout);
    }

    // Check education collection
    const eduSnap = await getDocs(collection(db, 'education'));
    if (eduSnap.empty) {
      for (const item of initialEducation) {
        await setDoc(doc(db, 'education', item.id), item);
      }
    }

    // Check skills collection
    const skillsSnap = await getDocs(collection(db, 'skills'));
    if (skillsSnap.empty) {
      for (const item of initialSkills) {
        await setDoc(doc(db, 'skills', item.id), item);
      }
    }

    // Check projects collection
    const projSnap = await getDocs(collection(db, 'projects'));
    if (projSnap.empty) {
      for (const item of initialProjects) {
        await setDoc(doc(db, 'projects', item.id), item);
      }
    }

    // Check experience collection
    const expSnap = await getDocs(collection(db, 'experience'));
    if (expSnap.empty) {
      for (const item of initialExperience) {
        await setDoc(doc(db, 'experience', item.id), item);
      }
    }

    // Check certificates collection
    const certSnap = await getDocs(collection(db, 'certificates'));
    if (certSnap.empty) {
      for (const item of initialCertificates) {
        await setDoc(doc(db, 'certificates', item.id), item);
      }
    }

    // Check achievements collection
    const achSnap = await getDocs(collection(db, 'achievements'));
    if (achSnap.empty) {
      for (const item of initialAchievements) {
        await setDoc(doc(db, 'achievements', item.id), item);
      }
    }

    // Check leadership collection
    const leadSnap = await getDocs(collection(db, 'leadership'));
    if (leadSnap.empty) {
      for (const item of initialLeadership) {
        await setDoc(doc(db, 'leadership', item.id), item);
      }
    }

    // Check cv doc
    const cvRef = doc(db, 'cv', 'main');
    const cvSnap = await getDoc(cvRef);
    if (!cvSnap.exists()) {
      await setDoc(cvRef, initialCV);
    }

    // Check blog collection
    const blogSnap = await getDocs(collection(db, 'blog'));
    if (blogSnap.empty) {
      for (const item of initialBlogPosts) {
        await setDoc(doc(db, 'blog', item.id), item);
      }
    }

    // Check socials collection
    const socSnap = await getDocs(collection(db, 'socials'));
    if (socSnap.empty) {
      for (const item of initialSocials) {
        await setDoc(doc(db, 'socials', item.id), item);
      }
    }

    isSeeded = true;
  } catch (err) {
    console.warn('Firestore seed check notice:', err);
  }
}

// ---------------- SUBSCRIPTIONS & CRUD ----------------

// 1. Site Settings
export function subscribeSettings(callback: (data: SiteSettings) => void) {
  const ref = doc(db, 'settings', 'config');
  const cached = loadCache<SiteSettings>('settings');
  if (cached) callback(cached);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as SiteSettings;
      saveCache('settings', data);
      callback(data);
    } else {
      callback(initialSiteSettings);
    }
  }, () => {
    callback(cached || initialSiteSettings);
  });
}

export async function updateSettings(data: Partial<SiteSettings>) {
  const ref = doc(db, 'settings', 'config');
  await setDoc(ref, data, { merge: true });
}

// 2. Hero Section
export function subscribeHero(callback: (data: HeroSection) => void) {
  const ref = doc(db, 'hero', 'main');
  const cached = loadCache<HeroSection>('hero');
  if (cached) callback(cached);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as HeroSection;
      saveCache('hero', data);
      callback(data);
    } else {
      callback(initialHero);
    }
  }, () => {
    callback(cached || initialHero);
  });
}

export async function updateHero(data: Partial<HeroSection>) {
  const ref = doc(db, 'hero', 'main');
  await setDoc(ref, data, { merge: true });
}

// 3. About Section
export function subscribeAbout(callback: (data: AboutSection) => void) {
  const ref = doc(db, 'about', 'main');
  const cached = loadCache<AboutSection>('about');
  if (cached) callback(cached);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as AboutSection;
      saveCache('about', data);
      callback(data);
    } else {
      callback(initialAbout);
    }
  }, () => {
    callback(cached || initialAbout);
  });
}

export async function updateAbout(data: Partial<AboutSection>) {
  const ref = doc(db, 'about', 'main');
  await setDoc(ref, data, { merge: true });
}

// 4. Education
export function subscribeEducation(callback: (items: EducationItem[]) => void) {
  const colRef = collection(db, 'education');
  const cached = loadCache<EducationItem[]>('education');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: EducationItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as EducationItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('education', items);
    callback(items);
  }, () => {
    callback(cached || initialEducation);
  });
}

export async function saveEducationItem(item: EducationItem) {
  const id = item.id || `edu_${Date.now()}`;
  await setDoc(doc(db, 'education', id), { ...item, id }, { merge: true });
}

export async function deleteEducationItem(id: string) {
  await deleteDoc(doc(db, 'education', id));
}

// 5. Skills
export function subscribeSkills(callback: (items: SkillItem[]) => void) {
  const colRef = collection(db, 'skills');
  const cached = loadCache<SkillItem[]>('skills');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: SkillItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as SkillItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('skills', items);
    callback(items);
  }, () => {
    callback(cached || initialSkills);
  });
}

export async function saveSkillItem(item: SkillItem) {
  const id = item.id || `sk_${Date.now()}`;
  await setDoc(doc(db, 'skills', id), { ...item, id }, { merge: true });
}

export async function deleteSkillItem(id: string) {
  await deleteDoc(doc(db, 'skills', id));
}

// 6. Projects
export function subscribeProjects(callback: (items: ProjectItem[]) => void) {
  const colRef = collection(db, 'projects');
  const cached = loadCache<ProjectItem[]>('projects');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: ProjectItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as ProjectItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('projects', items);
    callback(items);
  }, () => {
    callback(cached || initialProjects);
  });
}

export async function saveProjectItem(item: ProjectItem) {
  const id = item.id || `proj_${Date.now()}`;
  await setDoc(doc(db, 'projects', id), { ...item, id }, { merge: true });
}

export async function deleteProjectItem(id: string) {
  await deleteDoc(doc(db, 'projects', id));
}

// 7. Work Experience
export function subscribeExperience(callback: (items: ExperienceItem[]) => void) {
  const colRef = collection(db, 'experience');
  const cached = loadCache<ExperienceItem[]>('experience');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: ExperienceItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as ExperienceItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('experience', items);
    callback(items);
  }, () => {
    callback(cached || initialExperience);
  });
}

export async function saveExperienceItem(item: ExperienceItem) {
  const id = item.id || `exp_${Date.now()}`;
  await setDoc(doc(db, 'experience', id), { ...item, id }, { merge: true });
}

export async function deleteExperienceItem(id: string) {
  await deleteDoc(doc(db, 'experience', id));
}

// 8. Certificates
export function subscribeCertificates(callback: (items: CertificateItem[]) => void) {
  const colRef = collection(db, 'certificates');
  const cached = loadCache<CertificateItem[]>('certificates');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: CertificateItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as CertificateItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('certificates', items);
    callback(items);
  }, () => {
    callback(cached || initialCertificates);
  });
}

export async function saveCertificateItem(item: CertificateItem) {
  const id = item.id || `cert_${Date.now()}`;
  await setDoc(doc(db, 'certificates', id), { ...item, id }, { merge: true });
}

export async function deleteCertificateItem(id: string) {
  await deleteDoc(doc(db, 'certificates', id));
}

// 9. Achievements
export function subscribeAchievements(callback: (items: AchievementItem[]) => void) {
  const colRef = collection(db, 'achievements');
  const cached = loadCache<AchievementItem[]>('achievements');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: AchievementItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as AchievementItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('achievements', items);
    callback(items);
  }, () => {
    callback(cached || initialAchievements);
  });
}

export async function saveAchievementItem(item: AchievementItem) {
  const id = item.id || `ach_${Date.now()}`;
  await setDoc(doc(db, 'achievements', id), { ...item, id }, { merge: true });
}

export async function deleteAchievementItem(id: string) {
  await deleteDoc(doc(db, 'achievements', id));
}

// 10. Leadership
export function subscribeLeadership(callback: (items: LeadershipItem[]) => void) {
  const colRef = collection(db, 'leadership');
  const cached = loadCache<LeadershipItem[]>('leadership');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: LeadershipItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as LeadershipItem);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('leadership', items);
    callback(items);
  }, () => {
    callback(cached || initialLeadership);
  });
}

export async function saveLeadershipItem(item: LeadershipItem) {
  const id = item.id || `lead_${Date.now()}`;
  await setDoc(doc(db, 'leadership', id), { ...item, id }, { merge: true });
}

export async function deleteLeadershipItem(id: string) {
  await deleteDoc(doc(db, 'leadership', id));
}

// 11. CV / Resume
export function subscribeCV(callback: (data: CVItem) => void) {
  const ref = doc(db, 'cv', 'main');
  const cached = loadCache<CVItem>('cv');
  if (cached) callback(cached);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as CVItem;
      saveCache('cv', data);
      callback(data);
    } else {
      callback(initialCV);
    }
  }, () => {
    callback(cached || initialCV);
  });
}

export async function updateCV(data: Partial<CVItem>) {
  const ref = doc(db, 'cv', 'main');
  await setDoc(ref, data, { merge: true });
}

// 12. Blog
export function subscribeBlog(callback: (items: BlogPost[]) => void) {
  const colRef = collection(db, 'blog');
  const cached = loadCache<BlogPost[]>('blog');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: BlogPost[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as BlogPost);
    });
    items.sort((a, b) => (b.publicationDate || '').localeCompare(a.publicationDate || ''));
    saveCache('blog', items);
    callback(items);
  }, () => {
    callback(cached || initialBlogPosts);
  });
}

export async function saveBlogPost(item: BlogPost) {
  const id = item.id || `blog_${Date.now()}`;
  await setDoc(doc(db, 'blog', id), { ...item, id }, { merge: true });
}

export async function deleteBlogPost(id: string) {
  await deleteDoc(doc(db, 'blog', id));
}

// 13. Contact Messages
export function subscribeMessages(callback: (items: ContactMessage[]) => void) {
  const colRef = collection(db, 'messages');
  return onSnapshot(colRef, (snap) => {
    const items: ContactMessage[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as ContactMessage);
    });
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    callback(items);
  }, (err) => {
    console.warn('Messages subscription:', err);
    callback([]);
  });
}

export async function sendContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read' | 'archived'>) {
  const colRef = collection(db, 'messages');
  const newDoc: Omit<ContactMessage, 'id'> = {
    ...msg,
    createdAt: new Date().toISOString(),
    read: false,
    archived: false,
  };
  await addDoc(colRef, newDoc);
}

export async function updateMessageStatus(id: string, updates: Partial<ContactMessage>) {
  await updateDoc(doc(db, 'messages', id), updates);
}

export async function deleteMessage(id: string) {
  await deleteDoc(doc(db, 'messages', id));
}

// 14. Social Links
export function subscribeSocials(callback: (items: SocialLink[]) => void) {
  const colRef = collection(db, 'socials');
  const cached = loadCache<SocialLink[]>('socials');
  if (cached) callback(cached);

  return onSnapshot(colRef, (snap) => {
    const items: SocialLink[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as SocialLink);
    });
    items.sort((a, b) => (a.order || 0) - (b.order || 0));
    saveCache('socials', items);
    callback(items);
  }, () => {
    callback(cached || initialSocials);
  });
}

export async function saveSocialLink(item: SocialLink) {
  const id = item.id || `soc_${Date.now()}`;
  await setDoc(doc(db, 'socials', id), { ...item, id }, { merge: true });
}

export async function deleteSocialLink(id: string) {
  await deleteDoc(doc(db, 'socials', id));
}

// 15. Media Library
export function subscribeMedia(callback: (items: MediaItem[]) => void) {
  const colRef = collection(db, 'media');
  return onSnapshot(colRef, (snap) => {
    const items: MediaItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as MediaItem);
    });
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    callback(items);
  }, () => {
    callback([]);
  });
}

export async function saveMediaItem(item: MediaItem) {
  const id = item.id || `med_${Date.now()}`;
  await setDoc(doc(db, 'media', id), { ...item, id }, { merge: true });
}

export async function deleteMediaItem(id: string) {
  await deleteDoc(doc(db, 'media', id));
}
