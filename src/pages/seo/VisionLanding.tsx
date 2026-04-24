import React from 'react';
import { motion } from 'motion/react';
import { Fingerprint, Globe, Shield, Sparkles, ArrowRight, Zap } from 'lucide-react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

export default function VisionLanding() {
  return (
    <div className="space-y-12 pb-20">
      <SEO 
        title="Bangladesh Vision 2050 | Futuristic Life-OS" 
        description="Explore the blueprint for a Smart Bangladesh. Shayok.AI is building the infrastructure for a digital guardian society, empowering every citizen with AI."
        keywords="Vision 2050 Bangladesh, Smart Bangladesh AI, Digital Guardian Life-OS, Futuristic Dhaka, AI Governance BD"
      />
      
      {/* Immersive Hero */}
      <section className="relative overflow-hidden bg-slate-950 rounded-[56px] p-12 md:p-32 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-transparent to-brand/20" />
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[160px] rounded-full" />
        
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/5 backdrop-blur-2xl rounded-[28px] border border-white/10 flex items-center justify-center mx-auto"
          >
            <Fingerprint className="w-10 h-10 text-brand" />
          </motion.div>
          <div className="space-y-4">
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-[10px] font-black uppercase tracking-[0.5em] text-brand"
             >
               Projecting the Next 25 Years
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="text-5xl md:text-9xl font-display leading-[0.8] tracking-tighter"
             >
               Towards a <br /> <span className="text-white">Smart</span> Society
             </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Vision 2050 isn’t just a date; it’s a standard of living. Shayok.AI is the operating system for this new era, ensuring no citizen is left behind in the global AI revolution.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
             <Link to="/" className="group flex items-center gap-4 px-8 py-5 bg-white text-slate-950 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                Enter the Life-OS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8 p-12 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[64px]">
           <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center">
              <Globe className="w-7 h-7" />
           </div>
           <h3 className="text-4xl font-display">Hyper-Local Connectivity</h3>
           <p className="text-slate-500 font-medium leading-relaxed">
              Every village in Bangladesh will be a digital hub. Shayok.AI bridges the urban-rural divide by providing equal access to global markets and high-tier education through localized AI agents.
           </p>
        </div>
        <div className="space-y-8 p-12 bg-slate-900 text-white rounded-[64px] border-4 border-brand/20">
           <div className="w-14 h-14 bg-white/10 text-brand rounded-2xl flex items-center justify-center">
              <Shield className="w-7 h-7" />
           </div>
           <h3 className="text-4xl font-display text-white">The Digital Guardian</h3>
           <p className="text-slate-400 font-medium leading-relaxed">
              Security and trust are the currency of 2050. Our AI acts as a proactive shield against cyber fraud, misinformation, and digital identity theft, protecting the sovereignty of every citizen.
           </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 space-y-16">
         <div className="text-center space-y-4">
            <h2 className="text-5xl font-display tracking-tighter">The 2050 Timeline</h2>
            <p className="text-slate-500 font-bold max-w-xl mx-auto">Milestones on our journey to a fully integrated Digital Bangladesh.</p>
         </div>
         <div className="relative space-y-12">
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />
            {[
              { year: '2026', title: 'Life-OS Beta Launch', desc: 'Introduction of personalized AI assistants to 1M users.' },
              { year: '2030', title: 'Smart Krishi Network', desc: 'AI-driven agriculture becomes the standard for yield optimization.' },
              { year: '2040', title: 'Carbon Neutral Cities', desc: 'AI managed energy grids across Dhaka and Chittagong.' },
              { year: '2050', title: 'Citizen Sovereignty', desc: 'Complete integration of human-AI collaboration for every citizen.' }
            ].map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="flex-1 md:text-right p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-black text-brand uppercase tracking-widest mb-2">{step.year}</p>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
                 </div>
                 <div className="relative z-10 w-4 h-4 bg-brand rounded-full border-4 border-white dark:border-slate-950 shadow-lg" />
                 <div className="flex-1" />
              </div>
            ))}
         </div>
      </section>

      {/* Interactive Feature */}
      <section className="bg-indigo-600 rounded-[56px] p-12 md:p-20 text-white overflow-hidden relative">
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full border border-white/30 text-[10px] font-black uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Live Prediction
               </div>
               <h2 className="text-5xl md:text-7xl font-display leading-[0.9] tracking-tighter italic">Your 2050 <br /> Starts Today</h2>
               <p className="text-indigo-100 font-medium text-lg leading-relaxed">
                  Analyze your current growth trajectory and see how Shayok.AI can accelerate your personal milestones using our predictive 2050 modeling.
               </p>
               <button className="px-10 py-5 bg-white text-indigo-600 rounded-[28px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                  Open Forecast Model
               </button>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-indigo-400 blur-[80px] opacity-20 group-hover:opacity-40 transition-all" />
               <div className="relative p-8 bg-indigo-500/30 backdrop-blur-3xl rounded-[48px] border border-white/20 space-y-6">
                  <div className="flex justify-between items-center">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60">System Readiness</p>
                     <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="space-y-4">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${60 + i * 10}%` }}
                            className="h-full bg-white"
                          />
                       </div>
                     ))}
                  </div>
                  <p className="text-xs font-bold font-mono opacity-60">OPTIMIZING NEURAL PATHWAYS FOR REGION: DHAKA_METRO</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
