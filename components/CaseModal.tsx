import React, { useEffect } from 'react';
import { CaseStudy } from '../types';
import { X, Tag, PenTool, BarChart3, Terminal, Copy } from 'lucide-react';

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
        className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-dark-700">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full">
                {data.category}
              </span>
              {data.complexity && (
                <span className={`text-xs px-2.5 py-1 rounded-md font-bold border ${
                  data.complexity === 'Высокая' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                  data.complexity === 'Средняя' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {data.complexity}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {data.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Main Description */}
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-3">Описание</h3>
            <div className="text-gray-300 text-base leading-relaxed">
              {data.description}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-dark-900/50 p-5 rounded-xl border border-dark-700">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white text-sm">Результат (Impact)</span>
              </div>
              <p className="text-gray-300 text-sm">{data.impact}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PenTool className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-white text-sm">Инструменты</span>
              </div>
              <p className="text-gray-300 text-sm">{data.tools}</p>
            </div>
          </div>

          {/* Prompts Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-dark-700 pb-3">
              <Terminal className="w-5 h-5 text-brand-400" />
              <h3 className="text-lg font-bold text-white">Промпты и Инструкции</h3>
            </div>

            {data.prompts && data.prompts.length > 0 ? (
              <div className="space-y-4">
                {data.prompts.map((prompt, idx) => (
                  <div key={idx} className="bg-dark-900 rounded-xl p-4 relative group border border-dark-700">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-gray-400 hover:text-white bg-dark-700 hover:bg-dark-600 rounded-md"
                        onClick={() => navigator.clipboard.writeText(prompt)}
                        title="Копировать"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-brand-300 font-mono text-sm whitespace-pre-wrap break-words pr-10">{prompt}</pre>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-dark-900/50 rounded-xl border border-dashed border-dark-700">
                <Terminal className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500">Промпты для этого кейса будут добавлены в ближайшее время.</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-3">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 text-sm text-gray-300 bg-dark-900 border border-dark-700 px-3 py-1.5 rounded-full">
                  <Tag className="w-3.5 h-3.5 text-gray-500" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700 bg-dark-900/50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-dark-700 border border-dark-600 text-white font-medium rounded-xl hover:bg-dark-600 transition-colors"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};

export default CaseModal;
