import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { sendContactMessage } from '../../lib/portfolioService';
import { SocialLink, SiteSettings } from '../../types';
import { SocialIcon } from '../common/SocialIcon';

interface ContactProps {
  settings: SiteSettings;
  socials: SocialLink[];
}

export const Contact: React.FC<ContactProps> = ({ settings, socials }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all required fields.');
      return;
    }

    setSending(true);
    setError(null);
    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err: any) {
      setError(err?.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get In Touch With Daniel
          </h2>
          <p className="text-slate-600 text-base">
            Have a software engineering opportunity, consulting engagement, or project collaboration in mind?
          </p>
        </div>

        {/* Bento Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          
          {/* Info Card Column */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-8 border border-slate-800">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Contact Details
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Available for full-time engineering roles, cloud consultancy, and technical speaking opportunities.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Email Address</p>
                    <a href={`mailto:${settings.emailContact}`} className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors">
                      {settings.emailContact}
                    </a>
                  </div>
                </div>

                {settings.phoneContact && (
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Phone</p>
                      <p className="text-sm font-semibold text-white">{settings.phoneContact}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-purple-600/30 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Location</p>
                    <p className="text-sm font-semibold text-white">{settings.locationContact || 'Nairobi, Kenya'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Connect Online</p>
              <div className="flex flex-wrap gap-2.5">
                {socials.filter(s => s.published).map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.platform}
                    className="p-3 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-2xl transition-all duration-200 border border-slate-700/60 transform hover:scale-110 shadow-sm"
                    title={soc.platform}
                  >
                    <SocialIcon platform={soc.platform} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Send a Direct Message
            </h3>

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs font-semibold">
                  <strong>Message Sent Successfully!</strong> Thank you for reaching out. Daniel will respond promptly.
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-900 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-xs font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineering Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type your message details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
