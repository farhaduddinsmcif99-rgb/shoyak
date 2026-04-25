import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Cloud, ShieldCheck, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';

export default function KrishiLanding() {
  return (
    <div className="space-y-12 pb-20">
      <SEO 
        title="Krishi AI: Advanced Agricultural Intelligence for Bangladesh" 
        description="Empowering Bangladeshi farmers with Krishi AI. Get real-time crop disease diagnostics, market price predictions for rice and jute, and localized weather alerts to increase your harvest."
        keywords="Krishi AI, Bangladesh agriculture AI, smart farming BD, crop disease detector, market price prediction Bangladesh, Shoyakai Krishi"
        type="WebPage"
        schemaData={{
          "@type": "WebPage",
          "name": "Krishi AI - Smart Agriculture Bangladesh",
          "description": "AI-driven agricultural intelligence platform for Bangladeshi farmers.",
          "relatedLink": "https://shoyakai.farhaduddinsmcif99.workers.dev/"
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-900 rounded-[56px] p-12 md:p-24 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/30 blur-[140px] -mr-48 -mt-48" />
        <div className="relative z-10 space-y-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30 font-black text-xs uppercase tracking-widest"
          >
            <Sprout className="w-4 h-4" />
            Empowering the Backbone of Bangladesh
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter"
          >
            The Future of <br /> <span className="text-emerald-400">Bangladeshi Krishi</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-emerald-100/60 font-medium max-w-2xl"
          >
            Shayok.AI brings advanced satellite intelligence and deep learning diagnostics to every farm in Bangladesh. Increase yield, reduce pesticide use, and master the market.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/" className="px-8 py-5 bg-white text-emerald-900 rounded-[28px] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/40 hover:scale-105 transition-all">
              Launch Krishi Pro AI
            </Link>
            <button className="px-8 py-5 bg-transparent border-2 border-emerald-500/50 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-emerald-500/10 transition-all">
              Watch Demo Video
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: 'Crop Diagnostics', 
            icon: ShieldCheck, 
            desc: 'Scan leaves with your phone. Our AI identifies 50+ diseases common in Bangladesh (Rice Tungro, Potato Blight, Citrus Canker).',
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
          },
          { 
            title: 'Market Prediction', 
            icon: TrendingUp, 
            desc: 'Know the price of jute, onion, and rice 2 weeks in advance. Beat the middlemen with data-driven selling strategies.',
            color: 'text-brand',
            bg: 'bg-brand/5'
          },
          { 
            title: 'Weather-Smart', 
            icon: Cloud, 
            desc: 'Hyper-local weather alerts for your specific upazila. Get notified of flash floods or droughts before they hit.',
            color: 'text-blue-500',
            bg: 'bg-blue-50'
          }
        ].map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[48px] space-y-6 hover:-translate-y-2 transition-all"
          >
            <div className={`w-16 h-16 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center`}>
              <f.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display">{f.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Content Section */}
      <section className="bg-slate-900 rounded-[56px] p-12 md:p-20 text-white flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-6xl font-display leading-tight tracking-tighter">Why Krishi AI?</h2>
          <div className="space-y-6">
            {[
              "Increase annual yield by up to 35% with precision advice.",
              "Reduce fertilizer costs by 20% using soil data analysis.",
              "Access verified government subsidy links directly.",
              "Connect with local storage facilities in your division."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                <p className="text-lg text-slate-300 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full aspect-square rounded-[40px] overflow-hidden border-8 border-slate-800 shadow-2xl relative bg-slate-800 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-emerald-500/20">
             <Sprout className="w-32 h-32" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Krishi Intelligence Base</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 space-y-8 px-6">
        <h2 className="text-5xl md:text-7xl font-display tracking-tighter">Ready to revolutionize <br /> your harvest?</h2>
        <p className="text-slate-500 font-bold max-w-xl mx-auto">Join over 10,000 farmers in Rajshahi, Rangpur, and beyond who are using Shayok.AI to grow smarter.</p>
        <Link to="/" className="inline-flex items-center gap-3 px-10 py-6 bg-brand text-white rounded-[32px] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand/20">
          Start for Free Now <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
