import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sprout, BarChart3, CloudRain, Bug, Scissors, Calculator, Droplets, Info, ChevronRight, Sparkles } from 'lucide-react';
import KrishiAIModal from '../components/KrishiAIModal';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function KrishiAI() {
  const { t, lang } = useApp();
  const [modalType, setModalType] = useState<'crop' | 'disease' | 'calc' | null>(null);
  const [activeMarket, setActiveMarket] = useState('hazar');

  const stats = [
    { label: lang === 'bn' ? 'আজকের তাপমাত্রা' : "Today's Temp", val: '32°C', icon: CloudRain, color: 'text-blue-500' },
    { label: lang === 'bn' ? 'বাজার চাহিদা' : 'Market Demand', val: 'High', icon: BarChart3, color: 'text-orange-500' },
    { label: lang === 'bn' ? 'মাটির আর্দ্রতা' : 'Soil Moisture', val: '45%', icon: Droplets, color: 'text-cyan-500' },
  ];

  const tools = [
    { id: 'crop', title: t('crop_recommendation'), desc: lang === 'bn' ? 'সঠিক ফসল বেছে নিন' : 'Pick the right crop', icon: Sprout },
    { id: 'disease', title: t('disease_id'), desc: lang === 'bn' ? 'রোগ শনাক্ত করুন' : 'Identify diseases', icon: Bug },
    { id: 'calc', title: t('calculator'), desc: lang === 'bn' ? 'পেশাদার সারগণনা' : 'Expert fertilizer calc', icon: Calculator },
    { id: 'tips', title: t('farming_tips'), desc: lang === 'bn' ? 'মৌসুমী টিপস' : 'Seasonal farming tips', icon: Sparkles },
  ];

  const markets = [
    { id: 'hazar', name: t('filter_hazar') },
    { id: 'jatrabari', name: t('filter_jatrabari') },
    { id: 'all', name: t('filter_all') }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-8">
      <SEO 
        title="Krishi Pro AI | Smart Farming Bangladesh" 
        description="Diagnose crop diseases, predict market prices, and optimize your harvest with Krishi Pro AI. The smartest tool for Bangladeshi farmers."
        keywords="Krishi AI, Bangladesh Farmer, Crop Doctor, Vegetable Price BD, Agriculture AI"
      />
      {/* Agriculture Header */}
      <section className="bg-green-600 rounded-[40px] p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-full h-full opacity-20">
            <img 
               src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
            />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest leading-none border border-white/10">
            Agriculture Elite
          </div>
          <h2 className="text-3xl font-black leading-tight italic">
            {lang === 'bn' ? 'স্মার্ট কৃষিই সমৃদ্ধির চাবিকাঠি' : 'Smart Farming is the Key to Prosperity'}
          </h2>
          <p className="text-green-100 text-sm font-medium">আপনার ফসলের সুরক্ষায় সায়োক এআই সবসময় প্রস্তুত।</p>
        </div>
      </section>

      {/* Stats Board */}
      <section className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl shadow-sm text-center">
            <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800 w-fit mx-auto mb-2 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100">{s.val}</div>
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Main Tools Container */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">{lang === 'bn' ? 'কৃষি টুলস' : 'Agriculture Tools'}</h3>
        <div className="grid grid-cols-1 gap-4">
          {tools.map((tool, idx) => (
            <motion.button
              key={tool.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalType(tool.id as any)}
              className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[32px] hover:border-brand transition-all text-left group shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-950/30 rounded-2xl flex items-center justify-center text-green-600 transition-colors group-hover:bg-brand group-hover:text-white">
                  <tool.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 uppercase tracking-tight">{tool.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{tool.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-brand transition-all" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Market Trends Card */}
      <section className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
           <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand" />
                {lang === 'bn' ? 'বাজার প্রবণতা' : 'Market Trends'}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Real-time Data Analysis</p>
           </div>
           
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {markets.map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveMarket(m.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-tight transition-all uppercase ${activeMarket === m.id ? 'bg-white dark:bg-slate-700 text-brand shadow-sm' : 'text-slate-400'}`}
                >
                  {m.name}
                </button>
              ))}
           </div>
        </div>
        <div className="h-40 flex items-end gap-3 px-2">
           {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
             <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="bg-brand/20 group-hover:bg-brand transition-colors w-full rounded-lg absolute bottom-0"
                ></motion.div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-400">Day {i+1}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Modals */}
      <KrishiAIModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType as any} 
      />
    </div>
  );
}
