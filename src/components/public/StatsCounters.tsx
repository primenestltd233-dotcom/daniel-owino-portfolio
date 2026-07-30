import React, { useState, useEffect } from 'react';
import { Briefcase, Code, Award, Users, GraduationCap, Sparkles } from 'lucide-react';

interface StatsCountersProps {
  totalProjects: number;
  totalCertificates: number;
  yearsOfExperience: number;
  clientsServed?: number;
  technologiesCount?: number;
}

export const StatsCounters: React.FC<StatsCountersProps> = ({
  totalProjects,
  totalCertificates,
  yearsOfExperience,
  clientsServed = 14,
  technologiesCount = 24,
}) => {
  const stats = [
    {
      id: 'stat-1',
      label: 'Projects Completed',
      value: totalProjects || 12,
      suffix: '+',
      icon: Briefcase,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      id: 'stat-2',
      label: 'Technologies Used',
      value: technologiesCount,
      suffix: '+',
      icon: Code,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      id: 'stat-3',
      label: 'Certificates Earned',
      value: totalCertificates || 8,
      suffix: '',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      id: 'stat-4',
      label: 'Clients Served',
      value: clientsServed,
      suffix: '+',
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'stat-5',
      label: 'Years of Learning & Exp',
      value: yearsOfExperience || 4,
      suffix: '+ Yrs',
      icon: GraduationCap,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-100',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-indigo-300 hover:bg-white transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center space-y-2 group"
              >
                <div className={`p-3 rounded-2xl border ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs font-bold text-slate-600 leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
