import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Briefcase, Search, Filter, MapPin, DollarSign, 
  Clock, ArrowRight, CheckCircle2, Star, Zap,
  Globe, Laptop, Users, Building, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';

interface Job {
  id: string;
  title: string;
  company: string;
  type: 'freelance' | 'local' | 'remote';
  category: string;
  location: string;
  salary: string;
  posted: string;
  urgent: boolean;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Data Entry Operator',
    company: 'Tech Solutions BD',
    type: 'remote',
    category: 'Admin',
    location: 'Dhaka (Remote)',
    salary: '৳15,000 - ৳20,000',
    posted: '2h ago',
    urgent: true
  },
  {
    id: '2',
    title: 'Delivery Rider',
    company: 'FoodExpress',
    type: 'local',
    category: 'Logistics',
    location: 'Khulna City',
    salary: '৳12,000 + Comm',
    posted: '5h ago',
    urgent: false
  },
  {
    id: '3',
    title: 'Boutique Designer',
    company: 'Shajgoj Creations',
    type: 'freelance',
    category: 'Creative',
    location: 'Anywhere',
    salary: '৳5,000 / Project',
    posted: '1d ago',
    urgent: false
  },
  {
    id: '4',
    title: 'Private Tutor (High School)',
    company: 'Home Tuition',
    type: 'local',
    category: 'Education',
    location: 'Mirpur, Dhaka',
    salary: '৳8,000 / Month',
    posted: '3h ago',
    urgent: true
  },
  {
    id: '5',
    title: 'Virtual Assistant',
    company: 'US Client (Upwork)',
    type: 'remote',
    category: 'Freelance',
    location: 'Remote',
    salary: '$5 - $10 / Hour',
    posted: '10h ago',
    urgent: false
  }
];

export default function Jobs() {
  const { lang, t } = useApp();
  const [filter, setFilter] = useState<'all' | 'freelance' | 'local' | 'remote'>('all');
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState<string[]>([]);

  const filteredJobs = mockJobs.filter(job => {
    const matchesFilter = filter === 'all' || job.type === filter;
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                         job.company.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApply = (id: string) => {
    if (applied.includes(id)) return;
    setApplied([...applied, id]);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Jobs & Income – Find Work and Freelance Gigs" 
        description="Browse local jobs, remote data entry tasks, and freelance opportunities in Bangladesh. Start earning with Shayok.AI job board."
        keywords="jobs in Bangladesh, freelance work BD, data entry jobs, earn money online Bangladesh"
        type="WebPage"
      />
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
              Job <span className="text-emerald-500">Market</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real Opportunities for You</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 space-y-6 shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Search</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Sales, Remote..." 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-0 rounded-2xl p-3 pl-10 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Job Type</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'all', label: 'All Jobs', icon: Globe },
                  { id: 'remote', label: 'Remote', icon: Laptop },
                  { id: 'local', label: 'Local', icon: MapPin },
                  { id: 'freelance', label: 'Freelance', icon: Users },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id as any)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold transition-all ${
                      filter === cat.id 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4" />
                      {cat.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
               <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Verified Jobs</span>
               </div>
               <p className="text-[10px] text-emerald-600/70 leading-tight">Every job on Shayok is manually verified to prevent scams.</p>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Showing {filteredJobs.length} Results
            </h3>
            <div className="flex gap-2">
               <button className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400"><Filter className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex flex-1 gap-5">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                      <Building className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">{job.title}</h4>
                        {job.urgent && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[8px] font-black rounded-full uppercase">Urgent</span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
                        {job.company} • <Clock className="w-3 h-3" /> {job.posted}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                         <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 rounded-lg flex items-center gap-1 capitalize">
                           <MapPin className="w-3 h-3" /> {job.location}
                         </span>
                         <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-[10px] font-bold text-emerald-600 rounded-lg flex items-center gap-1">
                           <DollarSign className="w-3 h-3" /> {job.salary}
                         </span>
                         <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-[10px] font-bold text-blue-600 rounded-lg uppercase tracking-tighter">
                           {job.type}
                         </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {applied.includes(job.id) ? (
                      <div className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> APPLIED
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleApply(job.id); }}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 group-hover:scale-105 transition-all"
                      >
                        APPLY NOW <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-300 hover:text-amber-500 rounded-2xl transition-colors">
                       <Star className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>

      <div className="p-8 bg-slate-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 mt-12 relative overflow-hidden">
         <Zap className="absolute -right-10 -bottom-10 w-48 h-48 text-emerald-500/10 rotate-12" />
         <div className="space-y-4 max-w-lg">
            <h2 className="text-3xl font-black tracking-tight leading-none">Become a <span className="text-emerald-400 underline decoration-wavy underline-offset-8">Freelancer Today</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed">Join our Shayok Talent network and get premium remote jobs from top companies. We provide training and verified payment guarantee.</p>
            <button className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">JOIN TALENT NETWORK</button>
         </div>
         <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 text-center">
               <h4 className="text-2xl font-black text-emerald-400">12k+</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Jobs</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 text-center">
               <h4 className="text-2xl font-black text-emerald-400">৳2M+</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Earned Daily</p>
            </div>
         </div>
      </div>
    </div>
  );
}
