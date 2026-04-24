import React from 'react';
import { motion } from 'motion/react';
import { Fingerprint, Target, Users, Shield, Zap, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const ValueCard = ({ title, desc, icon: Icon }: any) => (
  <div className="bento-card p-10 space-y-6">
    <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
       <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-2">
       <h3 className="text-2xl font-display font-medium">{title}</h3>
       <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function About() {
  return (
    <div className="space-y-20 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEO 
        title="About Shoyakai | Why We Build Free Online Tools" 
        description="Learn about Shoyakai, our mission to democratize productivity through free, fast, and simple online tools and web apps for everyone."
        keywords="about shoyakai, free tools mission, simple web apps story"
      />

      <section className="text-center space-y-8 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
           <Fingerprint className="w-3.5 h-3.5 text-brand" />
           <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Our Story</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-display italic leading-none tracking-tighter max-w-4xl mx-auto">
          Democratizing <br /> <span className="text-brand">Intelligence</span> for All.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
          Shoyakai was born out of a simple observation: the most powerful tools on the internet are often locked behind paywalls or buried in complexity. We are here to change that.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
         <ValueCard 
           icon={Zap}
           title="Fast & Lightweight"
           desc="No more waiting for heavy apps to load. Every Shoyakai tool is optimized for zero latency and instant results."
         />
         <ValueCard 
           icon={Shield}
           title="Privacy First"
           desc="We don't sell your data. Most of our tools process data locally in your browser for maximum security."
         />
         <ValueCard 
           icon={Heart}
           title="Free Forever"
           desc="Our core mission is accessibility. We maintain a robust set of tools that will always remain free for everyone."
         />
      </div>

      <section className="bg-slate-900 rounded-[48px] p-20 text-white text-center space-y-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 blur-[100px] rounded-full" />
         <h2 className="text-4xl md:text-6xl font-display italic relative z-10">Building for the next billion.</h2>
         <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto relative z-10 leading-relaxed">
            Whether you are a student in Dhaka, an entrepreneur in Sylhet, or a creator in Chittagong, Shoyakai is built to empower your journey. We believe simple tools lead to big outcomes.
         </p>
         <div className="flex justify-center items-center gap-12 pt-10 relative z-10">
            <div className="text-center">
               <p className="text-4xl font-display text-brand">2M+</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Users</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
               <p className="text-4xl font-display text-brand">100+</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Tools</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
               <p className="text-4xl font-display text-brand">99.9%</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Uptime</p>
            </div>
         </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-10 text-center">
         <h2 className="text-3xl font-display">Join the Community</h2>
         <p className="text-slate-500 font-medium">Have an idea for a tool? Want to help us grow? Connect with the Shoyakai team on social media or reach out via email.</p>
         <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Contact Us</button>
      </section>
    </div>
  );
}
