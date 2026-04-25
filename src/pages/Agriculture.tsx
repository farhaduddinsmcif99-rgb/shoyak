import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Sprout, Cloud, TrendingUp, AlertCircle, Camera, 
  Upload, Search, Info, CheckCircle2, Wind, Droplets,
  Thermometer, ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const priceData = [
  { month: 'Jan', rice: 52, potato: 24, onion: 45 },
  { month: 'Feb', rice: 54, potato: 22, onion: 48 },
  { month: 'Mar', rice: 53, potato: 20, onion: 60 },
  { month: 'Apr', rice: 55, potato: 18, onion: 75 },
  { month: 'May', rice: 58, potato: 25, onion: 40 },
  { month: 'Jun', rice: 60, potato: 28, onion: 35 },
];

export default function Agriculture() {
  const { lang } = useApp();
  const [analyzing, setAnalyzing] = useState(false);
  const [diseaseResult, setDiseaseResult] = useState<any>(null);

  const handleUpload = () => {
    setAnalyzing(true);
    setDiseaseResult(null);
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

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Krishi Pro AI – Smart Agriculture Assistant for Bangladesh" 
        description="Optimize your farm with Krishi Pro AI. Real-time market prices, crop disease detection, weather alerts, and expert farming advice for Bangladeshi farmers."
        keywords="Krishi AI, Bangladesh agriculture, farming tools, crop disease detection, market prices Bangladesh"
        type="WebApplication"
        schemaData={{
          "@type": "SoftwareApplication",
          "name": "Krishi Pro AI",
          "applicationCategory": "Agriculture",
          "operatingSystem": "Web",
          "description": "AI-powered agricultural tool for disease detection and market analysis."
        }}
      />
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none uppercase">
               Krishi <span className="text-green-500">Pro AI</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Smart Farming Assistant</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          {/* Weather & Advice Card */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-[40px] p-8 text-white relative overflow-hidden">
             <Cloud className="absolute -top-10 -right-10 w-48 h-48 opacity-10" />
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <h3 className="text-lg font-bold opacity-80">{lang === 'bn' ? 'আজকের আবহাওয়া' : 'Weather Suggestion'}</h3>
                      <div className="flex items-baseline gap-2">
                         <span className="text-5xl font-black">32°C</span>
                         <span className="text-sm font-bold opacity-80 tracking-widest uppercase">DHAKA</span>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                         <Droplets className="w-5 h-5 mb-1 text-blue-300" />
                         <span className="text-[10px] font-black underline decoration-blue-300/40 underline-offset-4">40% HUMID</span>
                      </div>
                      <div className="flex flex-col items-center">
                         <Wind className="w-5 h-5 mb-1 text-slate-300" />
                         <span className="text-[10px] font-black underline decoration-slate-300/40 underline-offset-4">12km/h WIND</span>
                      </div>
                   </div>
                </div>

                <div className="p-5 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 space-y-3">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white text-green-600 rounded-xl"><Zap className="w-4 h-4" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest">{lang === 'bn' ? 'চাষী পরামর্শ' : 'Farming Advice'}</h4>
                   </div>
                   <p className="text-xs leading-relaxed font-medium">
                      {lang === 'bn' 
                        ? 'আগামী ৩ দিন বৃষ্টির সম্ভাবনা নেই। বোরো ধানের জমিতে সেচ প্রদান করুন। ইউরিয়া সার বিকেলের পরে প্রয়োগ করা ভালো।'
                        : 'No rain expected for next 3 days. Irrigate your Boro rice fields. Apply Urea fertilizer after evening for best results.'}
                   </p>
                </div>
             </div>
          </div>

          {/* Price Tracking Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
             <div className="flex justify-between items-center">
                <div className="space-y-1">
                   <h3 className="text-xl font-bold">{lang === 'bn' ? 'বাজার দর পূর্বাভাস' : 'Price Prediction'}</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Market Trend Analytics</p>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[10px] font-black text-slate-500">RICE</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-[10px] font-black text-slate-500">ONION</span>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px] space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Soil Type</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-xs font-bold outline-none border-2 border-transparent focus:border-green-500/20">
                      <option>Loamy (দোআঁশ)</option>
                      <option>Clayey (এঁটেল)</option>
                      <option>Sandy (বেলে)</option>
                   </select>
                </div>
                <div className="flex-1 min-w-[150px] space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Water Source</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-xs font-bold outline-none border-2 border-transparent focus:border-green-500/20">
                      <option>River (নদী)</option>
                      <option>Tubewell (টিউবওয়েল)</option>
                      <option>Rain-fed (বৃষ্টি)</option>
                   </select>
                </div>
                <div className="flex-1 min-w-[150px] space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Region</label>
                   <select className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-xs font-bold outline-none border-2 border-transparent focus:border-green-500/20">
                      <option>North (রংপুর/রাজশাহী)</option>
                      <option>South (বরিশাল/খুলনা)</option>
                      <option>Central (ঢাকা)</option>
                   </select>
                </div>
             </div>

             <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={priceData}>
                      <defs>
                         <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="colorOnion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dx={-10} />
                      <Tooltip 
                         contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                      />
                      <Area type="monotone" dataKey="rice" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRice)" />
                      <Area type="monotone" dataKey="onion" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorOnion)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>

             <div className="grid grid-cols-3 gap-4 border-t border-slate-50 dark:border-slate-800 pt-6">
                <div className="text-center space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Current Avg</p>
                   <p className="text-xl font-bold flex items-center justify-center gap-1">৳58 <ArrowUpRight className="w-4 h-4 text-red-500" /></p>
                </div>
                <div className="border-x border-slate-50 dark:border-slate-800 text-center space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Predicted (Next)</p>
                   <p className="text-xl font-bold flex items-center justify-center gap-1">৳62 <ArrowUpRight className="w-4 h-4 text-red-500" /></p>
                </div>
                <div className="text-center space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Volatility</p>
                   <p className="text-xl font-bold text-amber-500">LOW</p>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-6">
          {/* Disease Detection Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
             <div className="space-y-1">
                <h3 className="text-xl font-bold">{lang === 'bn' ? 'রোগ শনাক্তকরণ' : 'Disease Detection'}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Visual AI Recognition</p>
             </div>

             {!diseaseResult ? (
               <div 
                onClick={handleUpload}
                className={`relative h-64 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-green-500/40 hover:bg-green-50/50 dark:hover:bg-green-900/5 transition-all overflow-hidden ${analyzing ? 'pointer-events-none' : ''}`}
               >
                 {analyzing ? (
                   <div className="flex flex-col items-center gap-4 text-center px-4">
                      <div className="relative">
                         <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                         <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-green-500 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{lang === 'bn' ? 'ছবি বিশ্লেষণ করা হচ্ছে...' : 'Analyzing Image...'}</p>
                        <p className="text-[10px] text-slate-400">Verifying leaf pattern and color...</p>
                      </div>
                   </div>
                 ) : (
                   <>
                     <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:scale-110 transition-transform">
                       <Camera className="w-8 h-8 text-slate-400 group-hover:text-green-500 transition-colors" />
                     </div>
                     <div className="text-center px-4">
                       <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{lang === 'bn' ? 'গাছের পাতার ছবি আপলোড করুন' : 'Upload leaf/plant photo'}</p>
                       <p className="text-[10px] text-slate-400 mt-1">Supports Rice, Potato, Tomato, Wheat</p>
                     </div>
                     <div className="absolute bottom-4 p-2 bg-green-500 text-white rounded-xl text-[10px] font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                       <Upload className="w-3 h-3" /> CLICK TO SCAN
                     </div>
                   </>
                 )}
               </div>
             ) : (
               <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
               >
                 <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-[32px] overflow-hidden relative">
                    <img src="/agriculture-hero.png" className="w-full h-full object-cover grayscale-[0.5]" />
                    <div className="absolute inset-0 bg-red-900/40 text-white flex flex-col justify-end p-6">
                       <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Detected Match: {diseaseResult.confidence}%</span>
                       </div>
                       <h4 className="text-2xl font-black">{diseaseResult.name}</h4>
                    </div>
                 </div>

                 <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4 text-red-600" />
                       <span className="text-xs font-black uppercase tracking-widest text-red-700 dark:text-red-400">Solution Roadmap</span>
                    </div>
                    <p className="text-xs text-red-800 dark:text-red-300 font-medium leading-relaxed underline decoration-red-200 decoration-wavy underline-offset-4">{diseaseResult.fix}</p>
                 </div>

                 <button 
                  onClick={() => setDiseaseResult(null)}
                  className="w-full py-4 border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all"
                 >
                   RE-SCAN DIFFERENT PLANT
                 </button>
               </motion.div>
             )}

             <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <span>Top Consulted Issues</span>
                   <Search className="w-3 h-3" />
                </div>
                <div className="flex flex-wrap gap-2">
                   {['Blight', 'Mites', 'Stem Borer', 'Rust'].map(tag => (
                     <span key={tag} className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 rounded-lg">#{tag}</span>
                   ))}
                </div>
             </div>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center text-center gap-4 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp className="w-32 h-32 text-brand" />
        </div>
        <h3 className="text-2xl font-black">{lang === 'bn' ? 'স্মার্ট কৃষি ক্যালেন্ডার' : 'Smart Agri Calendar'}</h3>
        <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
           {lang === 'bn' 
            ? 'আপনার এলাকার মাটি ও আবহাওয়া অনুযায়ী কখন কোন ফসল রোপণ করবেন তার পূর্ণাঙ্গ পরিকল্পনা।' 
            : 'Get a full planting roadmap based on your local soil profile and real-time climate data.'}
        </p>
        <button className="px-10 py-4 bg-brand text-white rounded-2xl font-black shadow-xl shadow-brand/20 hover:scale-105 transition-all">GENERATE MY PLAN</button>
      </section>
    </div>
  );
}
