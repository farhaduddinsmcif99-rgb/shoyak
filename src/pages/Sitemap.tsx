import React from 'react';
import { Link } from 'react-router-dom';
import { aiTools } from '../data/tools';
import { Network, ArrowRight, Zap, BookOpen, User, Info } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const domain = "shoyakai.2com.workers.dev";

export default function Sitemap() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 space-y-16">
      <SEO 
        title="HTML Sitemap – All Tools & Pages"
        description="Explore all Shoyakai features, tools, and blog posts from a single directory. Find everything you need for productivity."
        url={`https://${domain}/sitemap`}
      />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 text-brand font-black text-[10px] uppercase tracking-widest">
           <Network className="w-4 h-4" /> Index
        </div>
        <h1 className="text-5xl font-display italic tracking-tighter">Site Directory</h1>
        <p className="text-xl text-slate-500 font-medium">A complete map of Shoyakai's ecosystem.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Core Pages */}
        <section className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Main Sections
          </h2>
          <div className="space-y-4">
            {[
              { path: "/", label: "Homepage", icon: Info },
              { path: "/tools-list", label: "Tools Directory", icon: Zap },
              { path: "/blog", label: "Productivity Blog", icon: BookOpen },
              { path: "/about", label: "About Shoyakai", icon: User },
            ].map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className="group flex items-center justify-between p-4 glass rounded-2xl border border-white/20 hover:border-brand/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-brand/10 transition-colors">
                    <link.icon className="w-4 h-4 text-slate-500 group-hover:text-brand" />
                  </div>
                  <span className="font-bold text-slate-700">{link.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        {/* AI Tools */}
        <section className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Interactive Tools
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {aiTools.map(tool => (
              <Link 
                key={tool.id} 
                to={`/tools/${tool.id}`}
                className="text-sm font-medium text-slate-600 hover:text-brand hover:underline flex items-center gap-2 py-1 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                {tool.name_en}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <footer className="pt-12 border-t border-slate-100">
         <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">
            Last Updated: April 24, 2026
         </p>
      </footer>
    </div>
  );
}
