import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { Education } from './components/public/Education';
import { Skills } from './components/public/Skills';
import { Projects } from './components/public/Projects';
import { Experience } from './components/public/Experience';
import { Certificates } from './components/public/Certificates';
import { Achievements } from './components/public/Achievements';
import { Leadership } from './components/public/Leadership';
import { CVResume } from './components/public/CVResume';
import { BlogView } from './components/public/BlogView';
import { Contact } from './components/public/Contact';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/public/FloatingButtons';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { 
  auth, 
  onAuthStateChanged, 
  firebaseSignOut, 
  User as FirebaseUser 
} from './lib/firebase';
import { 
  ensureInitialSeed, 
  subscribeSettings, 
  subscribeHero, 
  subscribeAbout, 
  subscribeEducation, 
  subscribeSkills, 
  subscribeProjects, 
  subscribeExperience, 
  subscribeCertificates, 
  subscribeAchievements, 
  subscribeLeadership, 
  subscribeCV, 
  subscribeBlog, 
  subscribeMessages, 
  subscribeSocials, 
  subscribeMedia 
} from './lib/portfolioService';

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
} from './types';
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
} from './lib/seedData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [adminUser, setAdminUser] = useState<FirebaseUser | null>(null);
  const [localAdmin, setLocalAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('is_admin_authenticated') === 'true';
  });
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const effectiveAdminUser = adminUser || (localAdmin ? ({
    email: sessionStorage.getItem('admin_email') || 'demmizkenya@gmail.com',
    displayName: 'Daniel Owino (System Admin)',
    uid: 'system-admin-daniel-owino'
  } as unknown as FirebaseUser) : null);

  // Firestore Data State
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [hero, setHero] = useState<HeroSection>(initialHero);
  const [about, setAbout] = useState<AboutSection>(initialAbout);
  const [education, setEducation] = useState<EducationItem[]>(initialEducation);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [experience, setExperience] = useState<ExperienceItem[]>(initialExperience);
  const [certificates, setCertificates] = useState<CertificateItem[]>(initialCertificates);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [leadership, setLeadership] = useState<LeadershipItem[]>(initialLeadership);
  const [cv, setCV] = useState<CVItem>(initialCV);
  const [blog, setBlog] = useState<BlogPost[]>(initialBlogPosts);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);
  const [media, setMedia] = useState<MediaItem[]>([]);

  // 1. Initialize Firestore Database Seed & Firebase Auth Listener
  useEffect(() => {
    ensureInitialSeed();

    const ALLOWED_ADMIN_EMAILS = ['demmizkenya@gmail.com', 'danielowino233@gmail.com'];

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        const cleanEmail = user.email.toLowerCase();
        if (ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
          setAdminUser(user);
        } else {
          await firebaseSignOut(auth);
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // 2. Real-time Subscriptions to Firestore Collections
  useEffect(() => {
    const unsubSettings = subscribeSettings(setSettings);
    const unsubHero = subscribeHero(setHero);
    const unsubAbout = subscribeAbout(setAbout);
    const unsubEducation = subscribeEducation(setEducation);
    const unsubSkills = subscribeSkills(setSkills);
    const unsubProjects = subscribeProjects(setProjects);
    const unsubExperience = subscribeExperience(setExperience);
    const unsubCertificates = subscribeCertificates(setCertificates);
    const unsubAchievements = subscribeAchievements(setAchievements);
    const unsubLeadership = subscribeLeadership(setLeadership);
    const unsubCV = subscribeCV(setCV);
    const unsubBlog = subscribeBlog(setBlog);
    const unsubMessages = subscribeMessages(setMessages);
    const unsubSocials = subscribeSocials(setSocials);
    const unsubMedia = subscribeMedia(setMedia);

    return () => {
      unsubSettings();
      unsubHero();
      unsubAbout();
      unsubEducation();
      unsubSkills();
      unsubProjects();
      unsubExperience();
      unsubCertificates();
      unsubAchievements();
      unsubLeadership();
      unsubCV();
      unsubBlog();
      unsubMessages();
      unsubSocials();
      unsubMedia();
    };
  }, []);

  // 3. Smooth Scroll & Section Observer
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAdminPortal = () => {
    if (effectiveAdminUser) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogoutAdmin = async () => {
    sessionStorage.removeItem('is_admin_authenticated');
    sessionStorage.removeItem('admin_email');
    sessionStorage.removeItem('admin_role');
    setLocalAdmin(false);
    await firebaseSignOut(auth);
    setIsAdminDashboardOpen(false);
  };

  // Calculate Years of Experience dynamically from earliest project/education or static value
  const yearsExp = Math.max(
    3,
    new Date().getFullYear() - 2022
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        adminUser={effectiveAdminUser}
        onOpenAdmin={handleOpenAdminPortal}
        onLogoutAdmin={handleLogoutAdmin}
        logoText={settings.logoText || 'DANIEL OWINO'}
        siteTitle={settings.siteTitle}
      />

      {/* Main Public Sections */}
      <main>
        {/* 1. HOME / HERO */}
        <Hero
          data={hero}
          totalProjects={projects.filter(p => p.published).length}
          totalCertificates={certificates.filter(c => c.published).length}
          totalEducation={education.filter(e => e.published).length}
          yearsOfExperience={yearsExp}
          onNavigate={handleNavigate}
        />

        {/* 2. ABOUT ME */}
        <About data={about} />

        {/* 3. EDUCATION */}
        <Education items={education} />

        {/* 4. SKILLS */}
        <Skills items={skills} />

        {/* 5. PROJECTS PORTFOLIO */}
        <Projects items={projects} />

        {/* 6. WORK EXPERIENCE */}
        <Experience items={experience} />

        {/* 7. CERTIFICATES & TRAINING */}
        <Certificates items={certificates} />

        {/* 8. ACHIEVEMENTS */}
        <Achievements items={achievements} />

        {/* 9. LEADERSHIP */}
        <Leadership items={leadership} />

        {/* 10. CV / RESUME */}
        <CVResume data={cv} />

        {/* 11. BLOG & ARTICLES */}
        <BlogView items={blog} />

        {/* 12. CONTACT */}
        <Contact settings={settings} socials={socials} />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        socials={socials}
        onNavigate={handleNavigate}
      />

      {/* Requirement 4 & 9: Floating Hire Me (Bottom-Left) & WhatsApp (Bottom-Right) Buttons */}
      {!isAdminDashboardOpen && (
        <FloatingButtons phone={settings.phoneContact} email="danielowino233@gmail.com" />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setLocalAdmin(true);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Admin Panel Dashboard Modal / Overlay */}
      {isAdminDashboardOpen && (
        <AdminDashboard
          hero={hero}
          about={about}
          education={education}
          skills={skills}
          projects={projects}
          experience={experience}
          certificates={certificates}
          achievements={achievements}
          leadership={leadership}
          cv={cv}
          blog={blog}
          messages={messages}
          socials={socials}
          settings={settings}
          media={media}
          onCloseAdmin={() => setIsAdminDashboardOpen(false)}
          onLogoutAdmin={handleLogoutAdmin}
        />
      )}

    </div>
  );
}
