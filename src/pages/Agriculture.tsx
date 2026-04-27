import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Sprout, Cloud, TrendingUp, AlertCircle, Camera, 
  Upload, Search, Info, CheckCircle2, Wind, Droplets,
  Thermometer, ArrowUpRight, ArrowDownRight, Zap,
  Fuel, Beaker, ShoppingBag, ShieldAlert, Package, 
  MapPin, HelpCircle, User, Award, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SEO from '../components/SEO';
import { cn } from '../utils/helpers';
import KrishiAIModal from '../components/KrishiAIModal';

const priceData = [
  { month: 'Jan', rice: 52, potato: 24, onion: 45, market: 'Dhaka' },
  { month: 'Feb', rice: 54, potato: 22, onion: 48, market: 'Dhaka' },
  { month: 'Mar', rice: 53, potato: 20, onion: 60, market: 'Khulna' },
  { month: 'Apr', rice: 55, potato: 18, onion: 75, market: 'Rangpur' },
  { month: 'May', rice: 58, potato: 25, onion: 40, market: 'Bogura' },
  { month: 'Jun', rice: 60, potato: 28, onion: 35, market: 'Sylhet' },
];

const mockMandiPrices = [
  { crop: 'Potato (Alu)', price: 18, trend: 'down', mandi: 'Rangpur', status: 'Oversupply' },
  { crop: 'Rice (Boro)', price: 62, trend: 'up', mandi: 'Naogaon', status: 'High Demand' },
  { crop: 'Onion (Piyaj)', price: 45, trend: 'stable', mandi: 'Pabna', status: 'Normal' },
];

type AgriTool = 'dashboard' | 'fuel' | 'fertilizer' | 'market' | 'climate' | 'post-harvest' | 'community';

export default function Agriculture() {
  const { lang } = useApp();
  const [activeTool, setActiveTool] = useState<AgriTool>('dashboard');
  const [analyzing, setAnalyzing] = useState(false);
  const [diseaseResult, setDiseaseResult] = useState<any>(null);
  const [fuelConfig, setFuelConfig] = useState({ land: 1, pump: 'diesel' });
  const [aiModal, setAiModal] = useState<{ open: boolean; type: any }>({ open: false, type: 'crop' });

  const openAiTool = (type: any) => setAiModal({ open: true, type });

  const handleDiseaseScan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDiseaseResult({
        name: lang === 'bn' ? 'ধানের ব্লাস্ট রোগ' : 'Rice Blast Disease',
        risk: 'High',
        fix: lang === 'bn' ? 'ট্রাইসাইক্লাজল গ্রুপর ছত্রাকনাশক ব্যবহার করুন।' : 'Use Tricyclazole group fungicide (e.g. Trooper).',
        confidence: 94
      });
    }, 2000);
  };

  const menuItems: { id: AgriTool; icon: any; label_en: string; label_bn: string }[] = [
    { id: 'dashboard', icon: TrendingUp, label_en: 'Dashboard', label_bn: 'ড্যাশবোর্ড' },
    { id: 'fuel', icon: Fuel, label_en: 'Fuel & Irrigation', label_bn: 'জ্বালানি ও সেচ' },
    { id: 'fertilizer', icon: Beaker, label_en: 'Fertilizer Optimizer', label_bn: 'সার ক্যালকুলেটর' },
    { id: 'market', icon: ShoppingBag, label_en: 'Market Advisor', label_bn: 'বাজার পরামর্শ' },
    { id: 'climate', icon: ShieldAlert, label_en: 'Climate Resilience', label_bn: 'জলবায়ু সুরক্ষা' },
    { id: 'post-harvest', icon: Package, label_en: 'Harvest & Profit', label_bn: 'সংরক্ষণ ও লাভ' },
    { id: 'community', icon: Users, label_en: 'Community', label_bn: 'কমিউনিটি' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Krishi Intelligence – 2026 Crisis-Solving Agri Tech" 
        description="Solve 2026 irrigation fuel crisis, fertilizer shortages, and market price manipulation with Shoyakai's Krishi Intelligence."
        keywords="agriculture BD, fuel crisis 2026, fertilizer shortage, boro rice irrigation, market price Rangpur"
      />

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-600/20 rotate-3">
              <Sprout className="w-8 h-8" />
           </div>
           <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                 Krishi <span className="text-emerald-600">Intelligence</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic">
                 Resilience Engine v2.6
              </p>
           </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
           <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none">Alert: Diesel Crunch</span>
           </div>
           <div className="px-4 py-2 bg-brand/10 border border-brand/20 rounded-2xl flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-black text-brand uppercase tracking-widest leading-none">Market: Volatile</span>
           </div>
        </div>
      </header>

      {/* Dynamic Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
         {menuItems.map(item => (
           <button
             key={item.id}
             onClick={() => setActiveTool(item.id)}
             className={cn(
               "px-6 py-4 rounded-3xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shrink-0",
               activeTool === item.id 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl scale-105" 
                : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30"
             )}
           >
             <item.icon className={cn("w-4 h-4", activeTool === item.id ? "text-emerald-500" : "")} />
             {lang === 'bn' ? item.label_bn : item.label_en}
           </button>
         ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 xl:grid-cols-12 gap-8"
        >
          {/* Main Content Area */}
          <div className="xl:col-span-8 space-y-8">
             {activeTool === 'dashboard' && (
               <div className="space-y-8">
                  {/* Weather & Real-time Alerts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[40px] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                           <Cloud className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 italic">Climate Pulse</h3>
                                 <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black tracking-tighter">32°</span>
                                    <span className="text-lg font-black opacity-60">DHAKA</span>
                                 </div>
                              </div>
                              <Thermometer className="w-10 h-10 text-emerald-300" />
                           </div>
                           <div className="flex gap-8 border-t border-white/20 pt-6">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black uppercase opacity-60">Humidity</p>
                                 <p className="text-xl font-black">42%</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black uppercase opacity-60">Visibility</p>
                                 <p className="text-xl font-black">10km</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col justify-between border border-white/10 relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 p-8 opacity-5">
                           <TrendingUp className="w-48 h-48" />
                        </div>
                        <div className="space-y-4 relative z-10">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                 <Zap className="w-4 h-4 text-orange-500" />
                              </div>
                              <h4 className="text-xs font-black uppercase tracking-widest">{lang === 'bn' ? 'সতর্কবার্তা' : 'Urgent Advisory'}</h4>
                           </div>
                           <p className="text-sm font-medium leading-relaxed opacity-80">
                              {lang === 'bn' 
                                ? 'উত্তরাঞ্চলে ডিজেলের কৃত্রিম সংকট দেখা দিতে পারে। আপনার সেচ পাম্পের জ্বালানি আগে থেকেই মজুত রাখুন।' 
                                : 'Artificial diesel shortage reported in Northern districts. Buffer irrigation fuel for the next 72 hours.'}
                           </p>
                        </div>
                        <button 
                          onClick={() => setActiveTool('fuel')}
                          className="mt-6 w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                        >
                           Analyze Fuel Risk
                        </button>
                     </div>
                  </div>

                  {/* Price Tracker Visualization */}
                  <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-white/5 p-10 space-y-8 shadow-sm">
                     <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black tracking-tight">{lang === 'bn' ? 'স্মার্ট বাজার বিশ্লেষণ' : 'Market Intelligence'}</h3>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Across 12 major mandis</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-emerald-500" />
                              <span className="text-[10px] font-black text-slate-400 uppercase">Rice</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-orange-400" />
                              <span className="text-[10px] font-black text-slate-400 uppercase">Onion</span>
                           </div>
                        </div>
                     </div>

                     <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={priceData}>
                              <defs>
                                 <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="colorOnion" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: '900', fill: '#94a3b8'}} dy={10} />
                              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: '900', fill: '#94a3b8'}} />
                              <Tooltip 
                                 contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                 itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                              />
                              <Area type="monotone" dataKey="rice" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRice)" />
                              <Area type="monotone" dataKey="onion" stroke="#fb923c" strokeWidth={4} fillOpacity={1} fill="url(#colorOnion)" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50 dark:border-white/5">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Peak Market</p>
                           <p className="text-lg font-black">Sylhet</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lowest Price</p>
                           <p className="text-lg font-black">Rangpur</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Demand</p>
                           <p className="text-lg font-black text-emerald-500">SURGING</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Score</p>
                           <p className="text-lg font-black">8.4/10</p>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTool === 'fuel' && (
               <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[48px] p-10 text-white space-y-8 border border-white/5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                           <Fuel className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight italic">Irrigation Optimizer</h3>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Land Size (Acre)</label>
                              <div className="flex items-center gap-4">
                                 <input 
                                   type="range" min="0.1" max="10" step="0.1" 
                                   value={fuelConfig.land}
                                   onChange={(e) => setFuelConfig({...fuelConfig, land: parseFloat(e.target.value)})}
                                   className="flex-1 accent-emerald-500" 
                                 />
                                 <span className="text-2xl font-black min-w-[3ch]">{fuelConfig.land}</span>
                              </div>
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pump Type</label>
                              <div className="grid grid-cols-3 gap-2">
                                 {['diesel', 'electric', 'solar'].map(t => (
                                   <button 
                                     key={t}
                                     onClick={() => setFuelConfig({...fuelConfig, pump: t})}
                                     className={cn(
                                       "py-3 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest",
                                       fuelConfig.pump === t ? "bg-emerald-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
                                     )}
                                   >
                                     {t}
                                   </button>
                                 ))}
                              </div>
                           </div>
                           <div className="p-6 bg-white/5 rounded-3xl space-y-4 border border-white/5">
                              <div className="flex justify-between items-center">
                                 <span className="text-xs font-bold opacity-60">Estimated Daily Fuel</span>
                                 <span className="text-xl font-black text-emerald-400">{(fuelConfig.land * (fuelConfig.pump === 'diesel' ? 4.5 : 0)).toFixed(1)} L</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-xs font-bold opacity-60">Daily Cost (Current)</span>
                                 <span className="text-xl font-black">৳{(fuelConfig.land * (fuelConfig.pump === 'diesel' ? 4.5 * 110 : 150)).toFixed(0)}</span>
                              </div>
                           </div>
                        </div>

                        <div className="bg-emerald-950/40 rounded-3xl p-8 space-y-6 border border-emerald-500/20">
                           <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-emerald-400" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Crisis Solver Protocol</span>
                           </div>
                           <div className="space-y-4">
                              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                                 <div className="p-2 bg-emerald-500 rounded-lg text-white"><Wind className="w-4 h-4" /></div>
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">AWD Technique</p>
                                    <p className="text-xs font-medium opacity-80">Cycle water level to save up to 30% fuel.</p>
                                 </div>
                              </div>
                              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl">
                                 <div className="p-2 bg-emerald-500 rounded-lg text-white"><MapPin className="w-4 h-4" /></div>
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Pump Tracker</p>
                                    <p className="text-xs font-medium opacity-80">Solar pumps in your area are 80% subsidized.</p>
                                 </div>
                              </div>
                           </div>
                            <button 
                              onClick={() => openAiTool('fuel')}
                              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20"
                            >
                               Run AI Fuel Optimizer
                            </button>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTool === 'fertilizer' && (
               <div className="space-y-8">
                  <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 border border-slate-100 dark:border-white/5 space-y-10 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Beaker className="w-64 h-64" />
                     </div>
                     <div className="relative z-10 space-y-2">
                        <h3 className="text-3xl font-black tracking-tight uppercase italic underline decoration-emerald-500/30 underline-offset-8">Input Optimizer</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Precision balancing for budget constraints</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400">Crop Type</label>
                                 <select className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-emerald-500/20">
                                    <option>Boro Rice</option>
                                    <option>Potato</option>
                                    <option>Maize</option>
                                 </select>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400">Budget (BDT)</label>
                                 <input type="number" defaultValue={5000} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-emerald-500/20" />
                              </div>
                           </div>
                           <div className="space-y-4 p-8 bg-emerald-500 rounded-[32px] text-white">
                              <h4 className="text-xs font-black uppercase tracking-widest opacity-80 italic">Optimized Recommendation</h4>
                              <div className="space-y-3">
                                 <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span className="text-xs font-bold">Urea (Minimized)</span>
                                    <span className="text-lg font-black">25 KG</span>
                                 </div>
                                 <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span className="text-xs font-bold">Organic Compost</span>
                                    <span className="text-lg font-black">150 KG</span>
                                 </div>
                                 <div className="flex justify-between">
                                    <span className="text-xs font-bold">Yield Impact</span>
                                    <span className="text-lg font-black">+12% Gain</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                              <div className="flex items-center gap-2">
                                 <Award className="w-4 h-4 text-brand" />
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organic Transition Guide</span>
                              </div>
                              <div className="space-y-2">
                                 <p className="text-xs font-black">Step 1: Bio-Slurry Integration</p>
                                 <p className="text-[10px] opacity-60 leading-relaxed">Combine cow-dung slurry with minimal TSP to boost nitrogen naturally.</p>
                              </div>
                              <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                 <div className="w-1/3 h-full bg-emerald-500" />
                              </div>
                           </div>
                            <button 
                              onClick={() => openAiTool('fertilizer')}
                              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
                            >
                               Run AI Input Optimizer
                            </button>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTool === 'market' && (
               <div className="space-y-8">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-[40px] p-10 space-y-8 border border-white/5">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Smart Market Advisor</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Mandi Synchronization</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-full text-white">
                           <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                           <span className="text-[10px] font-black uppercase">Live Updates</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockMandiPrices.map((m, i) => (
                           <motion.div 
                             key={i}
                             whileHover={{ y: -5 }}
                             className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm space-y-4"
                           >
                              <div className="flex justify-between items-start">
                                 <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl"><ShoppingBag className="w-5 h-5 text-emerald-500" /></div>
                                 <span className={cn(
                                   "text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest",
                                   m.status === 'Oversupply' ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
                                 )}>{m.status}</span>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase">{m.mandi} Mandi</p>
                                 <h4 className="text-xl font-black">{m.crop}</h4>
                              </div>
                              <div className="flex items-center justify-between">
                                 <p className="text-2xl font-black">৳{m.price}</p>
                                 <div className="text-right">
                                    <p className="text-[8px] font-black text-slate-400 uppercase italic">Next Week Prediction</p>
                                    <p className={cn(
                                       "text-xs font-black",
                                       m.trend === 'up' ? "text-emerald-500" : "text-red-500"
                                    )}>৳{m.price + (m.trend === 'up' ? 4 : -3)}</p>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>

                     <div className="bg-emerald-500 rounded-[32px] p-10 text-white grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6">
                           <h4 className="text-3xl font-black italic tracking-tighter leading-tight">Processing & Direct-to-Consumer</h4>
                           <p className="text-sm font-medium opacity-90 leading-relaxed"> Prices for regular potatoes are low (৳18). Our algorithm suggests converting to chips or starch, increasing value by 3x.</p>
                           <div className="flex gap-3">
                              <button className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">List as Value-Added</button>
                              <button 
                                onClick={() => openAiTool('calc')}
                                className="flex-1 px-8 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all font-bold"
                              >
                                 AI ROI Advisor
                              </button>
                           </div>
                        </div>
                        <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 space-y-4">
                           <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-emerald-500" />
                              <span className="text-xs font-black uppercase tracking-widest">Collective Selling nearby</span>
                           </div>
                           <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                 <span className="text-[10px] font-bold">12 Farmers in Rangpur</span>
                                 <button className="text-[8px] font-black uppercase px-2 py-1 bg-emerald-500 rounded-md">Join Pool</button>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                 <span className="text-[10px] font-bold">Processing Deal: PRAN</span>
                                 <span className="text-[10px] font-black text-emerald-500 uppercase">Confirmed</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTool === 'climate' && (
               <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[48px] p-10 text-white space-y-10 border border-white/5 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-10 opacity-10">
                        <ShieldAlert className="w-64 h-64 text-emerald-500 rotate-12" />
                     </div>
                     <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-[8px] font-black uppercase tracking-[0.2em]">Risk: Moderate</div>
                        <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Risk Shield v2.0</h3>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                           <div className="space-y-4">
                              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Flood Ingress Probability</h4>
                              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: "25%" }}
                                   className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                                 />
                              </div>
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                                 <span className="text-emerald-500">Normal</span>
                                 <span className="opacity-40">25% Risk</span>
                                 <span className="text-red-500">Critical</span>
                              </div>
                           </div>

                           <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 space-y-6">
                              <h4 className="text-[10px] font-black uppercase tracking-widest italic text-emerald-500">Adaptation Recommendations</h4>
                              <div className="space-y-4">
                                 <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                                    <p className="text-xs font-medium opacity-80">Use BRRI dhan67 if salinity spikes (Southern Region).</p>
                                 </div>
                                 <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                                    <p className="text-xs font-medium opacity-80">Switch to Short-duration Mustard in Sylhet haor areas.</p>
                                 </div>
                                 <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                                    <p className="text-xs font-medium opacity-80">Raise seedbed by 6 inches before monsoon peak.</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-emerald-500 rounded-[40px] p-10 text-white space-y-8">
                           <div className="space-y-2">
                              <h4 className="text-2xl font-black italic tracking-tighter">Parametric Insurance</h4>
                              <p className="text-xs opacity-90 leading-relaxed font-medium">Automatic claims based on rain sensors. Protect your Boro investment for only ৳120/acre.</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                                 <p className="text-[8px] font-black uppercase mb-1 opacity-60">Coverage</p>
                                 <p className="text-lg font-black">৳15,000</p>
                              </div>
                              <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                                 <p className="text-[8px] font-black uppercase mb-1 opacity-60">Status</p>
                                 <p className="text-lg font-black">ACTIVE</p>
                              </div>
                           </div>
                            <button 
                              onClick={() => openAiTool('climate')}
                              className="w-full py-4 bg-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
                            >
                               Run Climate Risk Shield
                            </button>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTool === 'post-harvest' && (
               <div className="space-y-8">
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[48px] p-10 space-y-10 shadow-sm relative overflow-hidden">
                     <div className="absolute -bottom-10 -left-10 p-10 opacity-5">
                        <Package className="w-64 h-64 text-orange-500 -rotate-12" />
                     </div>
                     <div className="space-y-2 relative z-10">
                        <h3 className="text-3xl font-black tracking-tight uppercase leading-none">Harvest to Profit</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Minimize 20% loss through smart preservation</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                           <div className="p-8 bg-orange-500 text-white rounded-[40px] space-y-6 shadow-2xl shadow-orange-500/20">
                              <h4 className="text-center text-[10px] font-black uppercase tracking-widest opacity-80">Loss Predictor Analyzer</h4>
                              <div className="flex flex-col items-center">
                                 <div className="text-7xl font-black tracking-tighter">18%</div>
                                 <p className="text-xs font-bold opacity-60 uppercase tracking-widest mt-2">Expected Post-Harvest Loss</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                 <div className="p-3 bg-white/10 rounded-xl text-center">
                                    <p className="text-[10px] font-black uppercase">Money at Risk</p>
                                    <p className="text-sm font-bold">Avg ৳8,500/yr</p>
                                 </div>
                                 <div className="p-3 bg-white/10 rounded-xl text-center">
                                    <p className="text-[10px] font-black uppercase">Root Cause</p>
                                    <p className="text-sm font-bold">Improper Drying</p>
                                 </div>
                              </div>
                           </div>
                            <button 
                              onClick={() => openAiTool('harvest')}
                              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all"
                            >
                               Run Profit Optimizer
                            </button>
                        </div>

                        <div className="space-y-6">
                           <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                              <div className="flex items-center gap-2">
                                 <Beaker className="w-4 h-4 text-emerald-500" />
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Value-Add Scenarios</span>
                              </div>
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-50 dark:border-white/5">
                                    <div className="space-y-1">
                                       <p className="text-xs font-black">Potato → Starch</p>
                                       <p className="text-[10px] text-slate-400">Market Value: +৳24/kg</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><ArrowUpRight className="w-4 h-4 text-emerald-500" /></div>
                                 </div>
                                 <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-50 dark:border-white/5">
                                    <div className="space-y-1">
                                       <p className="text-xs font-black">Rice Straw → Bio-fuel</p>
                                       <p className="text-[10px] text-slate-400">Local Demand: High</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><ArrowUpRight className="w-4 h-4 text-emerald-500" /></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTool === 'community' && (
               <div className="space-y-8">
                  <div className="bg-slate-950 rounded-[48px] p-10 text-white space-y-10 relative overflow-hidden border border-white/5">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent" />
                     <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                           <h3 className="text-3xl font-black italic tracking-tighter uppercase">Agri-Social Network</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Powering collective intelligence</p>
                        </div>
                        <button className="px-8 py-3 bg-brand rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20">Ask Expert</button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-6">
                           <p className="text-xs font-black uppercase tracking-widest text-emerald-500 italic">Farmer Synergy Map</p>
                           <div className="p-10 bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center aspect-square md:aspect-auto md:h-64 overflow-hidden relative">
                              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid.png')]" />
                              <div className="relative flex flex-col items-center gap-4 group">
                                 <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                                       <Users className="w-7 h-7" />
                                    </div>
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-4 border-2 border-emerald-500 rounded-full" />
                                 </div>
                                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center">Scan Nearby Farmers<br/><span className="text-emerald-500">2.4km Pulse Radius</span></p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="flex items-center justify-between">
                              <p className="text-xs font-black uppercase tracking-widest text-gold-500 italic">Success Stories</p>
                              <TrendingUp className="w-4 h-4 text-emerald-500" />
                           </div>
                           <div className="space-y-4">
                              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-2 hover:bg-white/10 transition-all cursor-pointer">
                                 <p className="text-xs font-black">"How I saved ৳40,000 using AWD in Boro"</p>
                                 <p className="text-[10px] opacity-60">Md. Karim | Bogura | 4 days ago</p>
                              </div>
                              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-2 hover:bg-white/10 transition-all cursor-pointer">
                                 <p className="text-xs font-black">"Transitioning my 2 acres to high-value organic Onion"</p>
                                 <p className="text-[10px] opacity-60">S. Jahan | Pabna | 1 week ago</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* Side Intelligence Panel */}
          <div className="xl:col-span-4 space-y-8">
             {/* Disease Detector (Always available as high priority) */}
             <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-white/5 p-8 space-y-8 shadow-sm">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">Leaf Diagnostic</h3>
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Rapid Pathogen Recognition</p>
                </div>

                {!diseaseResult ? (
                   <div 
                    onClick={handleDiseaseScan}
                    className={cn(
                      "relative h-64 md:h-80 border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden group cursor-pointer",
                      analyzing 
                        ? "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/5 rotate-in pointer-events-none" 
                        : "border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50/20"
                    )}
                   >
                     {analyzing ? (
                       <div className="flex flex-col items-center gap-4 text-center px-4">
                          <div className="relative">
                             <div className="w-20 h-20 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                             <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500 animate-pulse" />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase italic tracking-tighter">{lang === 'bn' ? 'ছবি বিশ্লেষণ করা হচ্ছে...' : 'Analyzing Neural Signatures'}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black animate-pulse">Running Plant-Resilience-v4.0...</p>
                          </div>
                       </div>
                     ) : (
                       <>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:scale-125 transition-all duration-700">
                           <Upload className="w-10 h-10 text-slate-300 group-hover:text-emerald-500" />
                         </div>
                         <div className="text-center px-6">
                           <p className="text-sm font-black uppercase tracking-tight text-slate-600 dark:text-slate-300">Drop Leaf Scans</p>
                           <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Multi-crop validation enabled</p>
                         </div>
                         <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                       </>
                     )}
                   </div>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                     <div className="aspect-[4/3] rounded-[40px] bg-slate-100 dark:bg-slate-800 overflow-hidden relative shadow-2xl border border-white/10">
                        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale-[0.4]" />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                           <div className="flex items-center gap-2 mb-2">
                              <ShieldAlert className="w-4 h-4 text-emerald-500" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 underline underline-offset-4 decoration-emerald-500/30">Diagnosed: {diseaseResult.confidence}% Confidence</span>
                           </div>
                           <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">{diseaseResult.name}</h4>
                        </div>
                     </div>

                     <div className="p-6 bg-emerald-500 rounded-[32px] text-white shadow-xl shadow-emerald-500/20 space-y-4">
                        <div className="flex items-center gap-2">
                           <HelpCircle className="w-4 h-4" />
                           <span className="text-xs font-black uppercase tracking-widest">Digital Remedy</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed opacity-90">{diseaseResult.fix}</p>
                     </div>

                     <button onClick={() => setDiseaseResult(null)} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors">Start New Diagnosis</button>
                  </motion.div>
                )}
             </div>

             {/* Personalization Section */}
             <div className="bg-slate-900 rounded-[48px] p-8 text-white space-y-8 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                   <User className="w-32 h-32" />
                </div>
                <div className="space-y-2 relative z-10">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-xl font-black uppercase tracking-tighter italic">My Digital Twin</h3>
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Personalized Resilience Index</p>
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="flex flex-col items-center">
                      <div className="text-6xl font-black tracking-tighter text-emerald-500">82</div>
                      <p className="text-[8px] font-black uppercase opacity-60 tracking-[0.4em] mt-1">Farm Health Score</p>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                         <p className="text-[8px] font-black uppercase opacity-40 mb-1">Crops</p>
                         <p className="text-xs font-black">Rice, Onion</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                         <p className="text-[8px] font-black uppercase opacity-40 mb-1">Land</p>
                         <p className="text-xs font-black">2.4 Acres</p>
                      </div>
                   </div>
                   <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">Sync Farm Profile</button>
                </div>
             </div>

             {/* Rewards / Badges */}
             <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-white/5 p-8 space-y-6 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Recent Achievements</p>
                <div className="flex justify-center gap-4">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-white/5 group hover:bg-emerald-500 transition-all">
                         <Award className="w-6 h-6 text-emerald-500 group-hover:text-white" />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase">Fuel Saver</span>
                   </div>
                   <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-white/5">
                         <ShieldAlert className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase">Risk Expert</span>
                   </div>
                   <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-white/5">
                         <Zap className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase">Power Farmer</span>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Persistent CTA */}
      <section className="bg-slate-900 rounded-[48px] p-12 text-center space-y-8 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-color)_0%,_transparent_70%)] opacity-10" style={{ '--brand-color': '#10b981' } as any} />
         <div className="relative z-10 space-y-4">
            <h3 className="text-4xl font-black text-white italic tracking-tighter">The 2026 Resilience Blueprint.</h3>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Join 50,000+ Bangladeshi farmers future-proofing their livelihoods against fuel shocks and climate volatility.</p>
         </div>
         <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl">Start Free Trial</button>
            <button className="px-12 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2 italic">
               <Info className="w-4 h-4" /> 2026 Manual
            </button>
         </div>
      </section>

      <KrishiAIModal 
        isOpen={aiModal.open} 
        onClose={() => setAiModal({ ...aiModal, open: false })} 
        type={aiModal.type} 
      />
    </div>
  );
}
