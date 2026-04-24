import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { aiTools } from '../data/tools';
import { 
  Zap, ArrowLeft, ArrowRight, Shield, Globe, 
  Sparkles, CheckCircle2, Star, Clock 
} from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function ToolDetail() {
  const { toolId } = useParams();
  const { lang, isAuthenticated } = useApp();
  
  const tool = aiTools.find(t => t.id === toolId);
  
  if (!tool) {
    return <Navigate to="/tools-list" replace />;
  }

  const name = lang === 'bn' ? tool.name_bn : tool.name_en;
  const description = lang === 'bn' ? tool.description_bn : tool.description_en;

  return (
    <div className="space-y-12 pb-20 pt-10 px-4">
      <SEO 
        title={`${name} – Free Online AI Tool | Shoyakai`}
        description={description}
        keywords={`${name}, free online tool, ai productivity, shoyakai tools`}
      />

      <Link to="/tools-list" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
               <Sparkles className="w-3.5 h-3.5 text-brand" />
               <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">{tool.category}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display italic leading-tight tracking-tighter">
              {name}
            </h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed">
              {description}
            </p>
          </header>

          <div className="bento-card p-10 bg-slate-950 text-white space-y-10 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
             <div className="space-y-6 relative z-10">
                <h2 className="text-3xl font-display italic">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                     { step: "01", title: "Input Data", desc: "Provide your context or text to the AI." },
                     { step: "02", title: "AI Process", desc: "Our models analyze and generate results." },
                     { step: "03", title: "Use Result", desc: "Copy, export, or save your generated content." }
                   ].map(s => (
                     <div key={s.step} className="space-y-2">
                        <span className="text-brand font-black text-sm">{s.step}</span>
                        <h4 className="font-bold">{s.title}</h4>
                        <p className="text-xs text-slate-400 font-medium">{s.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
             <Link to="/login" className="block w-full py-6 bg-brand text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-center shadow-2xl shadow-brand/40 hover:scale-[1.02] transition-all relative z-10">
                Launch {name} Now
             </Link>
          </div>

          <section className="space-y-8">
             <h3 className="text-2xl font-display">Key Features</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Fast execution in seconds",
                  "AI-driven precision",
                  "No credit card required",
                  "Cloud backup available",
                  "Multi-language support",
                  "Professional-grade quality"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/30">
                     <CheckCircle2 className="w-5 h-5 text-brand" />
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8 text-slate-100 italic font-medium">
           <div className="bento-card p-8 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tool Metrics</h4>
              <div className="space-y-4">
                 {[
                   { label: "Usage", val: "High" },
                   { label: "Accuracy", val: "99%" },
                   { label: "Latency", val: "< 2s" },
                   { label: "Stability", val: "100%" }
                 ].map(m => (
                   <div key={m.label} className="flex justify-between items-center bg-slate-100 p-2 text-slate-900 border border-slate-100/10">
                      <span className="text-xs font-bold text-slate-500">{m.label}</span>
                      <span className="text-xs font-black uppercase text-brand">{m.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bento-card p-8 bg-slate-900 text-white space-y-6">
              <h4 className="text-xl font-display">Free Trial</h4>
              <p className="text-xs text-slate-400">Launch this tool for free. No setup required.</p>
              <Link to="/login" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 group hover:bg-brand/20 transition-all">
                 <span className="font-bold">Get Started</span>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </aside>
      </div>
    </div>
  );
}
