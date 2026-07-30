import React, { useState, useRef } from 'react';
import { 
  ImageIcon, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Wrench,
  Sparkles,
  Church,
  Share2,
  Building2,
  Code,
  Terminal,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { FreelanceServicesSection, ServiceItem } from '../../types';
import { uploadServiceImage, validateImageFile } from '../../lib/imageOptimizer';

interface ServiceImagesManagerProps {
  freelanceServicesForm: FreelanceServicesSection;
  setFreelanceServicesForm: React.Dispatch<React.SetStateAction<FreelanceServicesSection>>;
  onSave: () => Promise<void>;
  saving: boolean;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const renderServiceIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName.toLowerCase()) {
    case 'image': return <ImageIcon className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'church': return <Church className={className} />;
    case 'share2':
    case 'share': return <Share2 className={className} />;
    case 'building2':
    case 'building': return <Building2 className={className} />;
    case 'code': return <Code className={className} />;
    case 'terminal': return <Terminal className={className} />;
    case 'shieldalert':
    case 'shield': return <ShieldAlert className={className} />;
    default: return <Zap className={className} />;
  }
};

export const ServiceImagesManager: React.FC<ServiceImagesManagerProps> = ({
  freelanceServicesForm,
  setFreelanceServicesForm,
  onSave,
  saving,
  showToast,
}) => {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<{ [serviceId: string]: string }>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const services = freelanceServicesForm.services || [];

  const handleFileChange = async (serviceId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear file input value to allow re-selecting same file if needed
    e.target.value = '';

    // Validate image file
    const validation = validateImageFile(file, 5);
    if (!validation.valid) {
      setUploadError(prev => ({ ...prev, [serviceId]: validation.error || 'Invalid file format or size' }));
      showToast(validation.error || 'Validation failed', 'error');
      return;
    }

    setUploadError(prev => ({ ...prev, [serviceId]: '' }));
    setUploadingId(serviceId);

    try {
      const imageUrl = await uploadServiceImage(file);
      
      const updatedServices = services.map(s => 
        s.id === serviceId ? { ...s, imageUrl } : s
      );

      setFreelanceServicesForm(prev => ({
        ...prev,
        services: updatedServices
      }));

      showToast(`Image uploaded for service. Click "Save Changes" to store permanently in database.`, 'success');
    } catch (err: any) {
      console.error('Service image upload error:', err);
      const errMsg = err?.message || 'Failed to upload image. Please try again.';
      setUploadError(prev => ({ ...prev, [serviceId]: errMsg }));
      showToast(errMsg, 'error');
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemoveImage = (serviceId: string, serviceLabel: string) => {
    const updatedServices = services.map(s => 
      s.id === serviceId ? { ...s, imageUrl: undefined } : s
    );

    setFreelanceServicesForm(prev => ({
      ...prev,
      services: updatedServices
    }));

    showToast(`Removed custom image from "${serviceLabel}". Remember to click Save Changes.`, 'success');
  };

  const triggerFileInput = (serviceId: string) => {
    fileInputRefs.current[serviceId]?.click();
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Core Services CMS</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Service Images Management
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Upload, replace, preview, or remove custom representative images for each Core Service Offering. Saved images persist permanently in Firestore database.
          </p>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving || uploadingId !== null}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-md shadow-indigo-600/20 transition-all shrink-0 cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving to Database...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Changes</span>
            </>
          )}
        </button>
      </div>

      {/* SERVICE IMAGES GRID */}
      {services.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-4">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No Services Found</h3>
          <p className="text-xs text-slate-500">Go to Freelance (DAN'S DevOps) tab to add services first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => {
            const isUploading = uploadingId === service.id;
            const hasCustomImage = Boolean(service.imageUrl);
            const err = uploadError[service.id];

            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {renderServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Service #{idx + 1}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {service.label}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    hasCustomImage 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {hasCustomImage ? 'Custom Image Set' : 'Default Fallback'}
                  </span>
                </div>

                {/* Preview Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-indigo-600" /> Image Preview
                    </span>
                    <span className="text-[10px] text-slate-400">Aspect 16:10 • Optimized</span>
                  </div>

                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group">
                    {isUploading ? (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-3 z-20">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                        <span className="text-xs font-bold tracking-wide">Compressing & Uploading Image...</span>
                      </div>
                    ) : service.imageUrl ? (
                      <img 
                        src={service.imageUrl} 
                        alt={service.label} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-50/60 via-slate-100 to-indigo-100/40 flex flex-col items-center justify-center text-slate-400 space-y-2 p-4 text-center">
                        <ImageIcon className="w-10 h-10 text-indigo-300" />
                        <span className="text-xs font-medium text-slate-500">No custom image uploaded yet</span>
                        <span className="text-[10px] text-slate-400">Default SVG placeholder icon will be rendered on website</span>
                      </div>
                    )}

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={(el) => { fileInputRefs.current[service.id] = el; }}
                      onChange={(e) => handleFileChange(service.id, e)}
                      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                      className="hidden"
                    />
                  </div>

                  {err && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{err}</span>
                    </div>
                  )}
                </div>

                {/* Control Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {!hasCustomImage ? (
                    <button
                      type="button"
                      disabled={isUploading || saving}
                      onClick={() => triggerFileInput(service.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={isUploading || saving}
                        onClick={() => triggerFileInput(service.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Replace Image</span>
                      </button>

                      <button
                        type="button"
                        disabled={isUploading || saving}
                        onClick={() => handleRemoveImage(service.id, service.label)}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FOOTER SAVE BAR */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Instant Database Synchronization</h4>
            <p className="text-xs text-slate-400">Saving updates Firestore permanently and refreshes live visitors immediately.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving || uploadingId !== null}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
