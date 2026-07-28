import React, { useState } from 'react';
import { 
  Code, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Filter
} from 'lucide-react';
import { SkillItem, SkillLevel } from '../../types';

interface SkillsProps {
  items: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ items }) => {
  const publishedSkills = items.filter(s => s.published);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(publishedSkills.map(s => s.category)))];

  const filteredSkills = selectedCategory === 'ALL' 
    ? publishedSkills 
    : publishedSkills.filter(s => s.category === selectedCategory);

  const getLevelBadge = (level: SkillLevel) => {
    switch (level) {
      case 'Proficient':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-200/80">Proficient</span>;
      case 'Advanced':
        return <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider border border-indigo-200/80">Advanced</span>;
      case 'Intermediate':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200/80">Intermediate</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider border border-slate-200">Beginner</span>;
    }
  };

  const getDotColor = (idx: number) => {
    const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-blue-500', 'bg-teal-500'];
    return colors[idx % colors.length];
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Code className="w-3.5 h-3.5" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering & Technical Skills
          </h2>
          <p className="text-slate-600 text-base">
            Verified expertise across programming languages, web frameworks, cloud architecture, databases, and professional practices.
          </p>
        </div>

        {/* Category Filters (Bento Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat === 'ALL' ? 'All Skills' : cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white border border-slate-200 rounded-3xl text-slate-500">
              No skills listed for this category.
            </div>
          ) : (
            filteredSkills.map((skill, idx) => (
              <div 
                key={skill.id || idx}
                className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${getDotColor(idx)} shrink-0`}></span>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Category</span>
                    <span className="font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{skill.category}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {skill.yearsOfExperience ? (
                    <span className="text-[11px] font-medium text-slate-400">
                      {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'yr exp' : 'yrs exp'}
                    </span>
                  ) : <span />}
                  {getLevelBadge(skill.level)}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
