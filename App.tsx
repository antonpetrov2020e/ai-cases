import React, { useState, useMemo } from 'react';
import { cases, categories } from './data/cases';
import { CaseStudy } from './types';
import CaseCard from './components/CaseCard';
import ChatInterface from './components/ChatInterface';
import CaseModal from './components/CaseModal';
import { LayoutGrid, Search, Database, Brain, Rocket } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Filter Logic
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchesCategory = selectedCategory === 'Все' || c.category === selectedCategory;
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-[1.1]">
                Реальные кейсы <span className="text-indigo-600 italic">внедрения ИИ</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Курируемый дашборд из проверенных примеров использования ИИ в бизнесе и личной эффективности. Стратегии, инструменты и результаты.
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto shrink-0">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <Database className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                    <span className="block text-2xl font-bold text-slate-800">{cases.length}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Кейсов</span>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <Brain className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <span className="block text-2xl font-bold text-slate-800">{categories.length}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Категорий</span>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <Rocket className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <span className="block text-2xl font-bold text-slate-800">10x</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ROI</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 space-y-6 flex-shrink-0">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Поиск по кейсам..." 
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Sidebar Stats / Info could go here if needed, but keeping it clean */}
            <div className="hidden lg:block p-6 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
               <h4 className="font-bold mb-2">Навигация</h4>
               <p className="text-sm text-indigo-100 leading-relaxed">Используйте категории сверху и поиск слева для фильтрации библиотеки знаний.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            
            {/* Categories */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('Все')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            selectedCategory === 'Все'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                        }`}
                    >
                        Все кейсы
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                selectedCategory === cat
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <LayoutGrid className="w-6 h-6 text-indigo-600" />
                    {selectedCategory === 'Все' ? 'Библиотека кейсов' : selectedCategory}
                </h2>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                   <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Найдено: {filteredCases.length}</span>
                </div>
            </div>

            {/* Cards Grid - Adjusted for high density and neatness */}
            {filteredCases.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6">
                {filteredCases.map((c) => (
                    <CaseCard key={c.id} data={c} onClick={() => setSelectedCase(c)} />
                ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Ничего не найдено</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">Попробуйте изменить поисковый запрос или выбрать другую тематическую категорию.</p>
                </div>
            )}
          </div>

        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <CaseModal 
          data={selectedCase} 
          onClose={() => setSelectedCase(null)} 
        />
      )}

      <ChatInterface />
    </div>
  );
};

export default App;