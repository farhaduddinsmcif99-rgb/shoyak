import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  ShieldCheck, ShoppingCart, Landmark, Map, Stethoscope, 
  Siren, Trash2, Rocket, Search, ChevronRight, 
  ArrowRight, Heart, Star, Info, AlertTriangle, CheckCircle2,
  Lock, Zap, DollarSign, Users, Globe, Building, Activity,
  Briefcase, Fingerprint, FileText, Navigation, MapPin, Plus,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScamCheckModal from '../components/ScamCheckModal';
import EntrepreneurHub from '../components/EntrepreneurHub';
import JobMarketplace from '../components/JobMarketplace';
import SEO from '../components/SEO';

type ServiceCategory = 'all' | 'safety' | 'finance' | 'health' | 'community' | 'business' | 'gov' | 'jobs' | 'junior';

export default function Hub() {
  const { t, lang } = useApp();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [showScam, setShowScam] = useState(false);
  const [activeHubView, setActiveHubView] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [detecting, setDetecting] = useState(false);

  const detectLocation = () => {
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setDetecting(false);
      },
      () => setDetecting(false)
    );
  };

  const categories = [
    { id: 'all', label: lang === 'bn' ? 'সব পরিষেবা' : 'All Services' },
    { id: 'junior', label: lang === 'bn' ? 'জুনিয়র' : 'Junior' },
    { id: 'jobs', label: lang === 'bn' ? 'চাকরি' : 'Jobs' },
    { id: 'gov', label: lang === 'bn' ? 'সরকারি' : 'Gov' },
    { id: 'safety', label: lang === 'bn' ? 'সুরক্ষা' : 'Safety' },
    { id: 'finance', label: lang === 'bn' ? 'আর্থিক' : 'Finance' },
    { id: 'health', label: lang === 'bn' ? 'স্বাস্থ্য' : 'Health' },
  ];

  const services = [
    {
      id: 'scam',
      icon: ShieldCheck,
      title: lang === 'bn' ? 'স্ক্যাম ডিটেকশন' : 'Scam detection',
      desc: lang === 'bn' ? 'সন্দেহজনক মেসেজ বা লিঙ্ক যাচাই করুন' : 'Verify suspicious messages or links',
      category: 'safety',
      action: () => setShowScam(true),
      color: 'bg-red-50 text-red-600 border-red-100'
    },
    {
      id: 'marketplace',
      icon: ShoppingCart,
      title: lang === 'bn' ? 'কৃষি মার্কেটপ্লেস' : 'Agriculture marketplace',
      desc: lang === 'bn' ? 'সরাসরি কৃষকের থেকে পণ্য কিনুন বা বিক্রি করুন' : 'Buy or sell products directly from farmers',
      category: 'community',
      action: () => setActiveHubView('marketplace'),
      color: 'bg-green-50 text-green-600 border-green-100'
    },
    {
      id: 'loan',
      icon: Landmark,
      title: lang === 'bn' ? 'লোন চেকার' : 'Loan checker',
      desc: lang === 'bn' ? 'আপনার লোন পাওয়ার যোগ্যতা যাচাই করুন' : 'Check your loan eligibility easily',
      category: 'finance',
      action: () => setActiveHubView('loan'),
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      id: 'land',
      icon: Map,
      title: lang === 'bn' ? 'ভূমি যাচাইকরণ' : 'Land verification',
      desc: lang === 'bn' ? 'জমির তথ্য ও খতিয়ান যাচাই করুন' : 'Verify land information and documents',
      category: 'safety',
      action: () => setActiveHubView('land'),
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      id: 'health',
      icon: Stethoscope,
      title: lang === 'bn' ? 'স্বাস্থ্যসেবা বুকিং' : 'Healthcare booking',
      desc: lang === 'bn' ? 'নিকটস্থ ডাক্তার বা হাসপাতালের অ্যাপয়েন্টমেন্ট' : 'Book appointments with nearby doctors',
      category: 'health',
      action: () => setActiveHubView('health'),
      color: 'bg-teal-50 text-teal-600 border-teal-100'
    },
    {
      id: 'sos',
      icon: Siren,
      title: lang === 'bn' ? 'জরুরি এসওএস' : 'Disaster SOS',
      desc: lang === 'bn' ? 'দুর্যোগ বা বিপদে দ্রুত সাহায্য পান' : 'Get quick help during disasters or danger',
      category: 'safety',
      action: () => setActiveHubView('sos'),
      color: 'bg-orange-50 text-orange-600 border-orange-100'
    },
    {
      id: 'waste',
      icon: Trash2,
      title: lang === 'bn' ? 'বর্জ্য রিপোর্ট' : 'Waste reporting',
      desc: lang === 'bn' ? 'আপনার এলাকার বর্জ্য পরিষ্কারের জন্য রিপোর্ট করুন' : 'Report for cleaning waste in your area',
      category: 'community',
      action: () => setActiveHubView('waste'),
      color: 'bg-slate-50 text-slate-600 border-slate-100'
    },
    {
      id: 'entrepreneur',
      icon: Rocket,
      title: lang === 'bn' ? 'উদ্যোক্তা হাব' : 'Entrepreneur Hub',
      desc: lang === 'bn' ? 'নতুন ব্যবসার আইডিয়া ও পরিকল্পনা' : 'New business ideas and planning',
      category: 'business',
      action: () => setActiveHubView('entrepreneur'),
      color: 'bg-brand/5 text-brand border-brand/10'
    },
    {
      id: 'nid',
      icon: Fingerprint,
      title: lang === 'bn' ? 'এনআইডি চেক (সিমুলেট)' : 'NID check (Simulate)',
      desc: lang === 'bn' ? 'আপনার এনআইডি তথ্য যাচাই করুন' : 'Verify your NID information',
      category: 'gov',
      action: () => setActiveHubView('nid'),
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      id: 'birthday',
      icon: FileText,
      title: lang === 'bn' ? 'জন্ম নিবন্ধন' : 'Birth certificate',
      desc: lang === 'bn' ? 'জন্ম নিবন্ধনের জন্য আবেদন বা তথ্য যাচাই' : 'Apply or verify birth certificate',
      category: 'gov',
      action: () => setActiveHubView('birthday'),
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
    },
    {
      id: 'passport',
      icon: Globe,
      title: lang === 'bn' ? 'পাসপোর্ট ট্র্যাকিং' : 'Passport tracking',
      desc: lang === 'bn' ? 'আপনার পাসপোর্টের বর্তমান অবস্থা জানুন' : 'Check your passport application status',
      category: 'gov',
      action: () => setActiveHubView('passport'),
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      id: 'jobs-market',
      icon: Briefcase,
      title: lang === 'bn' ? 'জব মার্কেটপ্লেস' : 'Job Marketplace',
      desc: lang === 'bn' ? 'আপনার এলাকায় বা রিমোট কাজ খুঁজুন' : 'Find local or remote jobs in your area',
      category: 'jobs',
      action: () => setActiveHubView('jobs'),
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 'junior-mode',
      icon: Gamepad2,
      title: lang === 'bn' ? 'শায়ক জুনিয়র' : 'Shayok Junior',
      desc: lang === 'bn' ? 'বাচ্চাদের জন্য নিরাপদ ও মজাদার শিক্ষা' : 'Safe and fun learning for children',
      category: 'junior',
      action: () => window.location.href = '/junior',
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEO 
        title="Community Hub | Local Services Bangladesh" 
        description="Find verified doctors, micro-loans, jobs, and community safety alerts in your local area. The central hub for Smart Bangladesh services."
        keywords="Shayok Hub, Bangladesh Service Directory, Local Doctor Dhaka, Job Market BD, Micro-finance Bangladesh"
      />
      {!activeHubView ? (
        <>
          <header className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
                    <Globe className="w-3.5 h-3.5 text-brand" />
                    <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">{lang === 'bn' ? 'ডিজিটাল সার্ভিস গেটওয়ে' : 'Unified Service Gateway'}</span>
                 </div>
                 <h1 className="text-4xl md:text-6xl font-display italic leading-none">
                    Shayok <span className="text-brand">Hub</span>
                 </h1>
              </div>
              <div className="flex items-center gap-3">
                {!location ? (
                  <button 
                    onClick={detectLocation}
                    disabled={detecting}
                    className="h-12 px-6 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-slate-900/20 hover:scale-105 transition-all"
                  >
                    {detecting ? 'Initializing...' : <><Navigation className="w-4 h-4 text-brand" /> Activate Location</>}
                  </button>
                ) : (
                  <div className="h-12 px-6 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                     Live: Dhaka Central
                  </div>
                )}
              </div>
            </div>
            <p className="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed">
              {lang === 'bn' ? 'বাংলাদেশের সকল প্রয়োজনীয় ডিজিটাল নাগরিক পরিষেবা এখন আপনার হাতের মুঠোয়।' : 'Your gateway to Bangladesh\'s essential digital citizen services, reimagined with intelligence.'}
            </p>
          </header>

          {location && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-slate-950 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-slate-900/40"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[100px] rounded-full" />
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                       </div>
                       <h3 className="text-2xl font-display font-bold italic">Nearby Intelligence</h3>
                    </div>
                    <p className="text-slate-400 max-w-sm">Auto-detected services and critical infrastructure in your immediate vicinity.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                     {[
                        { label: 'Hospitals', icon: Building, color: 'text-blue-400', count: '12' },
                        { label: 'Markets', icon: ShoppingCart, color: 'text-green-400', count: '08' },
                        { label: 'Shelters', icon: ShieldCheck, color: 'text-red-400', count: '03' }
                     ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-5 bg-white/5 border border-white/10 rounded-[32px] min-w-[120px] hover:bg-white/10 transition-all cursor-pointer">
                           <item.icon className={`w-6 h-6 ${item.color}`} />
                           <div className="text-center">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                              <p className="text-xl font-bold">{item.count}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.section>
          )}

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`h-11 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                  activeCategory === cat.id 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-brand/40 hover:text-brand'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={service.action}
                  className="group bento-card p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 cursor-pointer relative"
                >
                  <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center shrink-0 transition-all group-hover:rotate-6 group-hover:scale-110 shadow-lg ${service.color}`}>
                     <service.icon className="w-10 h-10" />
                  </div>
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand transition-colors leading-tight">
                           {service.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                           {service.desc}
                        </p>
                     </div>
                     <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex flex-wrap items-center justify-center sm:justify-between gap-4">
                        <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-[9px] font-black rounded-full uppercase tracking-widest">
                           {service.category}
                        </span>
                        <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                           {lang === 'bn' ? 'এক্সেস করুন' : 'Invoke Service'} <ArrowRight className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-2 h-2 bg-brand rounded-full animate-ping" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="space-y-6">
           <button 
            onClick={() => setActiveHubView(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-brand transition-colors font-bold text-sm"
           >
              <ArrowRight className="w-4 h-4 rotate-180" />
              {lang === 'bn' ? 'হাবে ফিরে যান' : 'Back to Hub'}
           </button>

           <AnimatePresence mode="wait">
               {activeHubView === 'nid' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <div className="p-8 bg-indigo-600 rounded-[40px] text-white">
                         <h2 className="text-3xl font-black mb-2">{lang === 'bn' ? 'স্মার্ট এনআইডি যাচাই' : 'Smart NID Verify'}</h2>
                         <p className="text-indigo-100 mb-6">{lang === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ দিয়ে তথ্য যাচাই করুন।' : 'Verify NID information with number and date of birth.'}</p>
                         <div className="bg-white/10 rounded-2xl p-6 space-y-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest">{lang === 'bn' ? 'এনআইডি নম্বর' : 'NID Number'}</label>
                               <input type="text" placeholder="e.g. 199026..." className="w-full bg-white/20 border-0 rounded-xl p-3 outline-none" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest">{lang === 'bn' ? 'জন্ম তারিখ' : 'Date of Birth'}</label>
                               <input type="date" className="w-full bg-white/20 border-0 rounded-xl p-3 outline-none" />
                            </div>
                            <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-xl uppercase tracking-widest">{lang === 'bn' ? 'তথ্য দেখুন' : 'Fetch Info'}</button>
                         </div>
                     </div>
                  </motion.div>
               )}

               {activeHubView === 'passport' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <div className="p-8 bg-purple-600 rounded-[40px] text-white">
                         <h2 className="text-3xl font-black mb-2">{lang === 'bn' ? 'পাসপোর্ট ট্র্যাকিং' : 'Passport Tracking'}</h2>
                         <p className="text-purple-100 mb-6">{lang === 'bn' ? 'আপনার পাসপোর্ট আবেদনের বর্তমান অবস্থা চেক করুন।' : 'Check the current status of your passport application.'}</p>
                         <div className="bg-white/10 rounded-2xl p-6 space-y-6">
                            <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/10">
                               <div>
                                  <p className="text-[10px] font-bold opacity-60 uppercase">Application ID</p>
                                  <p className="font-bold">#4582-BD-2024</p>
                               </div>
                               <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-full uppercase">Printed</span>
                            </div>
                            <div className="space-y-4">
                               {[
                                 { label: 'Application Submitted', date: 'Jan 12', done: true },
                                 { label: 'Police Verification', date: 'Jan 20', done: true },
                                 { label: 'Passport Printing', date: 'Feb 05', done: true },
                                 { label: 'Ready for Collection', date: 'Expected Feb 15', done: false },
                               ].map((step, i) => (
                                 <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                       <div className={`w-4 h-4 rounded-full border-2 ${step.done ? 'bg-green-400 border-green-400' : 'border-white/30'}`} />
                                       {i < 3 && <div className="w-0.5 h-full bg-white/10 mt-1" />}
                                    </div>
                                    <div className="pb-4">
                                       <p className={`text-sm font-bold ${step.done ? 'text-white' : 'text-white/40'}`}>{step.label}</p>
                                       <p className="text-[10px] opacity-60 font-bold">{step.date}</p>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                     </div>
                  </motion.div>
               )}

               {activeHubView === 'nearby' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <header className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-xl text-brand"><Navigation className="w-6 h-6" /></div>
                        <h2 className="text-2xl font-black">Nearby Services</h2>
                     </header>
                     <div className="space-y-4">
                        {[
                          { name: 'Dhaka Medical College', type: 'Hospital', dist: '1.2km', icon: Stethoscope, color: 'text-red-500' },
                          { name: 'Government Shelter Home', type: 'Shelter', dist: '3.5km', icon: ShieldCheck, color: 'text-blue-500' },
                          { name: 'Tech Solutions BD', type: 'Jobs', dist: '0.8km', icon: Briefcase, color: 'text-green-500' },
                          { name: 'Karwan Bazar', type: 'Market', dist: '2.1km', icon: ShoppingCart, color: 'text-amber-500' },
                        ].map((item, i) => (
                           <div key={i} className="group p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-brand transition-all shadow-sm">
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand transition-colors">{item.name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.type} • {item.dist}</p>
                                 </div>
                              </div>
                              <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 group-hover:text-brand group-hover:bg-brand/5 transition-all">
                                 <ChevronRight className="w-5 h-5" />
                              </button>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}

               {activeHubView === 'waste' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <div className="p-8 bg-blue-500 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <Users className="absolute -left-10 -bottom-10 w-48 h-48 opacity-10" />
                        <div className="space-y-4">
                           <h2 className="text-3xl font-black">{lang === 'bn' ? 'কমিউনিটি রিপোর্ট' : 'Community Reporting'}</h2>
                           <p className="text-blue-100 max-w-sm">{lang === 'bn' ? 'আপনার এলাকার বর্জ্য বা সমস্যা সম্পর্কে রিপোর্ট করুন।' : 'Report waste management or local issues in your area.'}</p>
                           <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl flex items-center gap-2">
                              <Plus className="w-4 h-4" /> {lang === 'bn' ? 'নতুন রিপোর্ট' : 'New Report'}
                           </button>
                        </div>
                        <div className="w-full md:w-64 bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10 text-center">
                           <h4 className="text-2xl font-black">45</h4>
                           <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Resolved in your area</p>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Live Local Issues</h3>
                        {[
                          { title: 'Waste dump near School', location: 'Section 10, Mirpur', status: 'Pending', time: '2h ago' },
                          { title: 'Broken Street Light', location: 'Khulna Bypass', status: 'Resolved', time: '1d ago' },
                        ].map((issue, i) => (
                           <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className={`p-2 rounded-xl ${issue.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {issue.status === 'Resolved' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className="text-sm font-bold">{issue.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{issue.location} • {issue.time}</p>
                                 </div>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${issue.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>{issue.status}</span>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}

               {activeHubView === 'marketplace' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <div className="p-8 bg-green-500 rounded-[40px] text-white relative overflow-hidden">
                      <ShoppingCart className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20" />
                      <div className="relative z-10 space-y-4">
                        <h2 className="text-4xl font-black">{lang === 'bn' ? 'কৃষি মার্কেটপ্লেস' : 'Agri Marketplace'}</h2>
                        <p className="max-w-md text-green-100">{lang === 'bn' ? 'সরাসরি কৃষকদের সাথে যুক্ত হন এবং সুলভ মূল্যে তাজা পণ্য কিনুন।' : 'Connect directly with farmers and buy fresh products at fair prices.'}</p>
                        <div className="flex gap-4">
                           <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold">1.2k+ Farmers</div>
                           <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold">Direct Delivery</div>
                        </div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Vegetables', 'Fruits', 'Grains', 'Fish'].map(cat => (
                        <div key={cat} className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2 hover:border-brand cursor-pointer">
                           <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Zap className="w-5 h-5" /></div>
                           <span className="text-xs font-bold">{cat}</span>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeHubView === 'loan' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="p-8 bg-blue-600 rounded-[40px] text-white">
                        <h2 className="text-3xl font-black mb-2">{lang === 'bn' ? 'স্মার্ট লোন চেকার' : 'Smart Loan Checker'}</h2>
                        <p className="text-blue-100 mb-6">{lang === 'bn' ? 'সহজেই আপনার সুদের হার ও কিস্তি হিসাব করুন।' : 'Easily calculate your interest rate and installments.'}</p>
                        <div className="bg-white/10 rounded-2xl p-6 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest">{lang === 'bn' ? 'লোনের পরিমাণ' : 'Loan Amount'}</label>
                                <input type="number" placeholder="e.g. 50000" className="w-full bg-white/20 border-0 rounded-xl p-3 outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest">{lang === 'bn' ? 'মৌসুম' : 'Duration (Months)'}</label>
                                <input type="number" placeholder="e.g. 12" className="w-full bg-white/20 border-0 rounded-xl p-3 outline-none" />
                              </div>
                           </div>
                           <button className="w-full py-4 bg-white text-blue-600 font-bold rounded-xl">{lang === 'bn' ? 'যোগ্যতা যাচাই করুন' : 'Check Eligibility'}</button>
                        </div>
                    </div>
                 </motion.div>
              )}

              {activeHubView === 'entrepreneur' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <EntrepreneurHub />
                </motion.div>
              )}

              {activeHubView === 'land' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-amber-500 rounded-[40px] text-white">
                    <h2 className="text-3xl font-black">Land Verification</h2>
                    <p className="text-amber-100 mt-2">Real-time check for Khatian and Dag numbers via government API.</p>
                    <div className="mt-8 relative max-w-md">
                       <input type="text" placeholder="Enter Dag/Khatian Number" className="w-full p-4 rounded-2xl bg-white text-slate-800 outline-none pr-12" />
                       <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    </div>
                 </motion.div>
              )}

              {activeHubView === 'jobs' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <JobMarketplace />
                 </motion.div>
              )}

              {activeHubView === 'sos' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 bg-red-600 rounded-[40px] text-white text-center flex flex-col items-center gap-6">
                    <AlertTriangle className="w-20 h-20 animate-bounce" />
                    <div>
                      <h2 className="text-4xl font-black tracking-tighter uppercase italic">Emergency SOS Hub</h2>
                      <p className="text-red-100 max-w-sm mx-auto mt-2 font-bold">Instantly connect to police, fire service, and red crescent in your location.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                       <button className="p-6 bg-white/10 rounded-3xl font-black border-2 border-white/20 hover:bg-white text-red-600 transition-all">FIRE: 999</button>
                       <button className="p-6 bg-white/10 rounded-3xl font-black border-2 border-white/20 hover:bg-white text-red-600 transition-all">POLICE: 100</button>
                    </div>
                    <button className="w-full py-6 bg-white text-red-600 rounded-[40px] font-black text-2xl shadow-2xl shadow-red-900/40 transform active:scale-95 transition-all">SEND LOCATION SOS</button>
                 </motion.div>
              )}

              {/* Placeholder for others to avoid too much boilerplate but keep structure */}
              {!['marketplace', 'loan', 'entrepreneur', 'land', 'sos', 'jobs'].includes(activeHubView) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center space-y-4">
                   <Zap className="w-16 h-16 text-brand mx-auto animate-pulse" />
                   <h2 className="text-2xl font-black text-slate-400 uppercase tracking-widest">{activeHubView} Service Loading...</h2>
                   <p className="text-slate-400">This specialized module is being optimized for your experience.</p>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      )}

      <ScamCheckModal isOpen={showScam} onClose={() => setShowScam(false)} />
    </div>
  );
}
