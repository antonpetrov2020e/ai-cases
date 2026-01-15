import React from 'react';
import { CaseStudy } from '../types';
import { Tag, Zap, ArrowUpRight } from 'lucide-react';

interface CaseCardProps {
  data: CaseStudy;
  onClick?: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-dark-800 border border-dark-700 hover:border-brand-500/50 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-brand-500/10 transition-all duration-300 relative hover:-translate-y-1"
    >
      {/* Header Section */}
      <div className="p-5 pb-0">
        {/* Top Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-dark-900/95 text-gray-200 border border-white/10">
            {data.category}
          </span>
          {data.complexity && (
            <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border ${
              data.complexity === 'Высокая' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
              data.complexity === 'Средняя' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
              'bg-green-500/20 text-green-400 border-green-500/30'
            }`}>
              {data.complexity}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-brand-400 transition-colors line-clamp-2">
          {data.title}
        </h3>
      </div>

      {/* Content Section */}
      <div className="p-5 pt-0 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">
          {data.description}
        </p>

        {/* Result Area */}
        <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700/50 group-hover:border-brand-500/20 transition-colors mt-auto">
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-widest">Результат</span>
          </div>
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
            {data.impact}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-dark-700/50 flex items-end justify-between gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {data.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-dark-900 border border-dark-700 px-2 py-1 rounded-md whitespace-nowrap">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
            {data.tags.length > 2 && (
              <span className="text-[10px] font-bold text-gray-500 py-1">+{data.tags.length - 2}</span>
            )}
          </div>

          {/* Arrow */}
          <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 group-hover:bg-brand-600 group-hover:text-white transition-all shrink-0">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
