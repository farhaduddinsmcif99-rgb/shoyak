import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Zap, Target, ArrowRight, Star } from 'lucide-react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

export default function StudentLanding() {
  return (
    <div className="space-y-12 pb-20">
      <SEO 
        title="AI Job Tracker for Students in Bangladesh" 
        description="Master your career path with AI-powered resume building, skill gap analysis, and hyper-local job matching designed for Bangladeshi graduates."
        keywords="Student AI, Bangladesh Job Tracker, AI Resume Builder BD, Career Path Bangladesh, Internship Finder BD"
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-indigo-900 rounded-[56px] p-12 md:p-24 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 blur-[140px] -mr-48 -mt-48" />
        <div className="relative z-10 space-y-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-md rounded-full border border-indigo-500/30 font-black text-xs uppercase tracking-widest"
          >
            <GraduationCap className="w-4 h-4" />
            Empowering the Future Workforce
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter"
          >
            Stop Wishing. <br /> <span className="text-indigo-400">Start Building.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-indigo-100/60 font-medium max-w-2xl"
          >
            The job market in Bangladesh is evolving. Shayok.AI uses predictive analytics to show you which skills are trending for Vision 2050 and connects you with the right opportunities today.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/" className="px-8 py-5 bg-white text-indigo-900 rounded-[28px] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/40 hover:scale-105 transition-all">
              Open Job Marketplace
            </Link>
            <button className="px-8 py-5 bg-transparent border-2 border-indigo-500/50 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-indigo-500/10 transition-all">
              Watch Career Guide
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-12 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[64px] space-y-6">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-display">AI Resume Builder</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Upload your draft, and our AI will optimize it for ATS systems used by top companies in Dhaka and globally. Get pointers on missing high-impact keywords.
          </p>
          <ul className="space-y-3">
             {['Tailored for BD Tech Scene', 'Export to PDF/DOC', 'One-Click Apply'].map(item => (
               <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-indigo-400">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  {item}
               </li>
             ))}
          </ul>
        </div>
        <div className="p-12 bg-indigo-600 text-white rounded-[64px] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px]" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display">Skill Gap Analysis</h3>
            <p className="text-indigo-100 font-medium leading-relaxed">
              Our AI analyzes your dream job and lists exactly which courses (many free on Coursera/YouTube) you need to bridge the gap.
            </p>
            <div className="mt-8 pt-8 border-t border-white/10">
               <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Popular Roadmap</p>
                    <p className="text-xl font-bold italic">MERN Developer Path</p>
                  </div>
                  <ArrowRight className="w-6 h-6 animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 rounded-[56px] p-12 md:p-20 flex flex-wrap justify-between items-center gap-12">
         {[
           { val: '5k+', label: 'Active Students' },
           { val: '800+', label: 'Verified Employers' },
           { val: '92%', label: 'Placement Success' },
           { val: '24h', label: 'Response Time' }
         ].map((s, i) => (
           <div key={i} className="text-center space-y-2">
              <p className="text-5xl md:text-7xl font-display text-indigo-600">{s.val}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
           </div>
         ))}
      </section>

      {/* Call to Action */}
      <section className="flex flex-col md:flex-row gap-8 items-center bg-brand/5 dark:bg-brand/10 p-8 rounded-[48px] border-2 border-brand/10">
         <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center text-white shrink-0">
            <Star className="w-10 h-10 fill-white" />
         </div>
         <div className="flex-1 text-center md:text-left space-y-2">
            <h4 className="text-2xl font-display italic">Join the Shayok Elite Student Program</h4>
            <p className="text-sm font-medium text-slate-500">Early access to campus recruitment drives and mentorship sessions.</p>
         </div>
         <button className="px-8 py-4 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
            APPLY NOW
         </button>
      </section>
    </div>
  );
}
