import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Search, ShieldCheck, Sprout, Siren, MessageSquare, TrendingUp, ChevronRight, ArrowRight, Play, Info, Sparkles, MapPin, ShoppingBag, Activity, DollarSign, Fingerprint, AlertCircle, Mic, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import ScamCheckModal from '../components/ScamCheckModal';
import KrishiAIModal from '../components/KrishiAIModal';
import SEO from '../components/SEO';
import BottomSheet from '../components/BottomSheet';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t, lang, user } = useApp();
  const [showScam, setShowScam] = useState(false);
  const [showKrishi, setShowKrishi] = useState(false);
  const [showJobSheet, setShowJobSheet] = useState(false);
  const [showHealthSheet, setShowHealthSheet] = useState(false);
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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <SEO 
        title="স্মার্ট ড্যাশবোর্ড" 
        description="Shayok.AI ড্যাশবোর্ড থেকে আপনার প্রয়োজনীয় সব এআই টুলস এবং কৃষি সেবাগুলো এক জায়গায় অ্যাক্সেস করুন। কৃষকের ডিজিটাল সাথী।"
        keywords="ড্যাশবোর্ড, শায়ক ড্যাশবোর্ড, এআই টুলস বাংলাদেশ, স্মার্ট কার্ড, কৃষি সমাধান"
      />
      {/* Editorial Header */}
      <section className="space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand ring-4 ring-brand/10 shadow-xl"
              >
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Rahim'}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{greeting}</p>
                <h2 className="text-xl font-display leading-[0.9]">👋 Hello, {user?.name || 'Rahim'}</h2>
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-display leading-[0.85] max-w-3xl tracking-tighter">
              {lang === 'bn' ? 'আজ আপনার জন্য কী করতে পারি?' : 'How can I assist your vision today?'}
            </h1>
          </div>
          
          {/* Smart Status Bar */}
          <div className="flex flex-wrap gap-3">
             <div 
               onClick={() => setShowJobSheet(true)}
               className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl flex items-center gap-3 shadow-sm cursor-pointer hover:border-brand active:scale-95 transition-all"
             >
                <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                   <Activity className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Job Pulse</p>
                   <p className="text-xs font-bold">14 New Near You</p>
                </div>
             </div>
             <div className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                   <AlertCircle className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Alerts</p>
                   <p className="text-xs font-bold">3 Urgent Checks</p>
                </div>
             </div>
          </div>
        </div>

        {/* Smart Search with Voice */}
        <div className="max-w-4xl relative group">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="w-full h-20 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[32px] pl-16 pr-24 text-lg focus:ring-8 focus:ring-brand/5 focus:border-brand font-medium transition-all shadow-xl shadow-slate-200/20 dark:shadow-none"
          />
          <Search className="h-6 w-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <button className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-brand transition-all tap-effect">
                <Mic className="w-5 h-5" />
             </button>
             <button className="px-6 py-3 bg-brand text-white rounded-2xl font-black text-[10px] uppercase tracking-widest tap-effect shadow-lg shadow-brand/20">
                GO
             </button>
          </div>
        </div>
      </section>

      {/* Quick Category Access */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
         {[
           { label: 'Marketplace', icon: ShoppingBag, color: 'text-brand', bg: 'bg-brand/5' },
           { label: 'Krishi Pro', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
           { label: 'Job Tracker', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/5' },
           { label: 'Security', icon: ShieldCheck, color: 'text-slate-900', bg: 'bg-slate-900/5' },
           { label: 'Finances', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/5' },
           { label: 'Vision 2050', icon: Fingerprint, color: 'text-indigo-500', bg: 'bg-indigo-500/5' }
         ].map((cat, i) => (
           <button key={i} className={`flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap border border-slate-100 dark:border-slate-800 ${cat.bg} hover:border-brand transition-all tap-effect group`}>
              <cat.icon className={`w-4 h-4 ${cat.color} group-hover:scale-110 transition-transform`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">{cat.label}</span>
           </button>
         ))}
      </div>

      {/* Main Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
        {/* Featured: Krishi Pro AI */}
        <div className="md:col-span-8 group relative overflow-hidden bento-card border-none bg-gradient-to-br from-brand/90 to-brand flex flex-col justify-end p-10 text-white shadow-2xl shadow-brand/20">
           <Sprout className="absolute -top-12 -right-12 w-64 h-64 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
           <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">Featured Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-display text-white">Krishi Pro AI</h2>
              <p className="text-lg font-medium text-white/80 max-w-md leading-relaxed">
                {lang === 'bn' ? 'মাটির ধরন ও আবহাওয়া অনুযায়ী ফসলের সঠিক পরামর্শ নিন মুহূর্তেই।' : 'Precision farming intelligence for a sustainable future.'}
              </p>
              <button 
                onClick={() => setShowKrishi(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand rounded-2xl font-black text-sm transition-all hover:px-10 active:scale-95"
              >
                {lang === 'bn' ? 'শুরু করুন' : 'Start Intelligence'} <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Dynamic Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
           {/* Life Companion 2050 */}
           <Link to="/companion" className="flex-1 bento-card p-8 bg-indigo-600 text-white flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10 flex justify-between items-start">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Vision 2050</p>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Life Companion</h3>
                 </div>
                 <Fingerprint className="w-6 h-6 text-indigo-300" />
              </div>
              <div className="relative z-10 space-y-2">
                 <p className="text-xs font-bold leading-relaxed text-indigo-100 italic">"Predicting your market trends & goal success in real-time."</p>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white mt-4">
                    ENTER OS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all" />
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 blur-[80px] group-hover:blur-[100px] transition-all"></div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-all">
                 <Activity className="w-16 h-16" />
              </div>
           </Link>

           {/* Emergency Connect */}
           <div 
             onClick={() => setShowScam(true)}
             className="h-48 bento-card p-8 grad-dark text-white flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                 <ShieldCheck className="w-8 h-8 text-brand group-hover:scale-110 transition-transform" />
                 <Siren className="w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                 <h3 className="text-xl font-bold">{t('scam_check')}</h3>
                 <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Verify links, SMS & calls</p>
              </div>
           </div>
        </div>
      </section>

      {/* Quick Services Carousel-style Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Essential Services</h3>
           <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-6"></div>
           <Link to="/hub" className="text-[10px] font-black text-brand uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
              See Hub <ChevronRight className="w-3 h-3" />
           </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { title: t('marketplace'), icon: ShoppingBag, color: 'text-brand', to: '/hub', desc: 'Direct access to local vendors' },
             { title: t('loan_checker'), icon: DollarSign, color: 'text-blue-500', to: '/hub', desc: 'Micro-finance eligibility' },
             { 
               title: t('healthcare'), 
               icon: Activity, 
               color: 'text-red-500', 
               to: '#', 
               desc: 'Book verified doctors',
               onClick: () => setShowHealthSheet(true) 
             },
             { title: t('disaster_sos'), icon: Siren, color: 'text-orange-500', to: '/hub', desc: 'Instant emergency alerts' }
           ].map((s, i) => (
             <div 
               key={i} 
               onClick={s.onClick}
               className="cursor-pointer"
             >
               <Link to={s.to} className="bento-card p-8 flex flex-col gap-6 text-left group h-full">
                  <div className={`w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-[20px] flex items-center justify-center ${s.color} transition-all group-hover:bg-brand group-hover:text-white group-hover:scale-110`}>
                     <s.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-lg font-bold group-hover:text-brand transition-colors">{s.title}</h4>
                     <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{s.desc}</p>
                  </div>
               </Link>
             </div>
           ))}
        </div>
      </section>

      {/* Dynamic Recommendation Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
         <section className="lg:col-span-4 bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="z-10 space-y-4">
               <div className="flex items-center gap-2 mb-8">
                  <MapPin className="w-5 h-5 text-brand" />
                  <span className="text-[10px] font-black text-brand uppercase tracking-[0.4em]">Local Intelligence</span>
               </div>
               <h3 className="text-3xl font-display italic">
                 {lang === 'bn' ? 'খুলা অঞ্চলের কৃষকদের জন্য চিংড়ি চাষ সেরা লাভজনক উপায়।' : 'For Khulna farmers, shrimp bio-floc is peaking this season.'}
               </h3>
               <p className="text-slate-400 text-sm italic opacity-60">"Based on current salinity levels in Khulna regional sub-blocks"</p>
            </div>
            <button className="z-10 mt-12 w-full py-4 bg-brand text-white rounded-2xl font-black text-xs tap-effect">VIEW LOCAL REPORT</button>
            <Sparkles className="absolute -bottom-10 -left-10 w-48 h-48 opacity-10 text-brand" />
         </section>

         <section className="lg:col-span-8 bento-card p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
               <div className="space-y-2">
                  <h3 className="text-3xl font-display italic">AI Toolbox</h3>
                  <p className="text-sm text-slate-500">Access 100+ creative and structural AI assistants built for your daily needs.</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Academic', count: '25+', color: 'text-brand' },
                    { label: 'Business', count: '30+', color: 'text-blue-500' }
                  ].map(stat => (
                    <div key={stat.label} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                       <p className={`text-2xl font-black ${stat.color}`}>{stat.count}</p>
                       <p className="text-[10px] text-slate-400 uppercase font-bold">{stat.label}</p>
                    </div>
                  ))}
               </div>
               <Link to="/tools" className="inline-flex items-center gap-2 text-brand font-black text-xs uppercase tracking-widest py-2 border-b-2 border-brand/20 hover:border-brand transition-all">
                  Browse Full Suite <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-2">
               {['SSC Helper', 'CV Builder', 'Email Gen', 'Notes Maker'].map((tool, i) => (
                 <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center p-4 text-center border border-slate-100 dark:border-slate-800 hover:scale-105 transition-all">
                    <p className="text-[10px] font-black uppercase text-slate-500">{tool}</p>
                 </div>
               ))}
            </div>
         </section>
      </div>

      {/* Modals & Sheets */}
      <ScamCheckModal isOpen={showScam} onClose={() => setShowScam(false)} />
      <KrishiAIModal isOpen={showKrishi} onClose={() => setShowKrishi(false)} />
      
      <BottomSheet isOpen={showJobSheet} onClose={() => setShowJobSheet(false)} title="Jobs Near You">
         <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group hover:border-brand transition-all cursor-pointer">
               <div className="space-y-1">
                  <h4 className="font-bold">Delivery Partner</h4>
                  <p className="text-xs text-slate-500">Dhaka • ৳২২,০০০ - ৳২৮,০০০</p>
               </div>
               <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
               </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group hover:border-brand transition-all cursor-pointer">
               <div className="space-y-1">
                  <h4 className="font-bold">Farm Technician</h4>
                  <p className="text-xs text-slate-500">Gazipur • ৳১৮,০০০ - ৳২৫,০০০</p>
               </div>
               <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
               </div>
            </div>
            <button className="w-full py-4 bg-brand text-white rounded-2xl font-black text-xs tap-effect">VIEW ALL 14 JOBS</button>
         </div>
      </BottomSheet>

      <BottomSheet isOpen={showHealthSheet} onClose={() => setShowHealthSheet(false)} title="Healthcare Services">
         <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl space-y-3 cursor-pointer hover:scale-105 transition-all">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                     <Activity className="w-5 h-5" />
                  </div>
                  <p className="font-black text-xs uppercase tracking-widest text-blue-600">Video Consult</p>
               </div>
               <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-3xl space-y-3 cursor-pointer hover:scale-105 transition-all">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center">
                     <Siren className="w-5 h-5" />
                  </div>
                  <p className="font-black text-xs uppercase tracking-widest text-red-600">Emergency SOS</p>
               </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm">🩺</div>
                  <div>
                     <h4 className="font-bold text-sm">Dr. Anisur Rahman</h4>
                     <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Available in 15 mins</p>
                  </div>
               </div>
               <button className="w-full py-3 bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest tap-effect">BOOK APPOINTMENT</button>
            </div>
         </div>
      </BottomSheet>
    </div>
  );
}

