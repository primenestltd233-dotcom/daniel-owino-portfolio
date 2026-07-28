import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Building2 
} from 'lucide-react';
import { ExperienceItem } from '../../types';

interface ExperienceProps {
  items: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const publishedItems = items.filter(e => e.published);

  return (
    <section id="experience" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Work Experience & Roles
          </h2>
          <p className="text-slate-600 text-base">
            Professional positions, software engineering internships, and technology consulting roles.
          </p>
        </div>

        {/* Experience Bento Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {publishedItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No work experience entries published yet.
            </div>
          ) : (
            publishedItems.map((exp) => (
              <div 
                key={exp.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-4">
                    {exp.organizationLogo ? (
                      <img 
                        src={exp.organizationLogo} 
                        alt={exp.organization}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 bg-white"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
                        <Building2 className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{exp.position}</h3>
                      <p className="text-sm font-semibold text-indigo-600">{exp.organization}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                      {exp.employmentType}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                {exp.responsibilities?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Responsibilities</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills used */}
                {exp.skillsUsed?.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">Skills Applied:</span>
                    {exp.skillsUsed.map((sk, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold rounded-full">
                        {sk}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
