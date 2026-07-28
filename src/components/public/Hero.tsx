import React from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  CalendarCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { HeroSection } from '../../types';

interface HeroProps {
  data: HeroSection;
  totalProjects: number;
  totalCertificates: number;
  totalEducation: number;
  yearsOfExperience: number;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  totalProjects,
  totalCertificates,
  totalEducation,
  yearsOfExperience,
  onNavigate,
}) => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Interactive Suite & Portfolio
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
            Based in Nairobi • Open for Full-Stack & Engineering
          </span>
        </div>

        {/* Primary Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Bento Tile 1: Main Introduction (Large Tile - 8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] font-black text-8xl pointer-events-none select-none text-slate-900">
              ENGINEER
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Senior Software Engineering</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-4 tracking-tighter">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700">{data.fullName}</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed mb-6 font-normal">
                {data.shortIntro}
              </p>

              <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-2xl text-slate-700 font-medium italic text-xs sm:text-sm mb-6">
                "{data.tagline}"
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(data.primaryButtonLink?.replace('#', '') || 'projects')}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-slate-900/15 transition-all transform hover:-translate-y-0.5"
              >
                <span>{data.primaryButtonText || 'View My Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate(data.secondaryButtonLink?.replace('#', '') || 'resume')}
                className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-full border border-slate-200 shadow-xs transition-all hover:border-slate-300"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>{data.secondaryButtonText || 'Download CV'}</span>
              </button>

              <button
                onClick={() => onNavigate(data.contactButtonLink?.replace('#', '') || 'contact')}
                className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-indigo-600 font-semibold text-xs sm:text-sm rounded-full hover:bg-indigo-50/60 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{data.contactButtonText || 'Contact Me'}</span>
              </button>
            </div>
          </div>

          {/* Bento Tile 2: Verified Profile Card & Live Status (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-100 border border-slate-100">
              <img
                src={data.profileImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'}
                alt={data.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Live Portfolio Metrics</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Software Engine</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">{totalProjects}+</h2>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Completed Projects & Apps</p>
            </div>

            <div className="h-1.5 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-4/5 rounded-full"></div>
            </div>
          </div>

          {/* Bento Tile 3: Certifications Accent Box (4 cols) */}
          <div className="lg:col-span-4 bg-indigo-600 rounded-3xl p-6 shadow-md flex items-center justify-between text-white hover:bg-indigo-700 transition-colors cursor-pointer" onClick={() => onNavigate('certificates')}>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold opacity-80 uppercase tracking-widest block">Accredited Credentials</span>
              <span className="text-2xl font-extrabold">{totalCertificates} Professional</span>
              <p className="text-[11px] opacity-90 font-medium">AWS, GCP, Full-Stack & Cyber</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Bento Tile 4: Experience Dark Accent Box (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 shadow-md flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => onNavigate('experience')}>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">Proven Work History</span>
              <span className="text-2xl font-extrabold">{yearsOfExperience}+ Years Experience</span>
              <p className="text-[11px] text-slate-400 font-medium">Software Engineering & Leadership</p>
            </div>
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6 text-indigo-400" />
            </div>
          </div>

          {/* Bento Tile 5: Academic Qualifications Box (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between hover:border-indigo-300 transition-colors cursor-pointer" onClick={() => onNavigate('education')}>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Academic Degree</span>
              <span className="text-2xl font-extrabold text-slate-900">{totalEducation} Qualification</span>
              <p className="text-[11px] text-slate-500 font-medium">Software Development & Computer Science</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 text-indigo-600">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
