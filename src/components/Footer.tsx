import React from 'react';
import { 
  Heart, 
  Linkedin, 
  Github, 
  Twitter, 
  Mail,
  ArrowUp
} from 'lucide-react';
import { SiteSettings, SocialLink } from '../types';

interface FooterProps {
  settings: SiteSettings;
  socials: SocialLink[];
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, socials, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'github': return <Github className="w-4 h-4" />;
      case 'twitter':
      case 'x/twitter': return <Twitter className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-600/30">
                DO
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                {settings.logoText || 'DANIEL OWINO'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">
              {settings.footerText || 'Empowering innovation through software engineering, cloud solutions, and leadership.'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button onClick={() => onNavigate('home')} className="text-left hover:text-indigo-400 transition-colors">Home</button>
              <button onClick={() => onNavigate('about')} className="text-left hover:text-indigo-400 transition-colors">About</button>
              <button onClick={() => onNavigate('education')} className="text-left hover:text-indigo-400 transition-colors">Education</button>
              <button onClick={() => onNavigate('skills')} className="text-left hover:text-indigo-400 transition-colors">Skills</button>
              <button onClick={() => onNavigate('projects')} className="text-left hover:text-indigo-400 transition-colors">Projects</button>
              <button onClick={() => onNavigate('experience')} className="text-left hover:text-indigo-400 transition-colors">Experience</button>
              <button onClick={() => onNavigate('certificates')} className="text-left hover:text-indigo-400 transition-colors">Certificates</button>
              <button onClick={() => onNavigate('resume')} className="text-left hover:text-indigo-400 transition-colors">CV / Resume</button>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">Connect Online</p>
            <div className="flex flex-wrap gap-2">
              {socials.filter(s => s.published).map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-2xl transition-all border border-slate-700/50"
                  title={soc.platform}
                >
                  {getSocialIcon(soc.platform)}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 font-medium">
            {settings.copyrightText || '© 2026 Daniel Owino. All rights reserved.'}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors border border-slate-700/60 font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
