import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  X, 
  Tag,
  Share2,
  FileText
} from 'lucide-react';
import Markdown from 'react-markdown';
import { BlogPost } from '../../types';

interface BlogViewProps {
  items: BlogPost[];
}

export const BlogView: React.FC<BlogViewProps> = ({ items }) => {
  const publishedPosts = items.filter(b => b.published);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['ALL', ...Array.from(new Set(publishedPosts.map(p => p.category)))];

  const filteredPosts = publishedPosts.filter(p => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Publications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Articles & Technical Insights
          </h2>
          <p className="text-slate-600 text-base">
            Writing about software architecture, full-stack engineering, cloud infrastructure, and AI engineering.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'ALL' ? 'All Articles' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:border-indigo-500 shadow-2xs font-medium"
            />
          </div>
        </div>

        {/* Blog Post Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No articles found matching your criteria.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <div className="space-y-3">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                    {post.featuredImageUrl ? (
                      <img
                        src={post.featuredImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-4">
                        <FileText className="w-10 h-10 text-indigo-400/60" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {post.publicationDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {post.readingTimeMinutes || 4} min read
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 tracking-tight">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>

                  <div className="flex gap-1">
                    {post.tags?.slice(0, 2).map((t, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] rounded-full font-bold">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            ))
          )}
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-10 my-8 relative space-y-6 animate-in fade-in">
            
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-3 pr-8 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                  {activePost.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> {activePost.readingTimeMinutes} min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {activePost.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <User className="w-3.5 h-3.5 text-indigo-600" /> {activePost.author || 'Daniel Owino'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published {activePost.publicationDate}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <img
              src={activePost.featuredImageUrl}
              alt={activePost.title}
              className="w-full h-64 object-cover rounded-2xl border border-slate-200"
              referrerPolicy="no-referrer"
            />

            {/* Content Body */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <Markdown>{activePost.content}</Markdown>
            </div>

            {/* Tags Footer */}
            {activePost.tags?.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <div className="flex flex-wrap gap-1.5">
                  {activePost.tags.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
