import React, { useEffect } from 'react';
import { CaseStudy } from '../types';
import { X, Tag, PenTool, BarChart3, Terminal, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CaseModalProps {
  data: CaseStudy;
  onClose: () => void;
}

const CaseModal: React.FC<CaseModalProps> = ({ data, onClose }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-indigo-600 bg-indigo-50 rounded-full">
                {data.category}
              </span>
              {data.complexity && (
                  <span className={`text-xs px-2 py-1 rounded border ${
                      data.complexity === 'Высокая' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                      data.complexity === 'Средняя' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-green-50 text-green-600 border-green-100'
                  }`}>
                      {data.complexity}
                  </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {data.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Main Description */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">Описание</h3>
            <div className="text-slate-800 text-lg leading-relaxed">
              {data.description}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-slate-900 text-sm">Результат (Impact)</span>
               </div>
               <p className="text-slate-700">{data.impact}</p>
            </div>
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <PenTool className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-slate-900 text-sm">Инструменты</span>
               </div>
               <p className="text-slate-700">{data.tools}</p>
            </div>
          </div>

          {/* Prompts Section */}
          <div>
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <Terminal className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Промпты и Инструкции</h3>
             </div>
             
             {data.prompts && data.prompts.length > 0 ? (
                 <div className="space-y-4">
                    {data.prompts.map((prompt, idx) => (
                        <div key={idx} className="bg-slate-900 rounded-lg p-4 relative group">
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    className="p-1.5 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded"
                                    onClick={() => navigator.clipboard.writeText(prompt)}
                                    title="Копировать"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                            <pre className="text-indigo-100 font-mono text-sm whitespace-pre-wrap break-words">{prompt}</pre>
                        </div>
                    ))}
                 </div>
             ) : (
                 <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <Terminal className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500">Промпты для этого кейса будут добавлены в ближайшее время.</p>
                 </div>
             )}
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-3">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};

export default CaseModal;