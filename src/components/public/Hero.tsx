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
  Sparkles,
  User
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Interactive Suite & Portfolio
            </span>
          </div>

          {/* Requirement 8: "THE TECHNICAL COMPETENCIES" Animated Button */}
          <button
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md shadow-indigo-600/20 transition-all transform hover:scale-105 animate-cta-pulse border border-indigo-400/40 cursor-pointer"
            aria-label="Navigate to Technical Competencies"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>THE TECHNICAL COMPETENCIES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Bento Tile 1: Main Introduction (Large Tile - 8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] font-black text-8xl pointer-events-none select-none text-slate-900">
              ENGINEER
            </div>

            <div>
              {/* Requirement 3: Editable "SENIOR SOFTWARE ENGINEERING" (data.title) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{data.title || 'Senior Software Engineering'}</span>
              </div>

              {/* Requirement 6: Animated Wave Text for "DANIEL OWINO" */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-4 tracking-tighter">
                Hi, I'm{' '}
                <span className="inline-flex flex-wrap">
                  {(data.fullName || 'DANIEL OWINO').split('').map((char, idx) => (
                    <span
                      key={idx}
                      className="inline-block animate-wave-letter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:text-indigo-500 transition-colors"
                      style={{ 
                        animationDelay: `${idx * 0.08}s`,
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
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
              {/* Requirement 7: Animated Pulsing "Explore Projects" CTA Button */}
              <button
                onClick={() => onNavigate(data.primaryButtonLink?.replace('#', '') || 'projects')}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-xl shadow-slate-900/20 transition-all duration-300 transform hover:-translate-y-0.5 animate-cta-pulse cursor-pointer border border-slate-800"
              >
                <span>{data.primaryButtonText || 'Explore Projects'}</span>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
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
            
            <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-900 border border-slate-800 flex items-center justify-center">
              {data.profileImageUrl ? (
                <img
                  src={data.profileImageUrl}
                  alt={data.fullName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 space-y-1 p-4">
                  <User className="w-10 h-10 text-slate-500" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{data.fullName || 'Daniel Owino'}</span>
                </div>
              )}
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
