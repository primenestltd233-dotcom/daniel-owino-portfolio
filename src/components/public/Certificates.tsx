import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  CheckCircle, 
  X, 
  Eye, 
  ShieldCheck,
  FileText,
  Download
} from 'lucide-react';
import { CertificateItem } from '../../types';

interface CertificatesProps {
  items: CertificateItem[];
}

export const Certificates: React.FC<CertificatesProps> = ({ items }) => {
  const publishedItems = items.filter(c => c.published);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Accredited Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certifications & Technical Credentials
          </h2>
          <p className="text-slate-600 text-base">
            Professional industry certifications, cloud architecture accreditations, and verified engineering credentials.
          </p>
        </div>

        {/* Certificate Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedItems.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              No certificates published yet.
            </div>
          ) : (
            publishedItems.map((cert) => {
              const displayImg = cert.imageUrl || (cert.certificateFileUrl && !cert.certificateFileUrl.endsWith('.pdf') ? cert.certificateFileUrl : null);
              return (
                <div 
                  key={cert.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Optional Thumbnail Image */}
                    {displayImg ? (
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                        <img
                          src={displayImg}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                          {cert.category}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-indigo-100">
                          {cert.category}
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{cert.title}</h3>
                      <p className="text-xs font-semibold text-indigo-600">{cert.issuingOrganization}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>

                    {/* Skills Acquired */}
                    {cert.skillsAcquired && cert.skillsAcquired.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cert.skillsAcquired.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Issued: {cert.issueDate}
                      </span>
                      {cert.credentialId && (
                        <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-700 font-semibold">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-full transition-colors border border-indigo-100 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Certificate
                      </button>

                      {(cert.downloadUrl || cert.certificateFileUrl) && (
                        <a
                          href={cert.downloadUrl || cert.certificateFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-indigo-400" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-4 relative border border-slate-200 animate-in fade-in">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedCert.title}</h3>
                <p className="text-xs text-slate-500">{selectedCert.issuingOrganization} • Issued {selectedCert.issueDate}</p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl overflow-hidden min-h-[250px] flex items-center justify-center border border-slate-200">
              {selectedCert.certificateFileUrl?.endsWith('.pdf') ? (
                <div className="p-8 text-center space-y-3">
                  <FileText className="w-12 h-12 text-indigo-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">PDF Certificate Document</p>
                  <a
                    href={selectedCert.certificateFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-md shadow-indigo-600/20"
                  >
                    Open PDF Document <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (selectedCert.imageUrl || selectedCert.certificateFileUrl) ? (
                <img
                  src={selectedCert.imageUrl || selectedCert.certificateFileUrl}
                  alt={selectedCert.title}
                  className="w-full max-h-[400px] object-contain"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm font-semibold">
                  Certificate image preview unavailable
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span>Credential ID: <strong className="text-slate-800">{selectedCert.credentialId || 'N/A'}</strong></span>
              {(selectedCert.verificationUrl || selectedCert.credentialUrl) && (
                <a
                  href={selectedCert.verificationUrl || selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-bold flex items-center gap-1"
                >
                  Verify Official Record <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
