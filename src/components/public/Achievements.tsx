import React from 'react';
import { 
  Trophy, 
  Calendar, 
  Building, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { AchievementItem } from '../../types';

interface AchievementsProps {
  items: AchievementItem[];
}

export const Achievements: React.FC<AchievementsProps> = ({ items }) => {
  const publishedItems = items.filter(a => a.published);

  return (
    <section id="achievements" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Achievements & Awards
          </h2>
          <p className="text-slate-600 text-base">
            Hackathon victories, academic honors, competition milestones, and industry recognitions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {publishedItems.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No achievements published yet.
            </div>
          ) : (
            publishedItems.map((ach) => (
              <div 
                key={ach.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                {ach.imageUrl && (
                  <img
                    src={ach.imageUrl}
                    alt={ach.title}
                    className="w-full h-48 object-cover rounded-2xl border border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-extrabold rounded-full border border-amber-200/80 uppercase text-[10px] tracking-wider">
                      {ach.category}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {ach.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{ach.title}</h3>
                  <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {ach.organization}
                  </p>
                  
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                {ach.documentUrl && (
                  <div className="pt-2">
                    <a
                      href={ach.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-full border border-indigo-100 transition-colors"
                    >
                      View Supporting Document <ExternalLink className="w-3 h-3" />
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
