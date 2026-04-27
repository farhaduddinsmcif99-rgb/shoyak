import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Lightbulb, Wallet, MapPin, BookmarkPlus, 
  ChevronRight, Loader2, Sparkles, TrendingUp, Calculator,
  Truck, Building2, Package, ArrowRight, ShieldCheck,
  Search, Info, Database, Briefcase, Users, FileText,
  BarChart3, Globe, Zap, Heart, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/helpers';

type HubView = 'main' | 'funding' | 'regulatory' | 'credit' | 'network' | 'blueprint';

export default function EntrepreneurHub() {
  const { lang } = useApp();
  const [activeView, setActiveView] = useState<HubView>('main');
  const [loading, setLoading] = useState(false);
  const [skillGap, setSkillGap] = useState(0);

  const stats = [
    { label: 'Active Startups', value: '1,240', color: 'text-brand' },
    { label: 'Gov Schemes', value: '42', color: 'text-emerald-500' },
    { label: 'Avg Funding', value: '৳5.4L', color: 'text-blue-500' }
  ];

  return (
    <div className="space-y-10">
       {/* Breadcrumbs / Back button if not in main */}
       {activeView !== 'main' && (
         <button 
           onClick={() => setActiveView('main')}
           className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-colors"
         >
           <ArrowRight className="w-4 h-4 rotate-180" /> Back to Intelligence Hub
         </button>
       )}

       <AnimatePresence mode="wait">
          {activeView === 'main' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
               <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-full">
                        <Sparkles className="w-3 h-3 text-brand" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand">2026 Resilience Ecosystem</span>
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                        Entrepreneur <span className="text-brand">Hub</span>
                     </h2>
                  </div>
                  <div className="flex gap-8">
                     {stats.map((s, i) => (
                       <div key={i} className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{s.label}</p>
                          <p className={cn("text-2xl font-black italic tracking-tighter leading-none", s.color)}>{s.value}</p>
                       </div>
                     ))}
                  </div>
               </header>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* High Impact Actions */}
                  <div 
                    onClick={() => setActiveView('funding')}
                    className="group bg-slate-900 rounded-[48px] p-8 text-white space-y-6 cursor-pointer hover:scale-[1.02] transition-all relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Wallet className="w-32 h-32" />
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center shadow-xl shadow-brand/20">
                        <Database className="w-6 h-6" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black italic tracking-tighter uppercase">Funding & Schemes</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">Access ৳2B in collateral-free loans & 2026 SME grants.</p>
                     </div>
                     <Loader2 className="w-4 h-4 text-brand opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity" />
                  </div>

                  <div 
                    onClick={() => setActiveView('regulatory')}
                    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[48px] p-8 space-y-6 cursor-pointer hover:-translate-y-2 transition-all"
                  >
                     <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black italic tracking-tighter uppercase">Regu-Simplifier</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Trade license, TIN & VAT automated paperwork generator.</p>
                     </div>
                     <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white dark:border-slate-900 group-hover:translate-x-1 transition-transform" />)}
                     </div>
                  </div>

                  <div 
                    onClick={() => setActiveView('credit')}
                    className="group bg-brand rounded-[48px] p-8 text-white space-y-6 cursor-pointer hover:shadow-2xl hover:shadow-brand/20 transition-all relative overflow-hidden"
                  >
                     <div className="absolute -bottom-10 -right-10 p-8 opacity-20">
                        <BarChart3 className="w-48 h-48" />
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-brand" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black italic tracking-tighter uppercase">Credit Simulator</h4>
                        <p className="text-xs opacity-80 font-medium leading-relaxed">Project your eligibility for the Central Bank "Smart Start" fund.</p>
                     </div>
                  </div>
               </div>

               {/* Skill Gap Section */}
               <div className="bg-slate-50 dark:bg-slate-800 rounded-[56px] p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                     <div className="inline-flex items-center gap-2 text-emerald-500">
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Growth Engine</span>
                     </div>
                     <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Identify Your <span className="text-emerald-500">Skill Gaps.</span></h3>
                     <p className="text-slate-500 font-medium leading-relaxed">Our AI analyzes local market demand vs your profile to suggest high-ROI missing skills for 2026.</p>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                           <span>Current Readiness</span>
                           <span className="text-emerald-500">64%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: '64%' }}
                             className="h-full bg-emerald-500 rounded-full" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                     {[
                       { t: 'Strategic Finance', d: 'Master BDT cash-flow management for volatility.' },
                       { t: 'Export Logistics', d: 'Navigate the 2026 port-clearance automation.' },
                       { t: 'AI Management', d: 'Automating internal reports using LLMs.' }
                     ].map((s, i) => (
                       <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
                          <div className="space-y-1">
                             <h4 className="text-sm font-black uppercase italic tracking-tighter">{s.t}</h4>
                             <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{s.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>
           )}

           {activeView === 'funding' && (
             <motion.div 
               key="funding"
               initial={{ opacity: 0, x: 20 }} 
               animate={{ opacity: 1, x: 0 }} 
               exit={{ opacity: 0, x: -20 }}
               className="space-y-10"
             >
               <div className="bg-slate-900 rounded-[56px] p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 blur-[100px] rounded-full" />
                  <header className="space-y-6 relative z-10 mb-12">
                     <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Funding & <span className="text-brand">Scheme Finder</span></h2>
                     <p className="text-slate-400 font-medium max-w-xl">Deep integration with Startup Bangladesh, SME Foundation, and Micro-Finance providers for 2026 mandates.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Filter by Profile</label>
                           <div className="grid grid-cols-2 gap-3">
                              {['Agri-Tech', 'Logistics', 'Retail', 'Export'].map(s => (
                                <button key={s} className="py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand/20 transition-all">{s}</button>
                              ))}
                           </div>
                        </div>
                        <div className="p-8 bg-brand/10 border border-brand/20 rounded-[32px] space-y-6">
                           <div className="flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-brand" />
                              <span className="text-[10px] font-black uppercase tracking-widest italic">AI Match of the day</span>
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-xl font-black uppercase italic tracking-tighter">Export Resilience Fund</h4>
                              <p className="text-xs text-slate-300">Grant for smallholders entering the European sustainable potato market.</p>
                           </div>
                           <div className="flex justify-between items-center text-sm font-black">
                              <span>৳1,500,000</span>
                              <span className="text-brand">94% MATCH</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Current Active Tenders</h4>
                        {[
                          { t: 'Gov Wheat Storage Silo', v: '৳12M', d: 'Private-Public Partnership' },
                          { t: 'Solar Irrigation Subsidy', v: '৳800K', d: 'Agri-Solar Grant 2026' },
                          { t: 'Women in Tech SME Loan', v: '৳2.5M', d: '1% Special Interest Rate' }
                        ].map((scheme, i) => (
                           <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all cursor-pointer">
                              <div className="flex justify-between items-start mb-2">
                                 <h5 className="font-black italic text-lg uppercase tracking-tight group-hover:text-brand transition-colors">{scheme.t}</h5>
                                 <p className="text-brand font-black italic">{scheme.v}</p>
                              </div>
                              <p className="text-[10px] text-slate-500 font-medium">{scheme.d}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeView === 'regulatory' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
               <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[56px] p-12 flex flex-col md:flex-row items-start justify-between gap-12 shadow-sm">
                  <div className="space-y-8 flex-1">
                     <header className="space-y-4">
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">Regulatory <span className="text-emerald-500">Simplifier</span></h2>
                        <p className="text-slate-500 font-medium">Automatic generation of compliance documents for the 2026 "Smart Bangladesh" business framework.</p>
                     </header>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { t: 'Trade License', d: 'Step-by-step assistant for City Corp / Paurashava' },
                          { t: 'Digital TIN', d: 'Link your NID and verify e-TIN in 30 seconds' },
                          { t: 'VAT Exemption', d: 'Check eligibility for turnover tax exemption' },
                          { t: 'RJSC Prep', d: 'Pre-filing checklist for Private Ltd. Co.' }
                        ].map((r, i) => (
                           <button key={i} className="flex flex-col items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl group border-2 border-transparent hover:border-emerald-500/20 transition-all text-left">
                              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                 <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                 <h4 className="text-sm font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">{r.t}</h4>
                                 <p className="text-[10px] text-slate-500 leading-relaxed font-medium mt-1">{r.d}</p>
                              </div>
                           </button>
                        ))}
                      </div>
                  </div>
                  <div className="w-full md:w-[450px] bg-slate-950 rounded-[48px] p-10 text-white space-y-10 relative overflow-hidden shrink-0">
                     <div className="absolute -top-10 -right-10 opacity-10"><ShieldCheck className="w-64 h-64" /></div>
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">2026 Compliance Shield</span>
                        <h4 className="text-3xl font-black italic uppercase leading-none">Your Business Readiness</h4>
                     </div>
                     <div className="space-y-6">
                        {[
                          { l: 'Identity (NID/Passport)', v: 100, s: 'Verified' },
                          { l: 'Establishment Proof', v: 45, s: 'Pending Rent' },
                          { l: 'Tax History', v: 20, s: 'Action Required' }
                        ].map((item, i) => (
                           <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                 <span>{item.l}</span>
                                 <span className={cn(item.v === 100 ? "text-emerald-500" : "text-amber-500")}>{item.v}% - {item.s}</span>
                              </div>
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: `${item.v}%` }} className={cn("h-full rounded-full", item.v === 100 ? "bg-emerald-500" : "bg-amber-500")} />
                              </div>
                           </div>
                        ))}
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium italic opacity-60 leading-relaxed">
                        * Documents generated are compatible with the latest G2B portal updates.
                     </p>
                     <button className="w-full py-5 bg-emerald-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-emerald-500/20">Generate Filing Package</button>
                  </div>
               </div>
            </motion.div>
          )}

          {activeView === 'credit' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-slate-900 rounded-[56px] p-12 text-white space-y-10 border border-white/5 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
                     <div className="space-y-4 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 border border-brand/30 rounded-full text-brand text-[9px] font-black uppercase">Alpha Simulator</div>
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Credit <span className="text-brand">Score</span> Intelligence</h2>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-sm">Project your borrowing bandwidth based on 2026 inflation and interest rate cycles.</p>
                     </div>
                     
                     <div className="space-y-8 relative z-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Revenue Stability (Monthly Avg)</label>
                           <div className="flex gap-4">
                              <input type="number" defaultValue={250000} className="flex-1 h-20 px-8 bg-white/5 border border-white/10 rounded-3xl font-black text-4xl italic tracking-tighter outline-none focus:border-brand transition-all text-white" />
                              <div className="w-20 h-20 bg-brand/10 border border-brand/20 rounded-3xl flex flex-col items-center justify-center">
                                 <p className="text-[8px] font-black uppercase text-brand">Confidence</p>
                                 <p className="text-xl font-black text-brand">H</p>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sector Risk (2026 Outlook)</label>
                           <select className="w-full h-16 px-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest outline-none focus:border-brand appearance-none">
                              <option>Agriculture (Favorable)</option>
                              <option>Garments (Moderate)</option>
                              <option>Tech Services (High Growth)</option>
                              <option>Real Estate (Cooling)</option>
                           </select>
                        </div>
                        <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                           <div className="text-center md:text-left space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-500 italic">Est. Borrowing Power</p>
                              <p className="text-5xl font-black italic text-brand tracking-tighter leading-none">৳2.84M</p>
                           </div>
                           <button className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all shrink-0">Get PDF Report</button>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[56px] p-12 space-y-10 shadow-sm relative overflow-hidden h-full">
                       <div className="flex items-center justify-between">
                          <div className="space-y-2">
                             <h3 className="text-2xl font-black italic tracking-tighter leading-none uppercase shrink-0">Credit Eligibility Map</h3>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bankability metrics</p>
                          </div>
                          <div className="p-4 bg-brand/10 text-brand rounded-2xl flex items-center justify-center shrink-0">
                             <TrendingUp className="w-6 h-6" />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 gap-6">
                          {[
                            { l: 'Repayment History', v: 92, d: 'Flawless Bkash/Salary record' },
                            { l: 'Business Age', v: 30, d: 'Early stage multiplier applied' },
                            { l: 'Collateral Index', v: 14, d: 'Zero-asset loan options prioritized' }
                          ].map((m, i) => (
                             <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-transparent hover:border-brand/10 transition-all">
                                <div className="flex justify-between items-center">
                                   <p className="text-xs font-black uppercase italic tracking-tighter">{m.l}</p>
                                   <span className="text-brand font-black text-xs">{m.v}%</span>
                                </div>
                                <div className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-brand rounded-full" style={{ width: `${m.v}%` }} />
                                </div>
                                <p className="text-[10px] font-medium text-slate-500 leading-none">{m.d}</p>
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>
            </motion.div>
           )}

           {activeView === 'network' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Entrepreneur <span className="text-brand">Network</span></h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Synergy engine v1.4</p>
                   </div>
                   <div className="flex gap-2">
                       <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-white text-[10px] font-black uppercase tracking-widest">Connect Nearby</button>
                       <button className="px-6 py-3 bg-brand rounded-full text-white text-[10px] font-black uppercase tracking-widest">Post Request</button>
                   </div>
                </div>
                {/* Network Feed Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                   {[
                     { n: 'Sakib H.', l: 'Bashundhara', act: 'Seeking Logistics Partner', tags: ['Retail', 'Transport'], heart: 12 },
                     { n: 'Nadia A.', l: 'Chittagong', act: 'Supplying Raw Cotton', tags: ['Textile', 'B2B'], heart: 45 },
                     { n: 'Karimul I.', l: 'Sylhet', act: 'Tea-leaf drying tech share', tags: ['Agri', 'Tech'], heart: 8 }
                   ].map((p, i) => (
                     <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[40px] space-y-6 hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0">
                                 <Users className="w-6 h-6 text-slate-400" />
                              </div>
                              <div>
                                 <h4 className="font-black italic text-lg leading-none">{p.n}</h4>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.l}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-1 text-slate-300">
                              <Heart className="w-4 h-4 cursor-pointer hover:text-red-500 hover:fill-red-500 transition-colors" />
                              <span className="text-[10px] font-black">{p.heart}</span>
                           </div>
                        </div>
                        <p className="text-sm font-black italic tracking-tight italic opacity-80 underline underline-offset-4 decoration-brand/30">"{p.act}"</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                           {p.tags.map(t => <span key={t} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-lg">{t}</span>)}
                        </div>
                        <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Request Intro</button>
                     </div>
                   ))}
                </div>
             </motion.div>
          )}
       </AnimatePresence>

       {/* Persistent Ecosystem CTA if in main */}
       {activeView === 'main' && (
         <section 
           onClick={() => setActiveView('network')}
           className="p-12 bg-emerald-500 rounded-[56px] text-white flex flex-col md:flex-row items-center justify-between gap-12 cursor-pointer relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="space-y-4 relative z-10 text-center md:text-left">
               <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">The <span className="text-slate-900">Collaboration</span><br/>Network.</h3>
               <p className="max-w-md text-emerald-100 font-medium leading-relaxed">Don't build alone. Connect with 4,000+ verified entrepreneurs, suppliers, and distributors across Bangladesh.</p>
            </div>
            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
               <div className="flex -space-x-4 justify-center md:justify-start">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-14 h-14 rounded-3xl bg-slate-900 border-4 border-emerald-500 flex items-center justify-center text-[10px] font-black">{i}k</div>)}
               </div>
               <button className="px-12 py-5 bg-white text-emerald-600 rounded-[32px] font-black text-sm uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl">Enter Synergy Map</button>
            </div>
         </section>
       )}
    </div>
  );
}
