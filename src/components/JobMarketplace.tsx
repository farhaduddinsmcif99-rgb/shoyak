import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Briefcase, MapPin, DollarSign, Clock, Search, Filter, 
  ChevronRight, ArrowUpRight, CheckCircle2, History,
  Star, Zap, Building, Building2, Globe, ShieldCheck, 
  Map as MapIcon, GraduationCap, Award, TrendingUp, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/helpers';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Freelance' | 'Local' | 'Remote';
  category: string;
  postedAt: string;
  tags: string[];
  isVerified: boolean;
  matchScore: number;
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Modern Agricultural Consultant',
    company: 'AgriTech Solutions',
    location: 'Khulna, BD',
    salary: '৳৩০,০০০ - ৳৪৫,০০০',
    type: 'Local',
    category: 'Agriculture',
    postedAt: '2h ago',
    tags: ['Expert', 'Soil Science'],
    isVerified: true,
    matchScore: 94
  },
  {
    id: '2',
    title: 'Remote Content Writer (Bangla)',
    company: 'Shayok Media',
    location: 'Remote',
    salary: '৳১৫,০০০ - ৳২৫,০০০',
    type: 'Remote',
    category: 'Writing',
    postedAt: '5h ago',
    tags: ['Part-time', 'Bangla'],
    isVerified: false,
    matchScore: 78
  },
  {
    id: '3',
    title: 'Frontend Developer (React)',
    company: 'Neural Systems',
    location: 'Dhaka (Hybrid)',
    salary: '৳৬০,০০০ - ৳৮০,০০০',
    type: 'Freelance',
    category: 'Tech',
    postedAt: '1d ago',
    tags: ['React', 'Tailwind'],
    isVerified: true,
    matchScore: 82
  },
  {
    id: '4',
    title: 'Primary School Teacher',
    company: 'Green Valley School',
    location: 'Sylhet',
    salary: '৳২০,০০০',
    type: 'Local',
    category: 'Education',
    postedAt: '2d ago',
    tags: ['Full-time', 'Gov-Certified'],
    isVerified: true,
    matchScore: 65
  }
];

export default function JobMarketplace() {
  const { lang } = useApp();
  const [filter, setFilter] = useState<'all' | 'Freelance' | 'Local' | 'Remote'>('all');
  const [search, setSearch] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [view, setView] = useState<'listings' | 'history'>('listings');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesFilter = filter === 'all' || job.type === filter;
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                         job.company.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApply = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
    }
  };

  return (
    <div className="space-y-10 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Opportunities
           </div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
              Talent <span className="text-brand">Market</span>
           </h2>
        </div>
        
        <div className="flex bg-slate-900 p-2 rounded-3xl border border-white/5 shadow-2xl self-start">
           <button 
            onClick={() => setView('listings')}
            className={cn(
              "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
              view === 'listings' ? "bg-white text-slate-900" : "text-slate-400 hover:text-white"
            )}
           >
             {lang === 'bn' ? 'চাকরি খুঁজুন' : 'Live Openings'}
           </button>
           <button 
            onClick={() => setView('history')}
            className={cn(
               "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
               view === 'history' ? "bg-white text-slate-900" : "text-slate-400 hover:text-white"
            )}
           >
             {lang === 'bn' ? 'আবেদনসমূহ' : 'My Pipeline'}
           </button>
        </div>
      </header>

      {view === 'listings' ? (
        <>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="relative col-span-1 md:col-span-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={lang === 'bn' ? 'চাকরি বা কোম্পানি খুঁজুন...' : 'Role, Expertise or Company...'}
                    className="w-full h-14 pl-14 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-brand/20 font-bold transition-all"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               </div>
               <div className="flex gap-2 col-span-1 md:col-span-2 overflow-x-auto no-scrollbar">
                  {['all', 'Freelance', 'Local', 'Remote'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilter(t as any)}
                      className={cn(
                        "h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap",
                        filter === t 
                          ? 'bg-slate-900 border-slate-900 text-white' 
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'
                      )}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-400">
               {[
                 { icon: MapIcon, label: 'Nearby' },
                 { icon: GraduationCap, label: 'Entry Level' },
                 { icon: Award, label: 'Certified' },
                 { icon: TrendingUp, label: 'High Yield' }
               ].map((f, i) => (
                 <button key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">
                    <f.icon className="w-3.5 h-3.5" /> {f.label}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white dark:bg-slate-900 rounded-[40px] p-8 border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl hover:shadow-black/5 transition-all relative overflow-hidden"
                >
                   {/* Match Score Indicator */}
                   <div className="absolute top-0 right-0 p-8 flex flex-col items-end">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center relative">
                         <span className="text-[10px] font-black text-emerald-500">{job.matchScore}%</span>
                         <motion.div 
                           initial={{ rotate: -90 }}
                           animate={{ rotate: (job.matchScore / 100) * 360 - 90 }}
                           className="absolute inset-[-4px] border-4 border-emerald-500 rounded-full clip-path-half" 
                         />
                      </div>
                      <p className="text-[8px] font-black uppercase mt-1 text-slate-400">Match</p>
                   </div>

                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-brand shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {job.type === 'Remote' ? <Globe className="w-10 h-10" /> : <Building2 className="w-10 h-10" />}
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="space-y-1">
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                          <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">{job.title}</h3>
                          {job.isVerified && <div className="p-1 bg-emerald-500 rounded-full text-white"><ShieldCheck className="w-3 h-3" /></div>}
                       </div>
                       <div className="flex items-center justify-center md:justify-start gap-2">
                          <span className="text-xs font-bold text-slate-400">{job.company}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-xs font-bold text-slate-400">{job.location}</span>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 text-[10px] font-black uppercase">
                          <DollarSign className="w-3 h-3 text-emerald-500" /> {job.salary}
                       </div>
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 text-[10px] font-black uppercase">
                          <Clock className="w-3 h-3 text-brand" /> {job.postedAt}
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                       {job.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-[8px] font-black uppercase tracking-widest">{t}</span>)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button 
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                      className={cn(
                        "h-14 px-10 rounded-[28px] text-[10px] font-black uppercase tracking-widest transition-all",
                        appliedJobs.includes(job.id)
                          ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl hover:scale-105 active:scale-95'
                      )}
                     >
                       {appliedJobs.includes(job.id) ? 'Application Sent' : 'Fast Apply'}
                     </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="space-y-6">
           {appliedJobs.length === 0 ? (
             <div className="p-20 text-center bg-white dark:bg-slate-900 rounded-[56px] border-2 border-dashed border-slate-100 dark:border-white/5">
                <History className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Your pipeline is empty</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto font-medium">Apply to the latest opportunities in the resonance ecosystem to track your career growth.</p>
                <button 
                  onClick={() => setView('listings')}
                  className="mt-8 px-10 py-4 bg-brand text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand/20"
                >
                   Discover Roles
                </button>
             </div>
           ) : (
             <div className="space-y-6">
               <div className="flex items-center justify-between px-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Tracking Applications ({appliedJobs.length})</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400">
                     <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Pending</span>
                     <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Verified</span>
                  </div>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {appliedJobs.map(id => {
                    const job = MOCK_JOBS.find(j => j.id === id);
                    if (!job) return null;
                    return (
                      <div key={job.id} className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-white/5 flex items-center justify-between hover:shadow-xl transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                              <CheckCircle2 className="w-7 h-7" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="font-black italic text-lg leading-none uppercase tracking-tighter">{job.title}</h4>
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{job.company} • Submitted: Feb 26, 2026</p>
                           </div>
                        </div>
                        <div className="text-right space-y-2">
                           <span className="px-4 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-black rounded-full uppercase tracking-widest">Awaiting Review</span>
                           <p className="text-[8px] font-black uppercase text-slate-400">Next step: Initial Screening</p>
                        </div>
                      </div>
                    );
                  })}
               </div>
             </div>
           )}
        </div>
      )}

      {/* Career Evolution CTA */}
      <section className="bg-slate-900 rounded-[56px] p-16 text-center space-y-8 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-color)_0%,_transparent_70%)] opacity-20" style={{ '--brand-color': '#10b981' } as any} />
         <div className="relative z-10 space-y-4">
            <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Accelerate Your <span className="text-brand">Evolution.</span></h3>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Join 15,000+ professionals using automated agents to match with high-performing startups and government projects.</p>
         </div>
         <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-12 py-5 bg-white text-slate-950 rounded-[28px] font-black text-sm uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl">Create Talent Profile</button>
            <button className="px-12 py-5 bg-white/10 text-white border border-white/20 rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2 italic">
               <Info className="w-4 h-4" /> Ecosystem Stats
            </button>
         </div>
      </section>
    </div>
  );
}
