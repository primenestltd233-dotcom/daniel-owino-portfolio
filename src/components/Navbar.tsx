import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Lock, 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Code, 
  Briefcase, 
  Award, 
  Trophy, 
  Users, 
  FileText, 
  BookOpen, 
  Mail, 
  Home,
  LogOut,
  Wrench
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  adminUser: FirebaseUser | null;
  onOpenAdmin: () => void;
  onLogoutAdmin: () => void;
  siteTitle?: string;
  logoText?: string;
}

export const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'freelance-services', label: "DAN'S DEVOPS", icon: Wrench },
  { id: 'education', label: 'EDUCATION', icon: GraduationCap },
  { id: 'skills', label: 'SKILLS', icon: Code },
  { id: 'projects', label: 'PROJECTS', icon: Briefcase },
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'certificates', label: 'CERTIFICATES', icon: Award },
  { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy },
  { id: 'leadership', label: 'LEADERSHIP', icon: Users },
  { id: 'resume', label: 'CV / RESUME', icon: FileText },
  { id: 'blog', label: 'BLOG', icon: BookOpen },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  adminUser,
  onOpenAdmin,
  onLogoutAdmin,
  logoText = 'DANIEL OWINO',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' 
        : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              DO
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 block leading-none">
                {logoText}
              </span>
              <span className="text-indigo-600 uppercase text-[10px] font-medium tracking-wider px-2 py-0.5 bg-indigo-50 rounded-md border border-indigo-100 inline-block mt-0.5">
                Professional Suite
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action / Admin Button */}
          <div className="hidden sm:flex items-center gap-3">
            {adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md shadow-indigo-600/20 transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Admin Panel
                </button>
                <button
                  onClick={onLogoutAdmin}
                  title="Logout Admin"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 rounded-full transition-all shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Admin Portal
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              title="Admin"
            >
              {adminUser ? <LayoutDashboard className="w-5 h-5 text-blue-600" /> : <Lock className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {adminUser ? (
              <div className="w-full flex gap-2">
                <button
                  onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Open Admin Dashboard
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                Admin Portal Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
