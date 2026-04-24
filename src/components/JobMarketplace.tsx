import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Briefcase, MapPin, DollarSign, Clock, Search, Filter, 
  ChevronRight, ArrowUpRight, CheckCircle2, History,
  Star, Zap, Building, Building2, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Modern Agricultural Consultant',
    company: 'AgriTech Solutions',
    location: 'Khulna, Bangladesh',
    salary: '৳৩০,০০০ - ৳৪৫,০০০',
    type: 'Local',
    category: 'Agriculture',
    postedAt: '2h ago',
    tags: ['Expert', 'Soil Science']
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
    tags: ['Part-time', 'Bangla']
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
    tags: ['React', 'Tailwind']
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
    tags: ['Full-time', 'Gov-Certified']
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
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-display font-bold italic tracking-tight">
            {lang === 'bn' ? 'জব মার্কেটপ্লেস' : 'Talent Hub'}
          </h2>
          <p className="text-slate-500 font-medium">
            {lang === 'bn' ? 'আপনার দক্ষতা অনুযায়ী সঠিক ক্যারিয়ার খুঁজুন।' : 'Discover opportunities that match your unique skill set.'}
          </p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm self-start">
           <button 
            onClick={() => setView('listings')}
            className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${view === 'listings' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400'}`}
           >
             {lang === 'bn' ? 'চাকরি খুঁজুন' : 'Browse'}
           </button>
           <button 
            onClick={() => setView('history')}
            className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${view === 'history' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400'}`}
           >
             {lang === 'bn' ? 'আবেদনসমূহ' : 'My History'}
           </button>
        </div>
      </header>

      {view === 'listings' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="relative group flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={lang === 'bn' ? 'চাকরি বা কোম্পানি খুঁজুন...' : 'Search roles or companies...'}
                  className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm outline-none focus:border-brand font-medium transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
             </div>
             <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['all', 'Freelance', 'Local', 'Remote'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t as any)}
                    className={`h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap ${
                      filter === t 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bento-card p-6 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand shrink-0">
                    {job.type === 'Remote' ? <Globe className="w-8 h-8" /> : <Building2 className="w-8 h-8" />}
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                       <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{job.title}</h3>
                       <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                         job.type === 'Freelance' ? 'bg-purple-100 text-purple-600' : 
                         job.type === 'Remote' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                       }`}>
                         {job.type}
                       </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-slate-400 text-xs font-medium">
                       <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> {job.company}</span>
                       <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                       <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                       <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.postedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <button 
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                      className={`h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        appliedJobs.includes(job.id)
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
                          : 'bg-brand text-white shadow-lg shadow-brand/20 hover:scale-105 active:scale-95'
                      }`}
                     >
                       {appliedJobs.includes(job.id) ? 'Success' : 'Apply Now'}
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
             <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-700">
                <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">No applications yet</h3>
                <p className="text-slate-400 text-sm mt-2">Start browsing jobs and apply to see your history here.</p>
                <button 
                  onClick={() => setView('listings')}
                  className="mt-6 px-6 py-3 bg-brand text-white rounded-xl text-xs font-bold"
                >
                   Find Jobs
                </button>
             </div>
           ) : (
             <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Applications Sent ({appliedJobs.length})</h3>
               {appliedJobs.map(id => {
                 const job = MOCK_JOBS.find(j => j.id === id);
                 if (!job) return null;
                 return (
                   <div key={job.id} className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl flex items-center justify-center">
                           <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-800 dark:text-slate-100">{job.title}</h4>
                           <p className="text-[10px] font-black uppercase text-slate-400">{job.company} • Applied Feb 24</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full uppercase">Reviewing</span>
                   </div>
                 );
               })}
             </div>
           )}
        </div>
      )}
    </div>
  );
}
