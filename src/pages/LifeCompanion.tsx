import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { 
  Shield, Brain, Zap, Target, Star, TrendingUp, 
  Activity, Heart, Fingerprint, Lock, Compass,
  Sparkles, Globe, MapPin, AlertCircle, BarChart3,
  Flame, Award, Briefcase, GraduationCap, ChevronRight,
  UserPlus, UserMinus, MessageSquare, Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SEO from '../components/SEO';

interface LifeMetric {
  date: string;
  skill: number;
  health: number;
  trust: number;
}

const MOCK_GROWTH_DATA: LifeMetric[] = [
  { date: '2024', skill: 20, health: 60, trust: 30 },
  { date: '2025', skill: 45, health: 75, trust: 55 },
  { date: '2026', skill: 85, health: 90, trust: 88 },
];

export default function LifeCompanion() {
  const { user, lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<'guardian' | 'twin' | 'predictive' | 'network'>('guardian');
  const [mood, setMood] = useState<'calm' | 'excited' | 'focused' | 'tired'>('focused');
  
  // Stats
  const trustScore = 785;
  const skills = [
    { name: 'AI Engineering', progress: 85, trend: 'up' },
    { name: 'Agriculture Tech', progress: 62, trend: 'up' },
    { name: 'Financial Logic', progress: 45, trend: 'stable' },
  ];

  const futureForecasts = [
    { title: 'Market Opportunity', desc: 'Rice export demand will spike by 15% in Q3.', type: 'profit' },
    { title: 'Personal Skill Gap', desc: 'Your 2050 career goal requires "Quantum Ethics" certification.', type: 'learning' },
    { title: 'Local Alert', desc: 'Savar region predicts high rainfall next week. Adjust crop plans.', type: 'risk' }
  ];

  return (
    <div className="space-y-8 pb-20">
      <SEO 
        title="Life Companion" 
        description="Your AI-powered Life Companion. Predicting market trends, skill gaps, and personal growth milestones for Vision 2050."
      />
      {/* 2050 Vision Header */}
      <div className="bg-slate-900 rounded-[56px] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/30 blur-[140px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[100px] -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                    <Fingerprint className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-black uppercase tracking-[0.3em] text-brand">Authenticated Life-Twin v4.2</span>
              </div>
              <h1 className="text-6xl font-black italic tracking-tighter leading-none">
                 SHAYOK <br/> <span className="text-brand">LIFE-OS</span>
              </h1>
           </div>
           
           <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10">
              {['guardian', 'twin', 'predictive', 'network'].map(t => (
                 <button
                    key={t}
                    onClick={() => setActiveTab(t as any)}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === t ? 'bg-brand text-white shadow-lg' : 'text-slate-400 hover:text-white'
                    }`}
                 >
                    {t}
                 </button>
              ))}
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'guardian' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
             {/* Identity Card */}
             <div className="lg:col-span-1 space-y-8">
                <div className="p-10 bg-white dark:bg-slate-900 rounded-[56px] border border-slate-100 dark:border-slate-800 space-y-8 shadow-sm">
                   <div className="flex justify-between items-start">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[32px] flex items-center justify-center overflow-hidden">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'sh'}`} alt="AI Twin" />
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-slate-400">Trust Score</p>
                         <p className="text-4xl font-black text-brand italic tracking-tighter">{trustScore}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <h3 className="text-xl font-black italic">{user?.name || 'Explorer'}</h3>
                      <div className="flex flex-wrap gap-2">
                         <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-800">Verified Citizen</span>
                         <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full border border-brand/20">Alpha Node</span>
                         <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100 dark:border-indigo-800">Growth Star</span>
                      </div>
                   </div>

                   <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-brand" />
                            <span className="font-bold text-sm">Health Sync</span>
                         </div>
                         <span className="text-sm font-black">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-indigo-500" />
                            <span className="font-bold text-sm">Goal Velocity</span>
                         </div>
                         <span className="text-sm font-black">1.2x</span>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-brand rounded-[48px] text-white space-y-6 shadow-xl shadow-brand/20">
                   <div className="flex items-center gap-4">
                      <Brain className="w-8 h-8" />
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">Current Mood</h3>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      {['calm', 'excited', 'focused', 'tired'].map(m => (
                         <button 
                            key={m} 
                            onClick={() => setMood(m as any)}
                            className={`py-4 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${
                               mood === m ? 'bg-white text-brand border-white' : 'bg-transparent border-white/20 text-white/60'
                            }`}
                         >
                            {m}
                         </button>
                      ))}
                   </div>
                   <p className="text-xs font-bold text-white/80 italic">"You seem determined today. I've optimized your schedule for maximum flow."</p>
                </div>
             </div>

             {/* Growth Chart */}
             <div className="lg:col-span-2 space-y-8">
                <div className="p-10 bg-white dark:bg-slate-900 rounded-[56px] border border-slate-100 dark:border-slate-800 space-y-8 shadow-sm">
                   <div className="flex justify-between items-end">
                      <div className="space-y-2">
                         <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Life Ledger</h3>
                         <p className="text-slate-400 text-xs font-bold">Multidimensional growth tracking from childhood to now.</p>
                      </div>
                      <div className="flex gap-2">
                         <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">Skills</button>
                         <button className="px-4 py-2 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Network</button>
                      </div>
                   </div>
                   
                   <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={MOCK_GROWTH_DATA}>
                            <defs>
                               <linearGradient id="colorSkill" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#FB7185" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#FB7185" stopOpacity={0}/>
                               </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900 }} />
                            <YAxis hide />
                            <Tooltip />
                            <Area 
                               type="monotone" 
                               dataKey="skill" 
                               stroke="#FB7185" 
                               strokeWidth={4}
                               fillOpacity={1} 
                               fill="url(#colorSkill)" 
                            />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-10 bg-slate-900 text-white rounded-[56px] space-y-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-all">
                         <Briefcase className="w-32 h-32 rotate-12" />
                      </div>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">Next-Layer Learning</h3>
                      <div className="space-y-4">
                         {skills.map((s, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">{s.name}</span>
                                  <span className="text-brand">{s.progress}%</span>
                               </div>
                               <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div 
                                     initial={{ width: 0 }} animate={{ width: `${s.progress}%` }}
                                     className="h-full bg-brand" 
                                  />
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="p-10 bg-indigo-600 text-white rounded-[56px] space-y-8">
                      <div className="w-16 h-16 bg-white/20 rounded-[28px] flex items-center justify-center">
                         <Compass className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-xl font-black italic uppercase tracking-tighter">Your AI Twin</h3>
                         <p className="text-white/80 text-sm font-bold">"I'm learning your decision patterns. I can now handle your basic emails and job applications autonomously."</p>
                      </div>
                      <button className="w-full h-14 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all">
                         Manage Twin Privileges
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === 'predictive' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                 <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Quantum Predictions</h2>
                 <p className="text-slate-500 font-bold">AI scans global and local datasets to forecast your future opportunities and risks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {futureForecasts.map((f, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                       className="p-10 bg-white dark:bg-slate-900 rounded-[56px] border-4 border-slate-100 dark:border-slate-800 space-y-6 group hover:border-brand transition-all"
                    >
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          f.type === 'profit' ? 'bg-emerald-100 text-emerald-600' : 
                          f.type === 'learning' ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-600'
                       }`}>
                          {f.type === 'profit' ? <TrendingUp className="w-6 h-6" /> : 
                           f.type === 'learning' ? <Zap className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-lg font-black italic leading-none">{f.title}</h4>
                          <p className="text-sm font-bold text-slate-500 leading-relaxed">{f.desc}</p>
                       </div>
                       <button className="text-[10px] font-black uppercase text-brand flex items-center gap-2 group-hover:translate-x-2 transition-all">
                          Take Action <ChevronRight className="w-4 h-4" />
                       </button>
                    </motion.div>
                 ))}
              </div>

              {/* Economic Map Overlay */}
              <div className="bg-slate-900 rounded-[64px] p-12 text-white relative h-[600px] overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <header className="flex justify-between items-start">
                       <div className="space-y-2">
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter">Hyperlocal Network</h3>
                          <div className="flex items-center gap-2 text-emerald-400">
                             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest italic">Live Economic Layer</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                          <div>
                             <p className="text-[8px] font-black uppercase text-slate-500">Dhaka North Node</p>
                             <p className="text-sm font-black">৳42.5B Ecosystem Value</p>
                          </div>
                          <Globe className="w-6 h-6 text-brand" />
                       </div>
                    </header>

                    <div className="flex-1 flex items-center justify-center pointer-events-none">
                       {/* Abstract Map Visualization */}
                       <div className="relative">
                          <div className="w-96 h-96 border-4 border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-64 h-64 border-4 border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Sparkles className="w-16 h-16 text-brand animate-pulse" />
                          </div>
                          {/* Floating Local Data nodes */}
                          {[
                             { pos: 'top-0 left-0', text: 'Job Surge' },
                             { pos: 'bottom-40 right-0', text: 'Food Surplus' },
                             { pos: 'top-40 right-0', text: 'New Startups' }
                          ].map((n, i) => (
                             <div key={i} className={`absolute ${n.pos} bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 animate-bounce`}>
                                <span className="text-[8px] font-black uppercase tracking-widest">{n.text}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-8">Decentralized Intelligence Active</p>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
