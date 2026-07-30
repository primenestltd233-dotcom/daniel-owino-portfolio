import React from 'react';
import { MessageSquareQuote, Star, User, Quote } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialsProps {
  items: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ items }) => {
  const publishedItems = items.filter(t => t.published);

  if (publishedItems.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client & Mentor Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Testimonials & Endorsements
          </h2>
          <p className="text-slate-600 text-base">
            What clients, academic supervisors, and project partners say about working with Daniel Owino.
          </p>
        </div>

        {/* Testimonials Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {publishedItems.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-6 relative group"
            >
              <Quote className="w-8 h-8 text-indigo-200 absolute top-6 right-6 pointer-events-none group-hover:text-indigo-300 transition-colors" />

              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 flex items-center justify-center">
                  {testimonial.avatarUrl ? (
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {testimonial.role}{testimonial.company ? ` • ${testimonial.company}` : ''}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
