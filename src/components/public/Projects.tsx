import React, { useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Github, 
  Video, 
  Search, 
  Star, 
  X, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Target, 
  Lightbulb, 
  AlertCircle,
  Trophy,
  FolderGit2
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  items: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ items }) => {
  const publishedProjects = items.filter(p => p.published);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['ALL', ...Array.from(new Set(publishedProjects.map(p => p.category)))];

  const filteredProjects = publishedProjects.filter(p => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.technologies?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Featured Innovations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Software Projects & Engineering Work
          </h2>
          <p className="text-slate-600 text-base">
            Explore full-stack applications, cloud platforms, and software solutions built with modern technology stacks.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:border-indigo-500 shadow-2xs font-medium"
            />
          </div>

        </div>

        {/* Project Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No projects found matching your search criteria.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col overflow-hidden group p-5 space-y-4 justify-between"
              >
                {/* Thumbnail Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900 rounded-2xl flex items-center justify-center">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center p-4">
                      <FolderGit2 className="w-10 h-10 text-indigo-400/60" />
                    </div>
                  )}
                  
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-white text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Featured
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-100">
                        {tech}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 4 && (
                      <span className="px-2 py-1 text-slate-400 text-[10px] font-bold">
                        +{(project.technologies?.length || 0) - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    View Project <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source Code"
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

      {/* Detailed Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6 p-6 sm:p-8 my-8 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">
                  {activeProject.category}
                </span>
                {activeProject.startDate && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeProject.startDate} – {activeProject.completionDate || 'Ongoing'}
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeProject.title}
              </h3>
            </div>

            {/* Gallery / Main Image */}
            <div className="space-y-3">
              <img
                src={activeProject.thumbnailUrl}
                alt={activeProject.title}
                className="w-full h-64 sm:h-80 object-cover rounded-xl border border-slate-200"
                referrerPolicy="no-referrer"
              />
              {activeProject.galleryImages && activeProject.galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {activeProject.galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Gallery ${i}`}
                      className="w-full h-16 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Overview</h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {activeProject.detailedDescription || activeProject.shortDescription}
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProject.problemStatement && (
                <div className="p-4 bg-red-50/60 rounded-xl border border-red-200/60 space-y-1.5">
                  <h4 className="text-xs font-bold text-red-900 uppercase flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    Problem Statement
                  </h4>
                  <p className="text-xs text-red-950 leading-relaxed">
                    {activeProject.problemStatement}
                  </p>
                </div>
              )}

              {activeProject.solution && (
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1.5">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    Architectural Solution
                  </h4>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features */}
            {activeProject.keyFeatures?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Key Features & Modules</h4>
                <ul className="space-y-1.5">
                  {activeProject.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role & Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {activeProject.myRole && (
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-900">My Role: </span>
                  <span className="text-slate-600">{activeProject.myRole}</span>
                </div>
              )}
              {activeProject.results && (
                <div className="text-xs space-y-1">
                  <span className="font-bold text-emerald-700">Measurable Results: </span>
                  <span className="text-slate-600">{activeProject.results}</span>
                </div>
              )}
            </div>

            {/* External Links */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Repository
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Product Demo
                </a>
              )}
              {activeProject.videoUrl && (
                <a
                  href={activeProject.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl border border-indigo-200 transition-colors"
                >
                  <Video className="w-4 h-4" />
                  Watch Video Demo
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
