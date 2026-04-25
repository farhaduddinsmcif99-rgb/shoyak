import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Sparkles, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlogPost = ({ title, date, author, category, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bento-card p-10 flex flex-col gap-6 group hover:translate-y-[-4px] transition-all"
  >
    <div className="flex items-center gap-3">
       <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">{category}</span>
       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Calendar className="w-3 h-3" /> {date}
       </div>
    </div>
    <div className="space-y-3 flex-1">
       <h3 className="text-3xl font-display group-hover:text-brand transition-colors leading-tight">{title}</h3>
       <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{author}</span>
       </div>
       <ArrowRight className="w-5 h-5 text-brand group-hover:translate-x-2 transition-transform" />
    </div>
  </motion.div>
);

export default function Blog() {
  return (
    <div className="space-y-16 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700 pt-10">
      <SEO 
        title="Shoyakai Blog | Advanced AI Insights & Productivity Guides" 
        description="Stay ahead with Shoyakai's guide to AI productivity. Discover how Shoyaki AI is transforming workflows in Bangladesh and globally through expert insights and tutorials."
        keywords="productivity blog, AI guides, Shoyakai news, Shoyaki AI tutorial, digital productivity Bangladesh, future of AI tools"
        type="WebPage"
        schemaData={{
          "@type": "Blog",
          "name": "Shoyakai AI Productivity Blog",
          "description": "Expert insights into AI, digital tools, and personal productivity.",
          "author": {
            "@type": "Organization",
            "name": "Shoyakai Labs"
          }
        }}
      />

      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
           <BookOpen className="w-3.5 h-3.5 text-brand" />
           <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Our Journal</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display italic leading-none tracking-tighter">Insights for a <br /> <span className="text-brand">More Productive</span> life.</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
         <BlogPost 
           category="Productivity"
           date="April 24, 2026"
           author="Shoyakai Team"
           title="Top Free Online Tools in 2026"
           desc="Discover the essential web applications that every professional and student should have in their digital toolkit this year."
           delay={0.1}
         />
         <BlogPost 
           category="Guide"
           date="April 22, 2026"
           author="Admin"
           title="How to use online tools for maximum productivity"
           desc="Learn the workflows that elite performers use to automate their daily tasks using simple web-based utilities."
           delay={0.2}
         />
         <BlogPost 
           category="Education"
           date="April 20, 2026"
           author="Rahim Ahmed"
           title="Best browser tools for students in Bangladesh"
           desc="From quick citation generators to PDF converters, we rank the best free tools tailored for the Bangladeshi education system."
           delay={0.3}
         />
         <div className="bento-card p-10 bg-slate-900 text-white flex flex-col justify-center items-center text-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[80px] rounded-full" />
            <h3 className="text-3xl font-display italic relative z-10">Subscribe to our Newsletter</h3>
            <p className="text-slate-400 font-medium relative z-10 max-w-xs">Get the latest tools and tips delivered straight to your inbox.</p>
            <div className="w-full max-w-md relative z-10">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand"
               />
               <button className="absolute right-2 top-2 bottom-2 px-6 bg-brand text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Join</button>
            </div>
         </div>
      </div>
    </div>
  );
}
