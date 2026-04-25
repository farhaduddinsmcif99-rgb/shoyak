import React from 'react';
import { useApp } from '../AppContext';
import AIChat from '../components/AIChat';
import SEO from '../components/SEO';
import { Sparkles, Bot, Info } from 'lucide-react';

export default function AIAssistant() {
  const { lang } = useApp();

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Shayok AI Chat – Your Personal AI Assistant" 
        description="Interact with Shayok AI, your smart Bangla-English companion for farming tips, business ideas, education, and daily productivity."
        keywords="AI chat Bangladesh, Shayok AI, Bangla AI assistant, chat GPT Bangladesh, smart assistant"
        type="WebApplication"
      />
      <section className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center text-white shadow-xl shadow-brand/20 rotate-3">
          <Bot className="w-12 h-12" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
             {lang === 'bn' ? 'সায়োক এআই চ্যাট' : 'Shayok AI Chat'}
          </h2>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            {lang === 'bn' ? 'আপনার ব্যক্তিগত এআই সহকারী' : 'Your Personal AI Assistant'}
          </p>
        </div>
        
        <div className="flex gap-2 max-w-sm flex-wrap justify-center">
          {['চাষাবাদ টিপস', 'ব্যবসার আইডিয়া', 'শিক্ষামূলক প্রশ্ন', 'Daily Help'].map((chip, idx) => (
             <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 rounded-full lowercase">
               #{chip}
             </span>
          ))}
        </div>
      </section>

      <AIChat />

      <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl flex gap-3 text-blue-700 dark:text-blue-300">
         <div className="p-2 bg-blue-100 dark:bg-blue-800/50 h-fit rounded-xl">
           <Info className="w-5 h-5" />
         </div>
         <div className="space-y-1">
            <h4 className="text-sm font-black uppercase tracking-widest">{lang === 'bn' ? 'কিভাবে ব্যবহার করবেন?' : 'How to use?'}</h4>
            <p className="text-xs leading-relaxed opacity-90">
              {lang === 'bn' 
                ? 'সরাসরি বাংলায় প্রশ্ন করুন। যেমন: "ধানের পোকা দমনে কী করা যায়?" বা "ছোট ব্যবসায় কীভাবে বাজেট করব?"'
                : 'Ask questions directly in English or Bangla. e.g. "How to manage rice pests?" or "Small business budgeting tips?"'}
            </p>
         </div>
      </section>
    </div>
  );
}
