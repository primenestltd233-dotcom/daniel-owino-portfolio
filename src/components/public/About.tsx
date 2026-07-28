import React from 'react';
import { 
  User, 
  Target, 
  Compass, 
  CheckCircle, 
  Lightbulb, 
  Flag, 
  Award,
  Sparkles
} from 'lucide-react';
import { AboutSection } from '../../types';

interface AboutProps {
  data: AboutSection;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <User className="w-3.5 h-3.5" />
            <span>Professional Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Daniel Owino
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {data.personalIntro}
          </p>
        </div>

        {/* Bento Grid: Bio + Image + Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Bio Bento Box */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Software Engineering & Technical Background
                </h3>
              </div>
              <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                {data.biography}
              </div>
            </div>

            {/* Core Values Pills */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Core Engineering Values
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.values?.map((val, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-900 text-xs font-bold rounded-xl transition-colors border border-indigo-100"
                  >
                    ✓ {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Photo & Specialization Bento Box */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-100 border border-slate-100">
              <img
                src={data.profileImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'}
                alt="Daniel Owino"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Specializations list */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                Key Focus Areas
              </h4>
              <ul className="space-y-1.5">
                {data.specializations?.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bento Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Mission Bento Box */}
          <div className="p-6 sm:p-8 bg-indigo-600 text-white rounded-3xl shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block">Core Purpose</span>
            <h3 className="text-xl font-extrabold tracking-tight">My Professional Mission</h3>
            <p className="text-indigo-50 text-sm leading-relaxed">
              {data.mission}
            </p>
          </div>

          {/* Vision Bento Box */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block">Future Roadmap</span>
            <h3 className="text-xl font-extrabold tracking-tight">Strategic Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {data.vision}
            </p>
          </div>

        </div>

        {/* Goals Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Short-Term Goals */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Short-Term Objectives</h4>
                <p className="text-xs text-slate-500">1 - 2 Year Horizon</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {data.shortTermGoals?.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long-Term Goals */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-900 text-white rounded-2xl">
                <Flag className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Long-Term Career Vision</h4>
                <p className="text-xs text-slate-500">3 - 5+ Year Horizon</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {data.longTermGoals?.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
