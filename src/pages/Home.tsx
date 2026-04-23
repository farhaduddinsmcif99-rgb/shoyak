import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Search, ShieldCheck, Sprout, Siren, MessageSquare, TrendingUp, ChevronRight, Play, Info, Sparkles, MapPin, ShoppingBag, Activity, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import ScamCheckModal from '../components/ScamCheckModal';
import KrishiAIModal from '../components/KrishiAIModal';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t, lang, user } = useApp();
  const [showScam, setShowScam] = useState(false);
  const [showKrishi, setShowKrishi] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('greet_morning'));
    else if (hour < 17) setGreeting(t('greet_afternoon'));
    else if (hour < 21) setGreeting(t('greet_evening'));
    else setGreeting(t('greet_night'));
  }, [t]);

  const cropPrices = [
    { name: lang === 'bn' ? 'চাল (নাজিরশাইল)' : 'Rice (Nazirshail)', price: 75, trend: 'up' },
    { name: lang === 'bn' ? 'আলু' : 'Potato', price: 45, trend: 'down' },
    { name: lang === 'bn' ? 'পেঁয়াজ' : 'Onion', price: 110, trend: 'up' },
    { name: lang === 'bn' ? 'সরিষা' : 'Mustard', price: 95, trend: 'neutral' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Greeting & Search */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
              {greeting}, {user.name}!
            </span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {lang === 'bn' ? 'আজ আপনার জন্য কী করতে পারি?' : 'What can I do for you today?'}
            </span>
          </div>
          <div className="relative w-full md:w-1/2 group">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand font-medium transition-all"
            />
            <Search className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
          </div>
        </div>

        {/* Live Market Ticker */}
        <div className="md:col-span-4 bg-brand rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg shadow-green-100 dark:shadow-none">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase opacity-80">{t('live_prices')}</span>
            <span className="bg-white text-brand text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">LIVE</span>
          </div>
          <div className="flex justify-between items-end gap-2">
            {cropPrices.slice(0, 3).map((crop, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] opacity-80 truncate max-w-[60px] mx-auto">{crop.name}</p>
                <p className="text-xl font-bold">৳{crop.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Action Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bento-card p-6 flex flex-col min-h-[280px]">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 rounded-xl flex items-center justify-center text-red-500 mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('scam_check')}</h3>
          <p className="text-sm text-slate-500 mt-2 flex-grow">
            {lang === 'bn' ? 'সন্দেহজনক মেসেজ, লিংক বা কল কি আসল না জাল? আমাদের এআই দিয়ে যাচাই করুন।' : 'Identify if messages or calls are real or fake using our AI.'}
          </p>
          <button 
            onClick={() => setShowScam(true)}
            className="w-full py-3 bg-brand text-white rounded-xl font-bold text-sm shadow-md hover:bg-brand-dark transition-all"
          >
            {lang === 'bn' ? 'যাচাই করুন' : 'Check Now'}
          </button>
        </div>

        <div className="bento-card p-6 flex flex-col min-h-[280px]">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-950/20 rounded-xl flex items-center justify-center text-brand mb-6">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('krishi_ai')}</h3>
          <p className="text-sm text-slate-500 mt-2 flex-grow">
            {lang === 'bn' ? 'মাটির ধরন ও আবহাওয়া অনুযায়ী ফসলের সঠিক পরামর্শ নিন মুহূর্তেই।' : 'Get instant crop suggestions based on soil and weather.'}
          </p>
          <button 
            onClick={() => setShowKrishi(true)}
            className="w-full py-3 bg-brand text-white rounded-xl font-bold text-sm shadow-md hover:bg-brand-dark transition-all"
          >
            {lang === 'bn' ? 'শুরু করুন' : 'Start Now'}
          </button>
        </div>

        <div className="bento-card p-6 flex flex-col min-h-[280px]">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 rounded-xl flex items-center justify-center text-blue-600 mb-6">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t('entrepreneur')}</h3>
          <p className="text-sm text-slate-500 mt-2 flex-grow">
            {lang === 'bn' ? 'আপনার বাজেট ও দক্ষতা অনুযায়ী ব্যবসার আইডিয়া ও গাইডলাইন তৈরি করুন।' : 'Generate business ideas and guidelines based on your budget.'}
          </p>
          <Link 
            to="/hub"
            onClick={() => {}}
            className="w-full py-3 bg-blue-600 text-white flex items-center justify-center rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all font-sans"
          >
            {t('generate_ideas')}
          </Link>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'ফিচারড সার্ভিস' : 'Featured Services'}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { title: t('marketplace'), icon: ShoppingBag, color: 'text-green-500', bg: 'bg-green-50', to: '/hub' },
             { title: t('loan_checker'), icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-50', to: '/hub' },
             { title: t('healthcare'), icon: Activity, color: 'text-red-500', bg: 'bg-red-50', to: '/hub' },
             { title: t('disaster_sos'), icon: Siren, color: 'text-orange-500', bg: 'bg-orange-50', to: '/hub' }
           ].map((s, i) => (
             <Link key={i} to={s.to} className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-brand transition-all flex flex-col items-center gap-3 text-center shadow-sm group">
                <div className={`w-12 h-12 ${s.bg} dark:bg-slate-800 rounded-2xl flex items-center justify-center ${s.color} transition-transform group-hover:scale-110`}>
                   <s.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{s.title}</span>
             </Link>
           ))}
        </div>
      </section>

      {/* AI Toolbox Showcase (Full Width) */}
      <section className="bento-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden relative group">
        <div className="z-10 w-full md:w-1/3">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{t('toolbox')} (১০০+)</h3>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'bn' ? 'ইউটিউব স্ক্রিপ্ট থেকে শুরু করে সিভি রাইটার—সব কিছু এক জায়গায়।' : 'From YouTube scripts to CV writers—everything in one place.'}
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-xl font-bold text-brand uppercase">৪৫</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Content</p>
            </div>
            <div className="w-[1px] h-10 bg-slate-200 dark:bg-slate-800"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-brand uppercase">৩০</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Business</p>
            </div>
            <div className="w-[1px] h-10 bg-slate-200 dark:bg-slate-800"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-brand uppercase">২৫</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Academic</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-2/3 md:ml-12 mt-8 md:mt-0">
          {['Resume Builder', 'SEO Researcher', 'YouTube Script', 'PDF Maker', 'Summarizer', 'Social Caption', 'Logo Prompt'].map((tool, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-center shadow-sm">
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{tool}</p>
            </div>
          ))}
          <Link to="/tools" className="p-4 bg-brand text-white rounded-xl border border-brand text-center font-bold shadow-md hover:bg-brand-dark transition-all">
            <p className="text-xs whitespace-nowrap">See All</p>
          </Link>
        </div>
      </section>

      {/* AI Suggestion Section */}
      <section className="bg-slate-900 dark:bg-brand/10 p-8 rounded-[40px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-1000">
          <Sparkles className="w-32 h-32 text-brand" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 rounded-full border border-brand/30">
             <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-brand uppercase tracking-widest">{t('ai_suggestions')}</span>
          </div>
          <h3 className="text-2xl font-bold text-white leading-tight">
            {lang === 'bn' ? 'বর্ষাকালে আপনার ছাদে আমড়া চাষ শুরু করতে পারেন।' : 'You can start roof gardening with Amra during monsoon.'}
          </h3>
          <p className="text-slate-400 text-sm italic">"এআই পরামর্শ অনুযায়ী আপনার ছাদ বাগান হতে পারে আয়ের উৎস"</p>
          <button className="flex items-center gap-2 text-brand font-bold text-sm bg-white px-4 py-2 rounded-xl group-hover:px-6 transition-all">
            {lang === 'bn' ? 'বিস্তারিত তথ্য' : 'Learn More'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Personalized Recommendations (Khulna Special) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
            {lang === 'bn' ? 'আপনার জন্য সুপারিশ (খুলনা এডিটরস চয়েস)' : 'Recommended for You (Khulna Edition)'}
          </h3>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full">
            <MapPin className="w-3 h-3" /> KHULNA, BD
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { title: lang === 'bn' ? 'চিংড়ি খামার ব্যবস্থাপনা' : 'Shrimp Farm Management', desc: lang === 'bn' ? 'খুলনার জলবায়ুর জন্য উপযুক্ত মৎস্য পরামর্শ' : 'Khulna climate tailored fishery advice', type: 'Farming', icon: 'Fish' },
             { title: lang === 'bn' ? 'সুন্দরবন ইকো-ট্যুর গাইড' : 'Sundarbans Eco-Tour Guide', desc: lang === 'bn' ? 'ট্যুরিজম ব্যবসায় আয়ের সম্ভাবনা' : 'Income opportunities in tourism business', type: 'Business', icon: 'Trees' }
           ].map((item, i) => (
             <div key={i} className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand transition-colors">{item.title}</h4>
                   <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                   <span className="inline-block mt-2 text-[10px] font-black text-brand uppercase tracking-widest">{item.type}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Modals */}
      <ScamCheckModal isOpen={showScam} onClose={() => setShowScam(false)} />
      <KrishiAIModal isOpen={showKrishi} onClose={() => setShowKrishi(false)} />
    </div>
  );
}

