import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { aiTools, AITool } from '../data/tools';
import { Search, Filter, Sparkles, ChevronRight, Zap, FileText, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const ToolIcon = ({ icon }: { icon: string }) => {
  // Simple fallback icons for public view
  return <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand"><Zap className="w-5 h-5" /></div>;
};

export default function PublicTools() {
  const { lang, isAuthenticated } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'content' | 'seo' | 'business' | 'utility' | 'social'>('all');

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = (lang === 'bn' ? tool.name_bn : tool.name_en).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' ? true : tool.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700 pt-10">
      <SEO 
        title="Free Online Tools Directory | Shoyakai" 
        description="Browse our complete list of free online tools, from content generators to business utilities. Fast, simple, and no login required for browsing."
        keywords="free tool directory, online utility list, web app collection"
      />

      <header className="space-y-8 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
           <Zap className="w-3.5 h-3.5 text-brand" />
           <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">The Tool Registry</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display italic leading-none tracking-tighter">
          Explore Our <br /> <span className="text-brand">Digital Ecosystem.</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          Search through 100+ specialized tools designed for fast execution and high precision. No login required to browse our full catalog.
        </p>

        <div className="relative group">
           <input
             type="text"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search tools (e.g. YouTube, Marketing, Legal)..."
             className="w-full h-20 pl-16 pr-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm outline-none focus:ring-8 focus:ring-brand/5 focus:border-brand font-medium text-lg transition-all"
           />
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-brand transition-colors" />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'content', 'seo', 'business', 'utility', 'social'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`h-11 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                category === cat 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-2px]' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-brand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bento-card p-6 flex flex-col gap-6 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                 <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all transform group-hover:rotate-6">
                    <Zap className="w-7 h-7 text-brand group-hover:text-white" />
                 </div>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-brand transition-colors">
                  {lang === 'bn' ? tool.name_bn : tool.name_en}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {lang === 'bn' ? tool.description_bn : tool.description_en}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{tool.category}</span>
                 <Link to={`/tools/${tool.id}`} className="px-4 py-2 bg-brand/10 text-brand rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all">
                    Explore Tool
                 </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {!isAuthenticated && (
        <section className="bg-brand text-white rounded-[48px] p-16 text-center space-y-8 shadow-2xl shadow-brand/20">
           <h2 className="text-4xl md:text-6xl font-display italic leading-none">Ready to unleash full potential?</h2>
           <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">Create a free account to use all 100+ tools with advanced AI features, data saving, and personalized reports.</p>
           <Link to="/login" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 shadow-xl transition-all">
              Join Shoyakai Now <ArrowRight className="w-5 h-5" />
           </Link>
        </section>
      )}
    </div>
  );
}
