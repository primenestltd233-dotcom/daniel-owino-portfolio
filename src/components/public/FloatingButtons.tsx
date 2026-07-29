import React from 'react';
import { Mail } from 'lucide-react';

interface FloatingButtonsProps {
  email?: string;
  phone?: string;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  email = 'danielowino233@gmail.com',
  phone = '+254712345678'
}) => {
  // Format phone number for WhatsApp wa.me URL
  const cleanPhone = phone.replace(/[^0-9]/g, '') || '254712345678';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Daniel, I visited your portfolio and would like to connect with you!')}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Software Engineering Engagement & Collaboration')}`;

  return (
    <>
      {/* Bottom-Left: Floating "Hire Me" Button */}
      <div className="fixed bottom-6 left-6 z-40 group">
        <a
          href={mailtoUrl}
          aria-label="Hire Daniel Owino via Email"
          className="relative inline-flex items-center gap-2.5 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-xl shadow-indigo-600/30 transition-all duration-300 transform hover:scale-105 border border-indigo-400/40 animate-cta-pulse"
        >
          <Mail className="w-4 h-4 text-white animate-bounce" />
          <span>Hire Me</span>
          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </a>
      </div>

      {/* Bottom-Right: Floating Official WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Tooltip Badge */}
        <span className="hidden md:inline-block px-3 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-xl shadow-lg border border-slate-700/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Daniel Owino on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 transform hover:scale-110 animate-whatsapp-pulse group"
        >
          {/* Official WhatsApp SVG Icon */}
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.636 0 5.115 1.028 6.978 2.89 1.862 1.863 2.888 4.341 2.888 6.979 0 5.446-4.428 9.875-9.874 9.875m0-18.232c-6.182 0-11.211 5.029-11.211 11.211 0 1.975.513 3.904 1.488 5.6l-1.581 5.772 5.908-1.55a11.173 11.173 0 005.396 1.39h.005c6.181 0 11.21-5.028 11.21-11.211 0-2.992-1.165-5.805-3.284-7.924-2.12-2.118-4.932-3.283-7.931-3.283" />
          </svg>
        </a>
      </div>
    </>
  );
};
