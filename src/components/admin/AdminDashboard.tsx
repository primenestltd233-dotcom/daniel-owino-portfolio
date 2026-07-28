import React, { useState } from 'react';
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
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  LogOut,
  Upload,
  Copy,
  ExternalLink,
  Star
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
  MediaItem,
  SkillLevel,
  EmploymentType
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

  // Form states for edits
  const [heroForm, setHeroForm] = useState<HeroSection>(hero);
  const [aboutForm, setAboutForm] = useState<AboutSection>(about);
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [cvForm, setCvForm] = useState<CVItem>(cv);

  // Modal / Item Edit States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editingType, setEditingType] = useState<string | null>(null);

  // Media Library Upload state
  const [mediaFileUrl, setMediaFileUrl] = useState('');
  const [mediaFileName, setMediaFileName] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveHero = async () => {
    try {
      await updateHero(heroForm);
      showToast('Hero section updated successfully!');
    } catch (err: any) {
      showToast('Failed to save hero section', 'error');
    }
  };

  const handleSaveAbout = async () => {
    try {
      await updateAbout(aboutForm);
      showToast('About Me section updated successfully!');
    } catch (err: any) {
      showToast('Failed to save About section', 'error');
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings(settingsForm);
      showToast('Site settings & SEO updated!');
    } catch (err: any) {
      showToast('Failed to save site settings', 'error');
    }
  };

  const handleSaveCV = async () => {
    try {
      await updateCV(cvForm);
      showToast('CV / Resume record updated!');
    } catch (err: any) {
      showToast('Failed to update CV', 'error');
    }
  };

  // Generic Save Handler for Items
  const handleSaveGenericItem = async () => {
    if (!editingItem || !editingType) return;
    try {
      switch (editingType) {
        case 'education':
          await saveEducationItem(editingItem as EducationItem);
          break;
        case 'skill':
          await saveSkillItem(editingItem as SkillItem);
          break;
        case 'project':
          await saveProjectItem(editingItem as ProjectItem);
          break;
        case 'experience':
          await saveExperienceItem(editingItem as ExperienceItem);
          break;
        case 'certificate':
          await saveCertificateItem(editingItem as CertificateItem);
          break;
        case 'achievement':
          await saveAchievementItem(editingItem as AchievementItem);
          break;
        case 'leadership':
          await saveLeadershipItem(editingItem as LeadershipItem);
          break;
        case 'blog':
          await saveBlogPost(editingItem as BlogPost);
          break;
        case 'social':
          await saveSocialLink(editingItem as SocialLink);
          break;
      }
      showToast(`${editingType.toUpperCase()} item saved to database!`);
      setEditingItem(null);
      setEditingType(null);
    } catch (err: any) {
      showToast(`Failed to save ${editingType}`, 'error');
    }
  };

  // Helper file upload simulator to Media library or Data URL conversion
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

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
            CMS
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">Daniel Owino - Admin Panel</h2>
            <p className="text-[10px] text-slate-400">Database Single Source of Truth</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            View Public Site
          </button>
          <button
            onClick={onLogoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold rounded-lg transition-colors border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-16 right-6 z-50 px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
          toast.type === 'success' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-red-600 text-white border-red-500'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden bg-slate-100">
        
        {/* Left Sidebar Nav */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto shrink-0">
          <div className="p-3 space-y-1">
            <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Navigation & Modules</p>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'overview' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><LayoutDashboard className="w-4 h-4" /> Overview</span>
              {unreadCount > 0 && <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-extrabold rounded-full">{unreadCount}</span>}
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'hero' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" /> Hero & Home
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'about' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" /> About Me
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'education' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><GraduationCap className="w-4 h-4" /> Education</span>
              <span className="text-[10px] font-bold opacity-70">({education.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'skills' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Code className="w-4 h-4" /> Skills</span>
              <span className="text-[10px] font-bold opacity-70">({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'projects' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Briefcase className="w-4 h-4" /> Projects Portfolio</span>
              <span className="text-[10px] font-bold opacity-70">({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'experience' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Briefcase className="w-4 h-4" /> Work Experience</span>
              <span className="text-[10px] font-bold opacity-70">({experience.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'certificates' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Award className="w-4 h-4" /> Certificates</span>
              <span className="text-[10px] font-bold opacity-70">({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'achievements' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Trophy className="w-4 h-4" /> Achievements</span>
              <span className="text-[10px] font-bold opacity-70">({achievements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'leadership' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><Users className="w-4 h-4" /> Leadership</span>
              <span className="text-[10px] font-bold opacity-70">({leadership.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cv')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'cv' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" /> CV / Resume
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'blog' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><BookOpen className="w-4 h-4" /> Blog Articles</span>
              <span className="text-[10px] font-bold opacity-70">({blog.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'messages' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4" /> Messages Inbox</span>
              {unreadCount > 0 && <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">{unreadCount}</span>}
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'socials' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Share2 className="w-4 h-4" /> Social Links
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'media' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2.5"><FolderOpen className="w-4 h-4" /> Media Library</span>
              <span className="text-[10px] font-bold opacity-70">({media.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'settings' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" /> Site & SEO Settings
            </button>
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h2>
                <p className="text-xs text-slate-500">Live metrics across Daniel Owino's portfolio collections</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">Total Projects</p>
                  <p className="text-3xl font-extrabold text-slate-900">{projects.length}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">Certifications</p>
                  <p className="text-3xl font-extrabold text-slate-900">{certificates.length}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">Blog Articles</p>
                  <p className="text-3xl font-extrabold text-slate-900">{blog.length}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">Messages Inbox</p>
                  <p className="text-3xl font-extrabold text-blue-600">{messages.length} ({unreadCount} new)</p>
                </div>
              </div>

              {/* Messages Alert */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Recent Contact Submissions
                  </h3>
                  <button onClick={() => setActiveTab('messages')} className="text-xs font-semibold text-blue-600 hover:underline">
                    View Inbox
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-slate-400">No contact messages received yet.</p>
                ) : (
                  <div className="space-y-2">
                    {messages.slice(0, 3).map((m) => (
                      <div key={m.id} className="p-3 bg-slate-50 rounded-xl text-xs flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{m.name}</span> ({m.email})
                          <p className="text-slate-500 line-clamp-1">{m.subject || m.message}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.read ? 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-800'}`}>
                          {m.read ? 'Read' : 'Unread'}
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
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Edit Homepage Hero Section</h2>

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
                  <label className="font-bold text-slate-700">Tagline</label>
                  <input
                    type="text"
                    value={heroForm.tagline}
                    onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Profile Image URL</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={heroForm.profileImageUrl}
                      onChange={(e) => setHeroForm({ ...heroForm, profileImageUrl: e.target.value })}
                      className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                    <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Upload
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
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Hero Section
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT ME */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Edit About Me Section</h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Personal Intro Line</label>
                  <input
                    type="text"
                    value={aboutForm.personalIntro}
                    onChange={(e) => setAboutForm({ ...aboutForm, personalIntro: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Full Professional Biography</label>
                  <textarea
                    rows={6}
                    value={aboutForm.biography}
                    onChange={(e) => setAboutForm({ ...aboutForm, biography: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Mission Statement</label>
                  <textarea
                    rows={2}
                    value={aboutForm.mission}
                    onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700">Vision Statement</label>
                  <textarea
                    rows={2}
                    value={aboutForm.vision}
                    onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <button
                  onClick={handleSaveAbout}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save About Details
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS PORTFOLIO */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Manage Projects Portfolio</h2>
                  <p className="text-xs text-slate-500">Create, edit, and publish software projects</p>
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
                      technologies: ['TypeScript', 'React'],
                      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                      galleryImages: [],
                      keyFeatures: [],
                      featured: false,
                      published: true,
                      order: projects.length + 1
                    });
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                        <p className="text-xs text-blue-600">{proj.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingType('project');
                            setEditingItem({ ...proj });
                          }}
                          className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              await deleteProjectItem(proj.id);
                              showToast('Project deleted');
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{proj.shortDescription}</p>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t text-slate-400">
                      <span>Status: <strong className={proj.published ? 'text-emerald-600' : 'text-amber-600'}>{proj.published ? 'Published' : 'Draft'}</strong></span>
                      {proj.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">Featured</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Manage Certificates</h2>
                  <p className="text-xs text-slate-500">Add or edit accredited credentials</p>
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
                      certificateFileUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
                      category: 'Web Development',
                      featured: true,
                      published: true,
                      order: certificates.length + 1
                    });
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Certificate
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{cert.title}</h3>
                        <p className="text-xs text-blue-600">{cert.issuingOrganization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditingType('certificate'); setEditingItem({ ...cert }); }} className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={async () => { if (confirm('Delete certificate?')) { await deleteCertificateItem(cert.id); showToast('Certificate deleted'); } }} className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CV / RESUME */}
          {activeTab === 'cv' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-3">CV & Resume Management</h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700">CV Document Title</label>
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
                  <label className="font-bold text-slate-700">PDF File URL</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={cvForm.pdfUrl}
                      onChange={(e) => setCvForm({ ...cvForm, pdfUrl: e.target.value })}
                      className="flex-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                    <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Replace PDF
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setCvForm({ ...cvForm, pdfUrl: url, updatedAt: new Date().toISOString().split('T')[0] }))} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">Executive Summary</label>
                  <textarea
                    rows={4}
                    value={cvForm.summary}
                    onChange={(e) => setCvForm({ ...cvForm, summary: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <button
                  onClick={handleSaveCV}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save CV Configuration
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Contact Form Submissions</h2>
                <p className="text-xs text-slate-500">Messages sent directly by public portfolio visitors</p>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                  Inbox is currently empty.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`p-5 rounded-2xl border ${msg.read ? 'bg-white border-slate-200' : 'bg-blue-50/60 border-blue-200'} space-y-3`}>
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
                            className="text-xs text-blue-600 hover:underline"
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
                      <p className="text-xs font-semibold text-slate-800">Subject: {msg.subject}</p>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Media & File Library</h2>
                  <p className="text-xs text-slate-500">Persistent cloud files for images, certificates, and documents</p>
                </div>
                <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4" /> Upload New File
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, () => {})} />
                </label>
              </div>

              {media.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                  No uploaded media files yet. Use the upload button above to add images or PDFs.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <div key={item.id} className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2 group">
                      <div className="h-28 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
                        {item.type === 'image' ? (
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <FileText className="w-10 h-10 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-800 line-clamp-1">{item.name}</p>
                      <div className="flex items-center justify-between pt-1 border-t text-[11px]">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showToast('Media URL copied to clipboard!');
                          }}
                          className="text-blue-600 hover:underline flex items-center gap-1"
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

          {/* TAB 9: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Site & SEO Settings</h2>

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

                <div>
                  <label className="font-bold text-slate-700">SEO Description</label>
                  <textarea
                    rows={3}
                    value={settingsForm.seoDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Contact Email</label>
                    <input
                      type="text"
                      value={settingsForm.emailContact}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emailContact: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Location Tag</label>
                    <input
                      type="text"
                      value={settingsForm.locationContact}
                      onChange={(e) => setSettingsForm({ ...settingsForm, locationContact: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Site Settings
                </button>
              </div>
            </div>
          )}

          {/* FALLBACK TABS (Education, Skills, Experience, Achievements, Leadership, Blog, Socials) List / Add buttons */}
          {['education', 'skills', 'experience', 'achievements', 'leadership', 'blog', 'socials'].includes(activeTab) && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 uppercase">Manage {activeTab}</h2>
                <button
                  onClick={() => {
                    setEditingType(activeTab);
                    if (activeTab === 'education') {
                      setEditingItem({ id: `edu_${Date.now()}`, institution: '', degree: '', fieldOfStudy: '', startDate: '2022-09', endDate: '2026-06', currentStatus: true, description: '', relevantSubjects: [], achievements: [], order: education.length + 1, published: true });
                    } else if (activeTab === 'skills') {
                      setEditingItem({ id: `sk_${Date.now()}`, name: '', category: 'Programming', level: 'Proficient', yearsOfExperience: 3, order: skills.length + 1, published: true });
                    } else if (activeTab === 'experience') {
                      setEditingItem({ id: `exp_${Date.now()}`, organization: '', position: '', employmentType: 'Employment', startDate: '2024-01', endDate: 'Present', currentPosition: true, location: 'Nairobi', description: '', responsibilities: [], achievements: [], skillsUsed: [], order: experience.length + 1, published: true });
                    } else if (activeTab === 'blog') {
                      setEditingItem({ id: `blog_${Date.now()}`, title: '', slug: 'new-article', featuredImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', excerpt: '', content: '# Article Title\n\nWrite content here...', category: 'Web Development', tags: ['Tech'], author: 'Daniel Owino', publicationDate: new Date().toISOString().split('T')[0], readingTimeMinutes: 4, published: true, featured: false });
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New {activeTab} Item
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-500">
                Editing panel ready. Click "Add New Item" above to add dynamic content to {activeTab}.
              </div>
            </div>
          )}

        </main>
      </div>

      {/* UNIVERSAL EDIT MODAL FOR DYNAMIC ITEMS */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-4 my-8 relative">
            <button onClick={() => setEditingItem(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 uppercase">Edit {editingType}</h3>

            <div className="space-y-3 text-xs">
              {/* Common Title/Name */}
              <div>
                <label className="font-bold text-slate-700">Title / Name</label>
                <input
                  type="text"
                  value={editingItem.title || editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value, name: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              {/* Description / Content */}
              <div>
                <label className="font-bold text-slate-700">Description / Content</label>
                <textarea
                  rows={4}
                  value={editingItem.description || editingItem.content || editingItem.shortDescription || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value, content: e.target.value, shortDescription: e.target.value })}
                  className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              {/* Category */}
              {editingItem.category !== undefined && (
                <div>
                  <label className="font-bold text-slate-700">Category</label>
                  <input
                    type="text"
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 border rounded-xl"
                  />
                </div>
              )}

              {/* Publish Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={editingItem.published ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="pub-check" className="font-bold text-slate-700">Publish to Public Portfolio</label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <button onClick={() => setEditingItem(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl">
                  Cancel
                </button>
                <button onClick={handleSaveGenericItem} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl flex items-center gap-1.5">
                  <Save className="w-4 h-4" /> Save Record
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
