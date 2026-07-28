import React from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Award, 
  HeartHandshake 
} from 'lucide-react';
import { LeadershipItem } from '../../types';

interface LeadershipProps {
  items: LeadershipItem[];
}

export const Leadership: React.FC<LeadershipProps> = ({ items }) => {
  const publishedItems = items.filter(l => l.published);

  return (
    <section id="leadership" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>Community Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Leadership & Community
          </h2>
          <p className="text-slate-600 text-base">
            Technical community leadership, developer mentorship, and technology volunteer initiatives.
          </p>
        </div>

        {/* Bento Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {publishedItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No leadership records published yet.
            </div>
          ) : (
            publishedItems.map((lead) => (
              <div 
                key={lead.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{lead.position}</h3>
                    <p className="text-sm font-semibold text-indigo-600">{lead.organization}</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {lead.startDate} – {lead.endDate}
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {lead.description}
                </p>

                {lead.responsibilities?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Contributions</h4>
                    <ul className="space-y-2">
                      {lead.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lead.achievements?.length > 0 && (
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60 space-y-1.5">
                    <h4 className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      Leadership Milestones
                    </h4>
                    <ul className="space-y-1">
                      {lead.achievements.map((ach, i) => (
                        <li key={i} className="text-xs text-emerald-950 font-medium flex items-center gap-1.5">
                          <span>• {ach}</span>
                        </li>
                      ))}
                    </ul>
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
