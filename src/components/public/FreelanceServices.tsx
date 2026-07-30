import React, { useState } from 'react';
import { 
  Wrench, 
  Image as ImageIcon, 
  Sparkles, 
  Church, 
  Share2, 
  Building2, 
  Code, 
  Terminal, 
  ShieldAlert, 
  Check, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare,
  ArrowRight,
  Zap,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { FreelanceServicesSection, ContactMessage } from '../../types';

interface FreelanceServicesProps {
  data: FreelanceServicesSection;
  onSendMessage?: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read' | 'archived'>) => Promise<void>;
}

// Icon helper to dynamically map icon names
const renderIcon = (iconName: string, className: string = 'w-6 h-6') => {
  switch (iconName.toLowerCase()) {
    case 'image':
      return <ImageIcon className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'church':
      return <Church className={className} />;
    case 'share2':
    case 'share':
      return <Share2 className={className} />;
    case 'building2':
    case 'building':
      return <Building2 className={className} />;
    case 'code':
      return <Code className={className} />;
    case 'terminal':
      return <Terminal className={className} />;
    case 'shieldalert':
    case 'shield':
      return <ShieldAlert className={className} />;
    default:
      return <Zap className={className} />;
  }
};

export const FreelanceServices: React.FC<FreelanceServicesProps> = ({ data, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState<'Graphic Design' | 'Web Development'>('Graphic Design');
  
  // Contact Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Freelance Services Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (onSendMessage) {
        await onSendMessage({
          name: formData.name,
          email: formData.email,
          subject: `${formData.subject}${formData.phone ? ` (${formData.phone})` : ''}`,
          message: formData.message,
        });
      }
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'Freelance Services Inquiry', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter pricing by category
  const graphicPricing = data.pricing?.filter(p => p.category === 'Graphic Design') || [];
  const webPricing = data.pricing?.filter(p => p.category === 'Web Development') || [];
  const currentPricing = activeTab === 'Graphic Design' ? graphicPricing : webPricing;

  return (
    <section id="freelance-services" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
            <Wrench className="w-3.5 h-3.5 text-indigo-600" />
            <span>DAN'S DevOps Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {data.sectionTitle || "DAN'S DevOps — Freelance Services"}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {data.subtitle || "Web Development, DevOps, Graphic Design & Cybersecurity services for businesses, churches, and individuals across Kenya."}
          </p>
        </div>

        {/* INTRO / ABOUT BLOCK */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                Pioneering Excellence
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {data.introHeadline || "Pioneering Digital Innovation in the Heart of Kenya"}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {data.introBody || "I transform complex technological landscapes into elegant digital solutions, bridging modern software engineering with intuitive, user-centered design. My work spans web development, DevOps, cybersecurity, and graphic design."}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <a
                href={data.whatsappLink || "https://wa.me/254708083643"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Core Service Offerings</h3>
            <p className="text-sm text-slate-600">Tailored digital solutions crafted with precision and dedication</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services?.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-indigo-300 group flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Service Custom Image Container */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.label}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback gracefully if image fails to load
                          (e.target as HTMLElement).style.display = 'none';
                          const fallbackParent = (e.target as HTMLElement).parentElement;
                          if (fallbackParent) {
                            fallbackParent.classList.add('flex', 'items-center', 'justify-center', 'bg-indigo-50/70');
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100/40 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-xs text-indigo-600 flex items-center justify-center">
                          {renderIcon(service.iconName, 'w-6 h-6')}
                        </div>
                      </div>
                    )}
                    {/* Floating Icon Badge */}
                    <div className="absolute top-2.5 right-2.5 w-9 h-9 rounded-lg bg-white/95 backdrop-blur-xs text-indigo-600 shadow-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {renderIcon(service.iconName, 'w-4 h-4')}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {service.label}
                  </h4>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-indigo-600">
                  <span>Professional Service</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS ROW */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-slate-900 to-indigo-950/40 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {data.stats?.map((stat, idx) => (
              <div key={stat.id} className={`pt-6 lg:pt-0 ${idx !== 0 ? 'lg:pl-6' : ''}`}>
                <div className="text-4xl sm:text-5xl font-black text-indigo-400 tracking-tight">
                  {stat.number}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING TABLES */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">Transparent & Affordable Pricing</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              High-quality design & software engineering packages tailored for every budget.
            </p>

            {/* Category Toggle Tabs */}
            <div className="inline-flex p-1.5 bg-slate-200/70 rounded-2xl">
              <button
                onClick={() => setActiveTab('Graphic Design')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'Graphic Design'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Graphic Design Packages
              </button>
              <button
                onClick={() => setActiveTab('Web Development')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'Web Development'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Web Development Packages
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {currentPricing.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 hover:shadow-xl ${
                  tier.popular
                    ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-lg scale-102 z-10'
                    : 'border-slate-200/80 shadow-sm hover:border-indigo-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {tier.category}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 mt-1">{tier.name}</h4>
                  </div>

                  <div className="pb-6 border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Includes:</p>
                    <ul className="space-y-2.5">
                      {tier.features?.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6">
                  <a
                    href={tier.buttonLink || data.whatsappLink || "https://wa.me/254708083643"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                      tier.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-900 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    <span>{tier.buttonText || 'Get Started'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
              Client Feedback
            </span>
            <h3 className="text-3xl font-bold text-slate-900">What Clients Say</h3>
            <p className="text-sm text-slate-600">Real testimonials from individuals and businesses across Kenya</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.testimonials?.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-6 relative"
              >
                <Quote className="w-10 h-10 text-indigo-100 absolute top-6 right-6 pointer-events-none" />
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{t.name}</h5>
                    <p className="text-xs text-indigo-600 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT / CTA BLOCK */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-3xl font-bold text-slate-900">{data.contactHeading || "Get in Touch"}</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              {data.contactSubtext || "Let's turn your ideas into a powerful digital experience."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/60">
              <h4 className="text-lg font-bold text-slate-900">Direct Contact Details</h4>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${data.phone || '0708083643'}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/80 hover:border-indigo-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Phone / WhatsApp</p>
                    <p className="text-sm font-bold text-slate-900">{data.phone || '0708083643'}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${data.email || 'demmizkenya@gmail.com'}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/80 hover:border-indigo-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Email Address</p>
                    <p className="text-sm font-bold text-slate-900">{data.email || 'demmizkenya@gmail.com'}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Location</p>
                    <p className="text-sm font-bold text-slate-900">{data.location || 'Kisumu, Kenya'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <a
                  href={data.whatsappLink || "https://wa.me/254708083643"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Interactive Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950">Message Sent Successfully!</h4>
                  <p className="text-sm text-emerald-800">
                    Thank you for reaching out. Daniel will review your inquiry and get back to you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mary Kodonyo"
                        required
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. mary@example.com"
                        required
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0708083643"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Web Development Inquiry"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, design needs, or website requirements..."
                      required
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Sending...' : 'Contact Us'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
