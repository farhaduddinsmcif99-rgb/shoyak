import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { 
  ArrowRight, Zap, Globe, 
  Sparkles, ChevronRight, 
  ImageIcon, Code2, Layout,
  Fingerprint, MessageCircle, Star, Search, Wand2, Terminal, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

const MonicaBentoCard = ({ title, desc, icon: Icon, color, delay, span = "col-span-1", image }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8 }}
    className={`${span} bento-card p-8 flex flex-col gap-6 group`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
      <Icon className={`w-7 h-7 ${color}`} />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-display font-bold group-hover:text-brand transition-colors tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
        {desc}
      </p>
    </div>
    
    {image && (
      <div className="mt-4 rounded-xl overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 aspect-video relative group-hover:shadow-2xl transition-all">
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
         <div className="h-full w-full flex items-center justify-center text-slate-300 dark:text-slate-700">
            <Layers className="w-12 h-12" />
         </div>
      </div>
    )}

    <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
      Explore Feature <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const AISidebarMockup = () => (
  <div className="w-full h-full glass rounded-[40px] border border-white/30 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col bg-white/40 dark:bg-slate-900/40">
    <div className="h-14 border-b border-white/20 dark:border-white/5 flex items-center justify-between px-6 bg-white/20 dark:bg-white/5">
       <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
       </div>
       <div className="flex items-center gap-4">
          <div className="h-2 w-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="w-6 h-6 rounded-full bg-brand/20 border border-brand/30" />
       </div>
    </div>
    <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
       {[
         { type: 'user', text: 'Can you summarize this page for me?' },
         { type: 'ai', text: 'Of course! This is Shoyakai (often called Shoyaki AI), a versatile productivity platform. It offers a suite of AI assistants, image processing tools, and text utilities built for maximum efficiency.' },
         { type: 'user', text: 'Sounds great. How do I start?' }
       ].map((msg, idx) => (
         <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
              msg.type === 'user' 
                ? 'bg-brand text-white rounded-br-none shadow-lg shadow-brand/20' 
                : 'bg-white/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-white/40 dark:border-white/5 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
         </div>
       ))}

       <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Wand2, label: 'Rewrite' },
            { icon: Search, label: 'Analyze' },
            { icon: ImageIcon, label: 'Upscale' },
            { icon: Terminal, label: 'Code' }
          ].map((tool, i) => (
            <div key={i} className="p-3 glass rounded-2xl border border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-brand/10 hover:border-brand/30 transition-all cursor-pointer group">
               <tool.icon className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white">{tool.label}</span>
            </div>
          ))}
       </div>

       <div className="p-4 bg-gradient-to-r from-brand/20 to-blue-500/20 rounded-2xl border border-brand/20 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-brand animate-pulse" />
          <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">New: GPT-4o Integration is now active.</p>
       </div>
    </div>
    
    <div className="p-4 border-t border-white/20 dark:border-white/5 bg-white/20 dark:bg-white/5">
       <div className="h-12 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-white/40 dark:border-white/5 flex items-center px-4 justify-between group cursor-text">
          <span className="text-xs text-slate-400 font-medium">Ask Shoyakai anything...</span>
          <ArrowRight className="w-4 h-4 text-brand" />
       </div>
    </div>
  </div>
);

const LogoTicker = () => (
  <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll py-4">
      {[ 'OpenAI', 'Anthropic', 'Meta', 'Google', 'Mistral', 'NVIDIA', 'Cohere', 'Vercel' ].map((logo) => (
        <li key={logo} className="text-2xl font-display font-black tracking-tighter text-slate-300 dark:text-slate-700 hover:text-brand transition-colors uppercase whitespace-nowrap">
           {logo}
        </li>
      ))}
    </ul>
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll py-4" aria-hidden="true">
      {[ 'OpenAI', 'Anthropic', 'Meta', 'Google', 'Mistral', 'NVIDIA', 'Cohere', 'Vercel' ].map((logo) => (
        <li key={logo + "_copy"} className="text-2xl font-display font-black tracking-tighter text-slate-300 dark:text-slate-700 hover:text-brand transition-colors uppercase whitespace-nowrap">
           {logo}
        </li>
      ))}
    </ul>
  </div>
);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="bg-surface dark:bg-surface-dark overflow-hidden selection:bg-brand/30">
      <SEO 
        title="Shoyakai – Premium All-in-One AI Productivity Platform" 
        description="Experience the future of productivity with Shoyakai. A unified suite of AI assistants, text utilities, and visual tools designed for professional workflows."
        keywords="AI assistant, productivity tools, online tools, Shoyakai, GPT-4 productivity, free web apps"
      />

      {/* Floating Header */}
      <nav className="fixed top-6 inset-x-0 z-[100] px-6">
        <div className="max-w-7xl mx-auto glass h-16 rounded-[24px] flex items-center justify-between px-8 border border-white/30 dark:border-white/10 shadow-xl shadow-black/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl">
           <Link to="/" className="group">
              <Logo size="md" />
           </Link>
           
           <div className="hidden md:flex items-center gap-10">
              {[
                { name: 'Tools', path: '/tools-list' },
                { name: 'Pricing', path: '/login' },
                { name: 'Blog', path: '/blog' }
              ].map((item) => (
                <Link key={item.name} to={item.path} className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-brand transition-colors">
                  {item.name}
                </Link>
              ))}
           </div>

           <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand transition-colors">
                 Sign In
              </Link>
              <Link to="/login" className="px-6 py-2.5 grad-brand text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand/20">
                 Try Free
              </Link>
           </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <header className="relative min-h-screen pt-32 lg:pt-0 flex items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20 lg:py-0">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="space-y-10"
           >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-brand/20 text-brand text-[9px] font-black uppercase tracking-widest bg-brand/5">
                 <Sparkles className="w-3.5 h-3.5" /> 
                 Powered by Gemini 1.5 Pro & Claude 3.5 Sonnet
              </div>

              <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-display font-bold leading-[0.9] tracking-tighter text-slate-950 dark:text-white">
                 Your AI <br />
                 <span className="italic text-brand font-light">Powerhouse.</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                 Unite advanced AI models with powerful utility tools. Experience <span className="text-brand font-bold">Shoyaki AI</span>, a versatile dashboard built for maximum efficiency.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                 <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                   Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <Link to="/tools-list" className="w-full sm:w-auto px-10 py-5 glass rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center justify-center gap-3 border border-white/30 hover:bg-white/90">
                    Explore Tools
                 </Link>
              </div>

              <div className="flex items-center gap-8 pt-6 opacity-60">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800" />
                    ))}
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-bold dark:text-white">24,000+ Happy Users</p>
                    <div className="flex gap-1 text-amber-400">
                       {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400" />)}
                    </div>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 50, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="relative aspect-auto lg:aspect-square group"
           >
              <div className="absolute inset-0 grad-brand blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity animate-pulse" />
              <div className="h-[600px] lg:h-full">
                 <AISidebarMockup />
              </div>
              
              <motion.div 
                animate={{ y: [0, -12, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-1/4 glass p-5 rounded-2xl border border-white/40 shadow-2xl z-20 hidden xl:block"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                       <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Generator</p>
                       <p className="text-xs font-bold">Image_Upscale_X4</p>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 12, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-1/4 glass p-5 rounded-2xl border border-white/40 shadow-2xl z-20 hidden xl:block"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                       <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Assistant</p>
                       <p className="text-xs font-bold">Debugging active...</p>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </header>

      {/* Modern Logo Ticker */}
      <section className="py-24 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 overflow-hidden">
         <div className="max-w-7xl mx-auto space-y-12">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted in modern workflows</p>
            <LogoTicker />
         </div>
      </section>

      {/* Professional Bento Grid */}
      <section id="features" className="py-40 px-6 max-w-7xl mx-auto space-y-24">
         <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3">
               <div className="h-[1px] w-12 bg-brand/30" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">The Ecosystem</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-medium tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
               One Suite. <br />
               <span className="italic font-light text-slate-400">Infinite Productivity.</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
               Shoyakai replaces scattered tools with a unified architecture. Every tool is enhanced by frontier AI models for maximum efficiency.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MonicaBentoCard 
              span="md:col-span-2"
              title="Universal AI Assistant"
              desc="A unified interface to interact with GPT-4, Gemini Pro, and Claude. Get summaries, write code, or brainstorm ideas instantly with zero setup time."
              icon={MessageCircle}
              color="text-brand"
              delay={0}
              image={true}
            />
            <MonicaBentoCard 
              title="Visual Suite"
              desc="Advanced image processing. Upscale, remove backgrounds, or generate stunning concepts from simple text descriptions."
              icon={ImageIcon}
              color="text-blue-500"
              delay={0.1}
            />
            <MonicaBentoCard 
              title="SEO Powerhouse"
              desc="Analyze keywords, generate meta-tags, and optimize content structure to rank higher on search engines. Built for creators."
              icon={Globe}
              color="text-amber-500"
              delay={0.2}
            />
            <MonicaBentoCard 
              span="md:col-span-2"
              title="Professional Workspace"
              desc="From PDF conversion to resume building and financial planning. We've built a curated collection of 100+ utilities that just work, every time."
              icon={Layout}
              color="text-brand"
              delay={0.3}
              image={true}
            />
         </div>
      </section>

      {/* Dynamic CTA */}
      <section className="py-40 px-6 relative overflow-hidden bg-slate-900 text-white">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent opacity-40" />
         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-center lg:text-left">
               <h2 className="text-6xl md:text-8xl font-display font-medium tracking-tighter leading-none italic">
                  Think it. <br />
                  <span className="text-brand not-italic">Build it.</span>
               </h2>
               <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Join millions of professionals who have revolutionized their digital workflow with Shoyakai.
               </p>
               <Link to="/login" className="inline-flex items-center gap-6 px-12 py-6 bg-brand text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand/20 hover:scale-110 active:scale-95 transition-all group">
                  Start Your Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
               {[
                 { label: 'Uptime', val: '99.9%' },
                 { label: 'Latency', val: '45ms' },
                 { label: 'Growth', val: '200%' },
                 { label: 'Assisted', val: '24M+' }
               ].map((stat, i) => (
                 <motion.div 
                   key={i} 
                   whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
                   className="p-10 glass rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center gap-3 group text-center"
                 >
                    <p className="text-4xl md:text-5xl font-display font-bold text-white group-hover:text-brand transition-colors">{stat.val}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">{stat.label}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Founder Section */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="space-y-8"
            >
               <div className="inline-flex items-center gap-3">
                  <div className="h-[1px] w-12 bg-brand/30" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">The Architect</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter text-slate-900 dark:text-white leading-none">
                  A Vision for <br />
                  <span className="italic font-light text-brand">Universal Access.</span>
               </h2>
               <div className="space-y-6 text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  <p>
                     Shoyakai was founded by <span className="text-slate-900 dark:text-white font-bold group hover:text-brand cursor-pointer transition-colors">MD Tofiqur Rahaman</span> with a mission to bridge the gap between complex technology and everyday productivity.
                  </p>
                  <p>
                     "My goal is to ensure that no one is left behind in the AI revolution. Whether you're a student, an engineer, or an entrepreneur, Shoyakai (Shoyaki AI) provides the digital tools you need to compete on a global stage."
                  </p>
               </div>
               <div className="pt-8">
                  <Link to="/about" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white hover:text-brand transition-colors">
                     Read the full story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative"
            >
               <div className="absolute inset-0 bg-brand/10 blur-[130px] rounded-full" />
               <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-900 rounded-[60px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl group">
                  <img 
                    src="/founder.png" 
                    alt="MD Tofiqur Rahaman" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                     <p className="text-white font-display font-bold text-3xl tracking-tight">MD Tofiqur Rahaman</p>
                     <p className="text-brand font-black text-[10px] uppercase tracking-[0.4em] mt-2">Founder of Shoyakai</p>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 pt-40 pb-20 px-6 border-t border-slate-100 dark:border-white/5">
         <div className="max-w-7xl mx-auto space-y-40">
            <div className="flex flex-col lg:flex-row justify-between gap-32">
               <div className="space-y-12 max-w-md">
                   <Link to="/" className="group">
                      <Logo size="lg" />
                  </Link>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Designed for creators, engineers, and digital explorers. We're building the future of the web, one tool at a time.
                  </p>
                  <div className="flex gap-6">
                     {[Twitter, Linkedin, Instagram, MessageCircle].map((Icon, i) => (
                       <a key={i} href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand transition-all border border-white/20 hover:scale-110 active:scale-95">
                          <Icon className="w-6 h-6" />
                       </a>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32">
                  {[
                    { label: 'Platform', links: [{ n: 'All Tools', p: '/tools-list' }, { n: 'AI Search', p: '/assistant' }, { n: 'Workbench', p: '/tools' }] },
                    { label: 'Ecosystem', links: [{ n: 'Resources', p: '/blog' }, { n: 'Sitemap', p: '/sitemap' }, { n: 'Support', p: '/about' }] },
                    { label: 'Legal', links: [{ n: 'Privacy', p: '/about' }, { n: 'Terms', p: '/about' }, { n: 'Security', p: '/about' }] }
                  ].map((col, i) => (
                    <div key={i} className="space-y-10">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white opacity-40">{col.label}</h5>
                       <div className="flex flex-col gap-6">
                          {col.links.map(link => (
                            <Link key={link.n} to={link.p} className="text-sm font-bold text-slate-500 hover:text-brand transition-colors">{link.n}</Link>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between gap-10 items-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Developed by Shoyakai Labs © 2026. Made with passion.</p>
               <div className="flex gap-12">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Services Live</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Registry: Cloudflare-Worker-V3.5</span>
               </div>
            </div>
         </div>
      </footer>
    </main>
  );
}

const Twitter = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Linkedin = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>;
const Instagram = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
