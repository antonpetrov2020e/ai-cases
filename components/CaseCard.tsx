import React from 'react';
import { CaseStudy } from '../types';
import { Tag, PenTool, Zap, ArrowUpRight } from 'lucide-react';

interface CaseCardProps {
  data: CaseStudy;
  onClick?: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ data, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer hover:border-indigo-500 hover:-translate-y-1 overflow-hidden"
    >
      {/* Visual Indicator */}
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
          <ArrowUpRight className="w-5 h-5 text-indigo-500" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-[0.1em] text-indigo-600 bg-indigo-50 border border-indigo-100">
          {data.category}
        </span>
        {data.complexity && (
            <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-black uppercase tracking-[0.1em] border ${
                data.complexity === 'Высокая' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                data.complexity === 'Средняя' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                'bg-green-50 text-green-600 border-green-100'
            }`}>
                {data.complexity}
            </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
        {data.title}
      </h3>

      <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
        {data.description}
      </p>

      <div className="mt-auto space-y-4">
        {/* Result Area */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
                <Zap className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">Результат</span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {data.impact}
            </p>
        </div>
        
        {/* Tools Area */}
        <div className="flex items-center gap-2 px-1">
            <PenTool className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                {data.tools}
            </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {data.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {data.tags.length > 2 && (
             <span className="text-[10px] font-bold text-slate-300 py-1">+ еще {data.tags.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;