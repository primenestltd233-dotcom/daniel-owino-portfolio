import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle, 
  BookOpen, 
  Award, 
  FileText 
} from 'lucide-react';
import { EducationItem } from '../../types';

interface EducationProps {
  items: EducationItem[];
}

export const Education: React.FC<EducationProps> = ({ items }) => {
  const publishedItems = items.filter(i => i.published);

  return (
    <section id="education" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Education & Academic Background
          </h2>
          <p className="text-slate-600 text-base">
            Formal computer science education, software development coursework, and university achievements.
          </p>
        </div>

        {/* Bento Card Grid */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {publishedItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No education records published yet.
            </div>
          ) : (
            publishedItems.map((edu, idx) => (
              <div 
                key={edu.id || idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    {edu.institutionLogo ? (
                      <img 
                        src={edu.institutionLogo} 
                        alt={edu.institution}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{edu.degree}</h3>
                      <p className="text-sm font-semibold text-indigo-600">{edu.institution}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      edu.currentStatus 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {edu.currentStatus ? 'Ongoing' : 'Completed'}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {edu.startDate} – {edu.currentStatus ? 'Present' : edu.endDate}
                    </span>
                  </div>
                </div>

                {/* Field of Study & Description */}
                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-800">
                    Field of Study: <span className="text-slate-600 font-normal">{edu.fieldOfStudy}</span>
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {/* Coursework & Achievements Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* Relevant Subjects */}
                  {edu.relevantSubjects?.length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        Key Coursework & Modules
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.relevantSubjects.map((sub, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white text-slate-700 border border-slate-200/80 rounded-lg text-xs font-semibold">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {edu.achievements?.length > 0 && (
                    <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        Academic Honors
                      </h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-amber-950 font-medium">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Supporting Certificate Document */}
                {edu.certificateUrl && (
                  <div className="pt-2">
                    <a
                      href={edu.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full transition-colors border border-indigo-200"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Academic Document / Transcript
                    </a>
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
