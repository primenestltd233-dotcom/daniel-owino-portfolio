import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  User, 
  GraduationCap, 
  Code, 
  Briefcase, 
  Award, 
  Trophy, 
  Users, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Share2, 
  FolderOpen, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Eye, 
  CheckCircle2, 
  LogOut,
  Upload,
  Copy,
  ExternalLink,
  Sparkles,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
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
} from '../../types';
import { 
  updateHero, 
  updateAbout, 
  saveEducationItem, 
  deleteEducationItem, 
  saveSkillItem, 
  deleteSkillItem, 
  saveProjectItem, 
  deleteProjectItem, 
  saveExperienceItem, 
  deleteExperienceItem, 
  saveCertificateItem, 
  deleteCertificateItem, 
  saveAchievementItem, 
  deleteAchievementItem, 
  saveLeadershipItem, 
  deleteLeadershipItem, 
  updateCV, 
  saveBlogPost, 
  deleteBlogPost, 
  updateMessageStatus, 
  deleteMessage, 
  saveSocialLink, 
  deleteSocialLink, 
  updateSettings, 
  saveMediaItem, 
  deleteMediaItem 
} from '../../lib/portfolioService';

interface AdminDashboardProps {
  hero: HeroSection;
  about: AboutSection;
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  leadership: LeadershipItem[];
  cv: CVItem;
  blog: BlogPost[];
  messages: ContactMessage[];
  socials: SocialLink[];
  settings: SiteSettings;
  media: MediaItem[];
  onCloseAdmin: () => void;
  onLogoutAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  hero,
  about,
  education,
  skills,
  projects,
  experience,
  certificates,
  achievements,
  leadership,
  cv,
  blog,
  messages,
  socials,
  settings,
  media,
  onCloseAdmin,
  onLogoutAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form states for single-document sections
  const [heroForm, setHeroForm] = useState<HeroSection>(hero);
  const [aboutForm, setAboutForm] = useState<AboutSection>(about);
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [cvForm, setCvForm] = useState<CVItem>(cv);

  useEffect(() => { setHeroForm(hero); }, [hero]);
  useEffect(() => { setAboutForm(about); }, [about]);
  useEffect(() => { setSettingsForm(settings); }, [settings]);
  useEffect(() => { setCvForm(cv); }, [cv]);

  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSaveHero = async () => {
    setSavingSection('hero');
    try {
      await updateHero(heroForm);
      showToast('Saved ✓ — Hero section stored permanently in database!', 'success');
    } catch (err: any) {
      console.error('Save Hero Error:', err);
      showToast(`Save failed — changes were NOT stored. (${err?.message || 'Database error'})`, 'error');
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveAbout = async () => {
    setSavingSection('about');
    try {
      await updateAbout(aboutForm);
      showToast('Saved ✓ — About Me details & Core Values stored in database!', 'success');
    } catch (err: any) {
      console.error('Save About Error:', err);
      showToast(`Save failed — changes were NOT stored. (${err?.message || 'Database error'})`, 'error');
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSection('settings');
    try {
      await updateSettings(settingsForm);
      showToast('Saved ✓ — Contact details & Site settings stored in database!', 'success');
    } catch (err: any) {
      console.error('Save Settings Error:', err);
      showToast(`Save failed — changes were NOT stored. (${err?.message || 'Database error'})`, 'error');
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveCV = async () => {
    setSavingSection('cv');
    try {
      await updateCV(cvForm);
      showToast('Saved ✓ — CV & Resume record stored permanently in database!', 'success');
    } catch (err: any) {
      console.error('Save CV Error:', err);
      showToast(`Save failed — changes were NOT stored. (${err?.message || 'Database error'})`, 'error');
    } finally {
      setSavingSection(null);
    }
  };

  // Generic File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onCompleteUrl: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      onCompleteUrl(dataUrl);

      // Save to media library as well
      await saveMediaItem({
        id: `med_${Date.now()}`,
        name: file.name,
        url: dataUrl,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        sizeBytes: file.size,
        createdAt: new Date().toISOString()
      });
      showToast(`Uploaded ${file.name} to persistent storage!`);
    };
    reader.readAsDataURL(file);
  };

  // Helper for array fields in modal editing
  const toArray = (val: any): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split('\n').flatMap(line => line.split(',')).map(s => s.trim()).filter(Boolean);
    return [];
  };

  const toStringVal = (val: any): string => {
    if (Array.isArray(val)) return val.join(', ');
    return val || '';
  };

  // Generic Save Handler for Item Modals
  const handleSaveGenericItem = async () => {
    if (!editingItem || !editingType) return;
    setSavingSection('modal');
    try {
      switch (editingType) {
        case 'education':
          await saveEducationItem({
            ...editingItem,
            relevantSubjects: toArray(editingItem.relevantSubjects),
            achievements: toArray(editingItem.achievements)
          });
          break;
        case 'skill':
          await saveSkillItem(editingItem);
          break;
        case 'project':
          await saveProjectItem({
            ...editingItem,
            keyFeatures: toArray(editingItem.keyFeatures),
            technologies: toArray(editingItem.technologies),
            galleryImages: Array.isArray(editingItem.galleryImages) ? editingItem.galleryImages : []
          });
          break;
        case 'experience':
          await saveExperienceItem({
            ...editingItem,
            responsibilities: toArray(editingItem.responsibilities),
            achievements: toArray(editingItem.achievements),
            skillsUsed: toArray(editingItem.skillsUsed)
          });
          break;
        case 'certificate':
          await saveCertificateItem(editingItem);
          break;
        case 'achievement':
          await saveAchievementItem(editingItem);
          break;
        case 'leadership':
          await saveLeadershipItem({
            ...editingItem,
            responsibilities: toArray(editingItem.responsibilities),
            achievements: toArray(editingItem.achievements)
          });
          break;
        case 'blog':
          await saveBlogPost({
            ...editingItem,
            tags: toArray(editingItem.tags)
          });
          break;
        case 'social':
          await saveSocialLink(editingItem);
          break;
      }
      showToast(`Saved ✓ — ${editingType.toUpperCase()} item stored permanently in database!`, 'success');
      setEditingItem(null);
      setEditingType(null);
    } catch (err: any) {
      console.error('Save Generic Item Error:', err);
      showToast(`Failed to save ${editingType}: ${err?.message || 'Database error'}`, 'error');
    } finally {
      setSavingSection(null);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col overflow-hidden font-sans">
      
      {/* Top Header Navbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-600/30">
            CMS
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-tight text-white">Daniel Owino - CMS Admin Panel</h2>
            <p className="text-[10px] text-slate-400">Database Single Source of Truth • Live Synchronized</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors border border-slate-700"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>View Public Site</span>
          </button>
          <button
            onClick={onLogoutAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold rounded-xl transition-colors border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Toast Alert Banner */}
      {toast && (
        <div className={`fixed top-16 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2 animate-in fade-in ${
          toast.type === 'success' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-red-600 text-white border-red-500'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 flex overflow-hidden bg-slate-100">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto shrink-0 py-3">
          <div className="px-3 space-y-1">
            <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Content Management</p>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><LayoutDashboard className="w-4 h-4" /> Overview</span>
              {unreadCount > 0 && <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-extrabold rounded-full">{unreadCount}</span>}
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hero' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" /> Hero & Home
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'about' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" /> About & Core Values
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'education' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><GraduationCap className="w-4 h-4" /> Education</span>
              <span className="text-[10px] opacity-70">({education.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'skills' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Code className="w-4 h-4" /> Technical Skills</span>
              <span className="text-[10px] opacity-70">({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Briefcase className="w-4 h-4" /> Projects Portfolio</span>
              <span className="text-[10px] opacity-70">({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'experience' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Briefcase className="w-4 h-4" /> Work Experience</span>
              <span className="text-[10px] opacity-70">({experience.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'certificates' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Award className="w-4 h-4" /> Certifications</span>
              <span className="text-[10px] opacity-70">({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'achievements' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Trophy className="w-4 h-4" /> Key Achievements</span>
              <span className="text-[10px] opacity-70">({achievements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'leadership' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Users className="w-4 h-4" /> Leadership</span>
              <span className="text-[10px] opacity-70">({leadership.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cv')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cv' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" /> CV & Resume
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'blog' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><BookOpen className="w-4 h-4" /> Blog Articles</span>
              <span className="text-[10px] opacity-70">({blog.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'messages' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4" /> Messages Inbox</span>
              {unreadCount > 0 && <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">{unreadCount}</span>}
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'socials' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Share2 className="w-4 h-4" /> Social Profiles</span>
              <span className="text-[10px] opacity-70">({socials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'media' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><FolderOpen className="w-4 h-4" /> Media Library</span>
              <span className="text-[10px] opacity-70">({media.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" /> Site & Contact Details
            </button>
          </div>
        </aside>

        {/* Right Main Content Workspace Panel */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Overview & Content Metrics</h2>
                <p className="text-xs text-slate-500 mt-1">Live synchronised database totals across Daniel Owino's portfolio</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projects</p>
                  <p className="text-3xl font-extrabold text-slate-900">{projects.length}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certifications</p>
                  <p className="text-3xl font-extrabold text-slate-900">{certificates.length}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Education Records</p>
                  <p className="text-3xl font-extrabold text-slate-900">{education.length}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Messages Inbox</p>
                  <p className="text-3xl font-extrabold text-indigo-600">{messages.length} ({unreadCount} new)</p>
                </div>
              </div>

              {/* Messages Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    Recent Contact Inquiries
                  </h3>
                  <button onClick={() => setActiveTab('messages')} className="text-xs font-bold text-indigo-600 hover:underline">
                    View Inbox ({messages.length})
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No contact submissions yet.</p>
                ) : (
                  <div className="space-y-2">
                    {messages.slice(0, 3).map((m) => (
                      <div key={m.id} className="p-3 bg-slate-50 rounded-xl text-xs flex items-center justify-between border border-slate-100">
                        <div>
                          <span className="font-bold text-slate-900">{m.name}</span> &lt;{m.email}&gt;
                          <p className="text-slate-500 line-clamp-1">{m.subject || m.message}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${m.read ? 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-800'}`}>
                          {m.read ? 'Read' : 'New'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-900 border-b pb-3 tracking-tight">Homepage Hero & Intro Management</h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={heroForm.fullName}
                    onChange={(e) => setHeroForm({ ...heroForm, fullName: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Professional Title</label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Short Introduction</label>
                  <textarea
                    rows={3}
                    value={heroForm.shortIntro}
                    onChange={(e) => setHeroForm({ ...heroForm, shortIntro: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Tagline / Quote</label>
                  <input
                    type="text"
                    value={heroForm.tagline}
                    onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Hero Profile Image</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={heroForm.profileImageUrl}
                      onChange={(e) => setHeroForm({ ...heroForm, profileImageUrl: e.target.value })}
                      className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                      placeholder="Image URL or upload file..."
                    />
                    <label className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shrink-0">
                      <Upload className="w-4 h-4" /> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHeroForm({ ...heroForm, profileImageUrl: url }))} />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Primary Button Text</label>
                    <input
                      type="text"
                      value={heroForm.primaryButtonText}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryButtonText: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Secondary Button Text</label>
                    <input
                      type="text"
                      value={heroForm.secondaryButtonText}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryButtonText: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveHero}
                  disabled={savingSection === 'hero'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-full text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
                >
                  {savingSection === 'hero' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Hero Section</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT ME & CORE VALUES */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 border-b pb-3 tracking-tight">About Me & Core Values Management</h2>
                <p className="text-xs text-slate-500 mt-1">Manage profile photo, biography, core values, mission, vision, and goals.</p>
              </div>

              <div className="space-y-5 text-xs">
                {/* Profile Photo Upload */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <label className="font-bold text-slate-800 block">
                    About Section Profile Photo
                  </label>
                  
                  {aboutForm.profileImageUrl && (
                    <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-200">
                      <img
                        src={aboutForm.profileImageUrl}
                        alt="About Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={aboutForm.profileImageUrl || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, profileImageUrl: e.target.value })}
                      className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl"
                      placeholder="Paste image URL or click Upload..."
                    />
                    <label className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shrink-0">
                      <Upload className="w-4 h-4" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setAboutForm({ ...aboutForm, profileImageUrl: url }))}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">Personal Intro Line</label>
                  <input
                    type="text"
                    value={aboutForm.personalIntro || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, personalIntro: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Full Professional Biography</label>
                  <textarea
                    rows={6}
                    value={aboutForm.biography || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, biography: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                {/* Core Engineering Values Editor */}
                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-indigo-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Core Engineering Values
                    </label>
                  </div>
                  <p className="text-[11px] text-indigo-700">
                    Add, edit, or remove engineering principles rendered in the Core Values section.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {aboutForm.values?.map((val, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-900 font-bold rounded-xl flex items-center gap-2 text-xs">
                        <span>✓ {val}</span>
                        <button
                          onClick={() => setAboutForm({
                            ...aboutForm,
                            values: aboutForm.values.filter((_, i) => i !== idx)
                          })}
                          className="text-slate-400 hover:text-red-600"
                          title="Delete value"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      id="new-val-input"
                      placeholder="Add new core value (e.g. Distributed Consensus)..."
                      className="flex-1 p-2 bg-white border border-indigo-200 rounded-xl text-xs"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          if (input.value.trim()) {
                            setAboutForm({ ...aboutForm, values: [...(aboutForm.values || []), input.value.trim()] });
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('new-val-input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          setAboutForm({ ...aboutForm, values: [...(aboutForm.values || []), input.value.trim()] });
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Mission Statement</label>
                    <textarea
                      rows={3}
                      value={aboutForm.mission || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Vision Statement</label>
                    <textarea
                      rows={3}
                      value={aboutForm.vision || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">Key Focus Areas / Specializations (Comma-separated)</label>
                  <input
                    type="text"
                    value={toStringVal(aboutForm.specializations)}
                    onChange={(e) => setAboutForm({
                      ...aboutForm,
                      specializations: toArray(e.target.value)
                    })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Short-Term Objectives (Comma-separated)</label>
                    <textarea
                      rows={3}
                      value={toStringVal(aboutForm.shortTermGoals)}
                      onChange={(e) => setAboutForm({
                        ...aboutForm,
                        shortTermGoals: toArray(e.target.value)
                      })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Long-Term Objectives (Comma-separated)</label>
                    <textarea
                      rows={3}
                      value={toStringVal(aboutForm.longTermGoals)}
                      onChange={(e) => setAboutForm({
                        ...aboutForm,
                        longTermGoals: toArray(e.target.value)
                      })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveAbout}
                  disabled={savingSection === 'about'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-full text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
                >
                  {savingSection === 'about' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save About Details & Core Values</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION AND ACADEMIC BACKGROUND */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Education & Academic Background</h2>
                  <p className="text-xs text-slate-500">Manage university qualifications, coursework, and institution logos</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('education');
                    setEditingItem({
                      id: `edu_${Date.now()}`,
                      institution: '',
                      degree: '',
                      fieldOfStudy: '',
                      startDate: '2022-09',
                      endDate: '2026-06',
                      currentStatus: true,
                      description: '',
                      institutionLogo: '',
                      certificateUrl: '',
                      relevantSubjects: [],
                      achievements: [],
                      order: education.length + 1,
                      published: true
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Academic Qualification
                </button>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {edu.institutionLogo ? (
                          <img src={edu.institutionLogo} alt={edu.institution} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                            <GraduationCap className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm">{edu.degree}</h3>
                          <p className="text-xs font-semibold text-indigo-600">{edu.institution}</p>
                          <p className="text-[11px] text-slate-500">{edu.fieldOfStudy} • {edu.startDate} – {edu.currentStatus ? 'Present' : edu.endDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingType('education'); setEditingItem({ ...edu }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete qualification "${edu.degree}"?`)) { await deleteEducationItem(edu.id); showToast('Education deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{edu.description}</p>

                    {edu.relevantSubjects?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Coursework:</span>
                        {edu.relevantSubjects.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TECHNICAL SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Technical & Professional Skills</h2>
                  <p className="text-xs text-slate-500">Manage programming languages, frameworks, databases, and proficiency levels</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('skill');
                    setEditingItem({
                      id: `sk_${Date.now()}`,
                      name: '',
                      category: 'Programming',
                      level: 'Proficient',
                      yearsOfExperience: 3,
                      order: skills.length + 1,
                      published: true
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Technical Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((sk) => (
                  <div key={sk.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{sk.name}</h3>
                      <p className="text-[11px] text-indigo-600 font-medium">{sk.category} • {sk.level}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingType('skill'); setEditingItem({ ...sk }); }} className="p-1.5 text-slate-400 hover:text-indigo-600">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={async () => { if (confirm(`Delete skill "${sk.name}"?`)) { await deleteSkillItem(sk.id); showToast('Skill deleted'); } }} className="p-1.5 text-slate-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROJECTS PORTFOLIO */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Software Projects & Engineering Work</h2>
                  <p className="text-xs text-slate-500">Create, edit, and feature software architecture projects</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('project');
                    setEditingItem({
                      id: `proj_${Date.now()}`,
                      title: '',
                      shortDescription: '',
                      detailedDescription: '',
                      category: 'Web Development',
                      technologies: [],
                      thumbnailUrl: '',
                      galleryImages: [],
                      problemStatement: '',
                      solution: '',
                      keyFeatures: [],
                      myRole: '',
                      challenges: '',
                      results: '',
                      githubUrl: '',
                      liveUrl: '',
                      videoUrl: '',
                      featured: false,
                      published: true,
                      order: projects.length + 1
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Software Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {proj.thumbnailUrl && (
                          <img src={proj.thumbnailUrl} alt={proj.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        )}
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm">{proj.title}</h3>
                          <p className="text-xs text-indigo-600 font-semibold">{proj.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingType('project'); setEditingItem({ ...proj }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete project "${proj.title}"?`)) { await deleteProjectItem(proj.id); showToast('Project deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{proj.shortDescription}</p>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t text-slate-500">
                      <span>Status: <strong className={proj.published ? 'text-emerald-600' : 'text-amber-600'}>{proj.published ? 'Published' : 'Draft'}</strong></span>
                      {proj.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold">Featured</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: WORK EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Work Experience & Roles</h2>
                  <p className="text-xs text-slate-500">Manage employment history, internship roles, and company logos</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('experience');
                    setEditingItem({
                      id: `exp_${Date.now()}`,
                      organization: '',
                      position: '',
                      employmentType: 'Employment',
                      startDate: '2024-01',
                      endDate: 'Present',
                      currentPosition: true,
                      location: 'Nairobi, Kenya',
                      description: '',
                      organizationLogo: '',
                      responsibilities: [],
                      achievements: [],
                      skillsUsed: [],
                      order: experience.length + 1,
                      published: true
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Work Experience
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {exp.organizationLogo ? (
                          <img src={exp.organizationLogo} alt={exp.organization} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                            <Briefcase className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm">{exp.position}</h3>
                          <p className="text-xs font-semibold text-indigo-600">{exp.organization} • {exp.employmentType}</p>
                          <p className="text-[11px] text-slate-500">{exp.location} • {exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingType('experience'); setEditingItem({ ...exp }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete work experience "${exp.position}"?`)) { await deleteExperienceItem(exp.id); showToast('Experience deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CERTIFICATIONS */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Certifications & Technical Credentials</h2>
                  <p className="text-xs text-slate-500">Manage professional certificates, credential IDs, and certificate document URLs</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('certificate');
                    setEditingItem({
                      id: `cert_${Date.now()}`,
                      title: '',
                      issuingOrganization: '',
                      description: '',
                      issueDate: new Date().toISOString().split('T')[0],
                      credentialId: '',
                      credentialUrl: '',
                      certificateFileUrl: '',
                      category: 'Web Development',
                      featured: true,
                      published: true,
                      order: certificates.length + 1
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Certification
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{cert.title}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{cert.issuingOrganization}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Issued: {cert.issueDate}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingType('certificate'); setEditingItem({ ...cert }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete certificate "${cert.title}"?`)) { await deleteCertificateItem(cert.id); showToast('Certificate deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: KEY ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Key Achievements & Honors</h2>
                  <p className="text-xs text-slate-500">Manage awards, hackathon triumphs, and technical accomplishments</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('achievement');
                    setEditingItem({
                      id: `ach_${Date.now()}`,
                      title: '',
                      description: '',
                      date: new Date().toISOString().split('T')[0],
                      organization: '',
                      imageUrl: '',
                      documentUrl: '',
                      category: 'Software Engineering',
                      featured: true,
                      published: true,
                      order: achievements.length + 1
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Key Achievement
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((ach) => (
                  <div key={ach.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{ach.title}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{ach.organization} • {ach.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingType('achievement'); setEditingItem({ ...ach }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete achievement "${ach.title}"?`)) { await deleteAchievementItem(ach.id); showToast('Achievement deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: LEADERSHIP AND COMMUNITY */}
          {activeTab === 'leadership' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Leadership & Community Initiatives</h2>
                  <p className="text-xs text-slate-500">Manage developer community roles, tech lead positions, and mentoring</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('leadership');
                    setEditingItem({
                      id: `lead_${Date.now()}`,
                      organization: '',
                      position: '',
                      description: '',
                      responsibilities: [],
                      achievements: [],
                      startDate: '2023-01',
                      endDate: 'Present',
                      imageUrl: '',
                      documentUrl: '',
                      order: leadership.length + 1,
                      published: true
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Leadership Entry
                </button>
              </div>

              <div className="space-y-4">
                {leadership.map((lead) => (
                  <div key={lead.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{lead.position}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{lead.organization}</p>
                        <p className="text-[11px] text-slate-500">{lead.startDate} – {lead.endDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingType('leadership'); setEditingItem({ ...lead }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete leadership item "${lead.position}"?`)) { await deleteLeadershipItem(lead.id); showToast('Leadership deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{lead.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: CV / RESUME MANAGEMENT */}
          {activeTab === 'cv' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 border-b pb-3 tracking-tight">Dedicated Resume / CV Management</h2>
                <p className="text-xs text-slate-500 mt-1">Upload, replace, view, or delete Daniel Owino's official Curriculum Vitae document.</p>
              </div>

              {/* Active Document Card */}
              <div className="p-5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">{cvForm.title || 'Official Curriculum Vitae'}</h3>
                      <p className="text-xs font-semibold text-indigo-700">Active Version: {cvForm.version || 'v1.0'} • Updated {cvForm.updatedAt}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-xs">{cvForm.fileName || 'Daniel_Owino_CV.pdf'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {cvForm.pdfUrl && (
                      <a
                        href={cvForm.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
                        <span>View Active Resume</span>
                      </a>
                    )}

                    {cvForm.pdfUrl && (
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete the active Resume PDF reference?')) {
                            const updated = { ...cvForm, pdfUrl: '', fileName: '', updatedAt: new Date().toISOString().split('T')[0] };
                            setCvForm(updated);
                            await updateCV(updated);
                            showToast('Resume file deleted successfully');
                          }
                        }}
                        className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Resume</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Upload / Replace Button */}
                <div className="pt-2 border-t border-indigo-200/80">
                  <label className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{cvForm.pdfUrl ? 'Replace Resume PDF File' : 'Upload New Resume PDF File'}</span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => {
                        const file = e.target.files?.[0];
                        const updated = {
                          ...cvForm,
                          pdfUrl: url,
                          fileName: file?.name || 'Daniel_Owino_CV.pdf',
                          updatedAt: new Date().toISOString().split('T')[0]
                        };
                        setCvForm(updated);
                        updateCV(updated);
                        showToast('New Resume PDF uploaded and saved persistently!');
                      })}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4 text-xs pt-2">
                <div>
                  <label className="font-bold text-slate-700">Document Display Title</label>
                  <input
                    type="text"
                    value={cvForm.title}
                    onChange={(e) => setCvForm({ ...cvForm, title: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Version Tag</label>
                  <input
                    type="text"
                    value={cvForm.version}
                    onChange={(e) => setCvForm({ ...cvForm, version: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Direct PDF File URL</label>
                  <input
                    type="text"
                    value={cvForm.pdfUrl}
                    onChange={(e) => setCvForm({ ...cvForm, pdfUrl: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    placeholder="Data URL or HTTPS PDF link..."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Executive Resume Summary</label>
                  <textarea
                    rows={4}
                    value={cvForm.summary}
                    onChange={(e) => setCvForm({ ...cvForm, summary: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <button
                  onClick={handleSaveCV}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save CV Configuration
                </button>
              </div>
            </div>
          )}

          {/* TAB 12: BLOG ARTICLES */}
          {activeTab === 'blog' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Blog Articles & Technical Writings</h2>
                  <p className="text-xs text-slate-500">Publish Markdown articles, tutorials, and engineering write-ups</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('blog');
                    setEditingItem({
                      id: `blog_${Date.now()}`,
                      title: '',
                      slug: 'new-article',
                      featuredImageUrl: '',
                      excerpt: '',
                      content: '# Article Title\n\nWrite article content here...',
                      category: 'Web Development',
                      tags: ['Tech'],
                      author: 'Daniel Owino',
                      publicationDate: new Date().toISOString().split('T')[0],
                      readingTimeMinutes: 5,
                      published: true,
                      featured: false
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Blog Article
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.map((article) => (
                  <div key={article.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{article.title}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{article.category} • {article.publicationDate}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingType('blog'); setEditingItem({ ...article }); }} className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 rounded-xl">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm(`Delete article "${article.title}"?`)) { await deleteBlogPost(article.id); showToast('Article deleted'); } }} className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{article.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contact Form Submissions</h2>
                <p className="text-xs text-slate-500">Messages sent directly by public portfolio visitors</p>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                  Inbox is currently empty.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`p-5 rounded-2xl border ${msg.read ? 'bg-white border-slate-200' : 'bg-indigo-50/60 border-indigo-200'} space-y-3`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                          <span className="text-xs text-slate-500 ml-2">&lt;{msg.email}&gt;</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              await updateMessageStatus(msg.id, { read: !msg.read });
                              showToast(`Marked as ${msg.read ? 'unread' : 'read'}`);
                            }}
                            className="text-xs font-bold text-indigo-600 hover:underline"
                          >
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Delete message?')) {
                                await deleteMessage(msg.id);
                                showToast('Message deleted');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-800">Subject: {msg.subject}</p>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 14: SOCIAL LINKS */}
          {activeTab === 'socials' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Social Media Profile Management</h2>
                  <p className="text-xs text-slate-500">Manage online profile handles, links, and icons</p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('social');
                    setEditingItem({
                      id: `soc_${Date.now()}`,
                      platform: 'LinkedIn',
                      url: 'https://',
                      iconName: 'Linkedin',
                      published: true,
                      order: socials.length + 1
                    });
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Social Profile
                </button>
              </div>

              <div className="space-y-3">
                {socials.map((soc) => (
                  <div key={soc.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-slate-900">{soc.platform}</span>
                      <p className="text-slate-500 text-[11px]">{soc.url}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${soc.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {soc.published ? 'Active' : 'Hidden'}
                      </span>
                      <button onClick={() => { setEditingType('social'); setEditingItem({ ...soc }); }} className="p-1.5 text-slate-500 hover:text-indigo-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={async () => { if (confirm(`Delete social link "${soc.platform}"?`)) { await deleteSocialLink(soc.id); showToast('Social link deleted'); } }} className="p-1.5 text-slate-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 15: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Media & Document Storage</h2>
                  <p className="text-xs text-slate-500">Persistent files for images, logos, certificates, and PDFs</p>
                </div>
                <label className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4" /> Upload New File
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, () => {})} />
                </label>
              </div>

              {media.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                  No uploaded media files yet. Click "Upload New File" to save persistent images or documents.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <div key={item.id} className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2 group">
                      <div className="h-28 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
                        {item.type === 'image' ? (
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <FileText className="w-10 h-10 text-indigo-600" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                      <div className="flex items-center justify-between pt-1 border-t text-[11px]">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showToast('Media URL copied to clipboard!');
                          }}
                          className="text-indigo-600 hover:underline flex items-center gap-1 font-bold"
                        >
                          <Copy className="w-3 h-3" /> Copy URL
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete media file?')) {
                              await deleteMediaItem(item.id);
                              showToast('Media deleted');
                            }
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 16: SITE & CONTACT DETAILS SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 border-b pb-3 tracking-tight">Contact Details & Site Settings</h2>
                <p className="text-xs text-slate-500 mt-1">Manage public contact details, email, phone, location, SEO, and footer information.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Website Title</label>
                  <input
                    type="text"
                    value={settingsForm.siteTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Logo Text</label>
                  <input
                    type="text"
                    value={settingsForm.logoText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, logoText: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700">Contact Email</label>
                    <input
                      type="text"
                      value={settingsForm.emailContact || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emailContact: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Contact Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phoneContact || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phoneContact: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Location Tag</label>
                    <input
                      type="text"
                      value={settingsForm.locationContact || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, locationContact: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">SEO Description</label>
                  <textarea
                    rows={3}
                    value={settingsForm.seoDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Footer Text</label>
                    <input
                      type="text"
                      value={settingsForm.footerText || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Copyright Text</label>
                    <input
                      type="text"
                      value={settingsForm.copyrightText || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, copyrightText: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={savingSection === 'settings'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-full text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
                >
                  {savingSection === 'settings' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Contact Details & Settings</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* UNIVERSAL RICH MODAL EDITOR FOR DYNAMIC COLLECTION ITEMS */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-4 my-8 relative font-sans">
            <button onClick={() => setEditingItem(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight border-b pb-3">
              Edit {editingType?.toUpperCase()} Record
            </h3>

            <div className="space-y-4 text-xs">
              
              {/* Common Title/Name */}
              <div>
                <label className="font-bold text-slate-700 block">Title / Name / Position</label>
                <input
                  type="text"
                  value={editingItem.title || editingItem.name || editingItem.degree || editingItem.position || ''}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    title: e.target.value,
                    name: e.target.value,
                    degree: e.target.value,
                    position: e.target.value
                  })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              {/* Specific for Education */}
              {editingType === 'education' && (
                <>
                  <div>
                    <label className="font-bold text-slate-700">University / Institution</label>
                    <input
                      type="text"
                      value={editingItem.institution || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Institution Logo Image</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editingItem.institutionLogo || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, institutionLogo: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                        placeholder="Image URL or upload..."
                      />
                      <label className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Upload Logo
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, institutionLogo: url }))} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Field of Study</label>
                      <input
                        type="text"
                        value={editingItem.fieldOfStudy || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, fieldOfStudy: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Period / Duration</label>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={editingItem.startDate || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                          className="w-1/2 p-2 bg-slate-50 border rounded-xl"
                          placeholder="Start"
                        />
                        <input
                          type="text"
                          value={editingItem.endDate || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                          className="w-1/2 p-2 bg-slate-50 border rounded-xl"
                          placeholder="End"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Key Coursework & Modules (Comma-separated)</label>
                    <input
                      type="text"
                      value={toStringVal(editingItem.relevantSubjects)}
                      onChange={(e) => setEditingItem({ ...editingItem, relevantSubjects: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Academic Honors (Comma-separated)</label>
                    <input
                      type="text"
                      value={toStringVal(editingItem.achievements)}
                      onChange={(e) => setEditingItem({ ...editingItem, achievements: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Specific for Work Experience */}
              {editingType === 'experience' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Organization / Company</label>
                      <input
                        type="text"
                        value={editingItem.organization || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Employment Type</label>
                      <select
                        value={editingItem.employmentType || 'Employment'}
                        onChange={(e) => setEditingItem({ ...editingItem, employmentType: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl font-medium"
                      >
                        <option value="Employment">Employment</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Contract">Contract</option>
                        <option value="Personal Business">Personal Business</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Organization Logo</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editingItem.organizationLogo || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, organizationLogo: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                        placeholder="Image URL or upload..."
                      />
                      <label className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Upload Logo
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, organizationLogo: url }))} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Location</label>
                      <input
                        type="text"
                        value={editingItem.location || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Start / End Period</label>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={editingItem.startDate || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                          className="w-1/2 p-2 bg-slate-50 border rounded-xl"
                          placeholder="Start"
                        />
                        <input
                          type="text"
                          value={editingItem.endDate || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                          className="w-1/2 p-2 bg-slate-50 border rounded-xl"
                          placeholder="End"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Key Responsibilities (Comma-separated or lines)</label>
                    <textarea
                      rows={3}
                      value={toStringVal(editingItem.responsibilities)}
                      onChange={(e) => setEditingItem({ ...editingItem, responsibilities: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Specific for Projects */}
              {editingType === 'project' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Category</label>
                      <input
                        type="text"
                        value={editingItem.category || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Short Description</label>
                      <input
                        type="text"
                        value={editingItem.shortDescription || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Project Main Thumbnail Image</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editingItem.thumbnailUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, thumbnailUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                        placeholder="Image URL or upload..."
                      />
                      <label className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, thumbnailUrl: url }))} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Technologies Used (Comma-separated)</label>
                    <input
                      type="text"
                      value={toStringVal(editingItem.technologies)}
                      onChange={(e) => setEditingItem({ ...editingItem, technologies: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Key Features (Comma-separated)</label>
                    <textarea
                      rows={2}
                      value={toStringVal(editingItem.keyFeatures)}
                      onChange={(e) => setEditingItem({ ...editingItem, keyFeatures: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">GitHub Repository URL</label>
                      <input
                        type="text"
                        value={editingItem.githubUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Live Application URL</label>
                      <input
                        type="text"
                        value={editingItem.liveUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Specific for Certificates */}
              {editingType === 'certificate' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Issuing Organization</label>
                      <input
                        type="text"
                        value={editingItem.issuingOrganization || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, issuingOrganization: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Issue Date</label>
                      <input
                        type="text"
                        value={editingItem.issueDate || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Certificate Image / PDF Document</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editingItem.certificateFileUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, certificateFileUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                        placeholder="Document URL or upload..."
                      />
                      <label className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Upload File
                        <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, certificateFileUrl: url }))} />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Specific for Achievements */}
              {editingType === 'achievement' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Organization / Event</label>
                      <input
                        type="text"
                        value={editingItem.organization || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Date</label>
                      <input
                        type="text"
                        value={editingItem.date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Achievement Photo / Image</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editingItem.imageUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                        placeholder="Image URL or upload..."
                      />
                      <label className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, imageUrl: url }))} />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Specific for Leadership */}
              {editingType === 'leadership' && (
                <>
                  <div>
                    <label className="font-bold text-slate-700">Organization / Community Group</label>
                    <input
                      type="text"
                      value={editingItem.organization || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Leadership Photo / Image</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editingItem.imageUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                        placeholder="Image URL or upload..."
                      />
                      <label className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" /> Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, imageUrl: url }))} />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Specific for Social Links */}
              {editingType === 'social' && (
                <>
                  <div>
                    <label className="font-bold text-slate-700">Platform Name</label>
                    <input
                      type="text"
                      value={editingItem.platform || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, platform: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      placeholder="e.g. LinkedIn, GitHub, X/Twitter, Email"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Account URL</label>
                    <input
                      type="text"
                      value={editingItem.url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                      placeholder="https://..."
                    />
                  </div>
                </>
              )}

              {/* Description / Content (Common for most) */}
              {editingType !== 'social' && editingType !== 'skill' && (
                <div>
                  <label className="font-bold text-slate-700">Full Description / Overview</label>
                  <textarea
                    rows={4}
                    value={editingItem.description || editingItem.detailedDescription || editingItem.content || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                      detailedDescription: e.target.value,
                      content: e.target.value
                    })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              )}

              {/* Published Toggle */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={editingItem.published ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="pub-check" className="font-bold text-slate-700">Publish item to public website</label>
              </div>

              {/* Modal Control Action Buttons */}
              <div className="pt-4 flex justify-end gap-2 border-t">
                <button onClick={() => setEditingItem(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">
                  Cancel
                </button>
                <button
                  onClick={handleSaveGenericItem}
                  disabled={savingSection === 'modal'}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
                >
                  {savingSection === 'modal' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Record</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
