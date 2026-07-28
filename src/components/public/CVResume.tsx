import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  History, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { CVItem } from '../../types';

interface CVResumeProps {
  data: CVItem;
}

export const CVResume: React.FC<CVResumeProps> = ({ data }) => {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <section id="resume" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional CV & Resume
          </h2>
          <p className="text-slate-600 text-base">
            Download or view Daniel Owino's latest official Curriculum Vitae detailing full academic background, work experience, and certifications.
          </p>
        </div>

        {/* Main Resume Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md shadow-indigo-600/20">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{data.title || 'Official Curriculum Vitae'}</h3>
                <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Active Version {data.version} • Updated {data.updatedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowViewer(!showViewer)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200/70 text-slate-800 font-bold text-xs rounded-full transition-colors"
              >
                <Eye className="w-4 h-4 text-indigo-600" />
                <span>{showViewer ? 'Hide Preview' : 'View CV'}</span>
              </button>

              <a
                href={data.pdfUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                download={data.fileName || 'Daniel_Owino_CV.pdf'}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-md shadow-indigo-600/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Professional Summary Box */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Executive Overview</h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.summary}
            </p>
          </div>

          {/* Inline PDF Preview Frame */}
          {showViewer && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-semibold text-slate-700">PDF Preview Document</span>
                <a 
                  href={data.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline flex items-center gap-1 font-bold"
                >
                  Open in New Tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-[550px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  src={data.pdfUrl}
                  title="Daniel Owino CV Document"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* Previous Versions Archive */}
          {data.previousVersions && data.previousVersions.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                CV Archive
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.previousVersions.map((ver, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">Version {ver.version}</span>
                      <p className="text-[10px] text-slate-400 font-medium">Archived {ver.updatedAt}</p>
                    </div>
                    <a
                      href={ver.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                      title="Download Archive"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
