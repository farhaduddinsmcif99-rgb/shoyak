import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Zap, Globe, 
  Sparkles, ChevronRight, 
  ImageIcon, Code2, Layout,
  Fingerprint, MessageCircle, Star, Search, Wand2, Terminal, Layers,
  Sprout, Rocket, ShieldCheck, Heart, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import { cn } from '../utils/helpers';

const MonicaBentoCard = ({ title, desc, icon: Icon, color, delay, span = "col-span-1", image }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -12, scale: 1.02 }}
    className={cn(
      span,
      "bento-card p-10 flex flex-col gap-8 group backdrop-blur-3xl border border-slate-100 dark:border-white/5 relative overflow-hidden"
    )}
  >
    <div className={cn("inline-flex w-16 h-16 rounded-3xl items-center justify-center transition-all duration-700 group-hover:rotate-[360deg]", color, "bg-opacity-5 dark:bg-opacity-20")}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="space-y-4 relative z-10">
      <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none group-hover:text-brand transition-colors">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm max-w-xs">
        {desc}
      </p>
    </div>
    
    {image && (
      <div className="mt-4 rounded-[32px] overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 aspect-video relative group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all">
         <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="h-full w-full flex items-center justify-center text-slate-100 dark:text-slate-800">
            <Layers className="w-20 h-20" />
         </div>
      </div>
    )}

    <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
      Launch Module <ArrowUpRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const AISidebarMockup = () => (
  <div className="w-full h-full glass rounded-[64px] border border-white/40 dark:border-white/10 shadow-[0_80px_160px_-20px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col bg-white/40 dark:bg-slate-900/60 backdrop-blur-3xl relative">
    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-blue-500/5 pointer-events-none" />
    <div className="h-20 border-b border-white/20 dark:border-white/5 flex items-center justify-between px-10 bg-white/30 dark:bg-black/20">
       <div className="flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-red-400/30" />
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400/30" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-400/30" />
       </div>
       <div className="flex items-center gap-4">
          <div className="h-3 w-16 bg-slate-200/50 dark:bg-slate-700/50 rounded-full" />
          <div className="w-8 h-8 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center">
             <Logo size="sm" iconOnly />
          </div>
       </div>
    </div>
    
    <div className="flex-1 p-10 space-y-8 overflow-y-auto no-scrollbar">
       <div className="space-y-4">
          <div className="p-6 bg-brand text-white rounded-[32px] rounded-br-none shadow-2xl shadow-brand/20 max-w-[90%] float-right scale-in-center">
             <p className="text-sm font-black italic tracking-tight uppercase">Analyze current agri-shock trends in Bangladesh for 2026.</p>
          </div>
          <div className="clear-both" />
          <div className="p-8 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white rounded-[40px] rounded-bl-none border border-white/40 dark:border-white/5 shadow-xl max-w-[90%] slide-in-bottom">
             <p className="text-sm font-medium leading-relaxed italic">"Simulating 2026 Fuel Scarcity... Data indicates Northern districts (Rangpur, Bogura) face 40% higher diesel volatility. Shoyakai is auto-buffering irrigation maps for localized resilience."</p>
          </div>
       </div>

       <div className="grid grid-cols-4 gap-4">
          {[Wand2, Search, ImageIcon, Terminal].map((I, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="aspect-square bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 hover:text-brand shadow-sm transition-all cursor-pointer"
            >
               <I className="w-6 h-6" />
            </motion.div>
          ))}
       </div>

       <div className="p-6 bg-slate-950 rounded-[32px] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Ecosystem Online</span>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs font-bold text-slate-400">GPT-4.0-Resonance model activated. Listening for systemic shifts...</p>
       </div>
    </div>
    
    <div className="p-10 border-t border-white/20 dark:border-white/5">
       <div className="h-16 bg-white dark:bg-slate-800 rounded-3xl border border-white/40 dark:border-white/10 flex items-center px-6 justify-between group cursor-text shadow-inner">
          <span className="text-sm text-slate-400 font-medium italic">Ask Shoyakai anything...</span>
          <ArrowRight className="w-5 h-5 text-brand group-hover:translate-x-1 transition-transform" />
       </div>
    </div>
  </div>
);

const LogoTicker = () => (
  <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll py-8">
      {[ 'OpenAI', 'Anthropic', 'Gemini', 'Google', 'Meta', 'NVIDIA', 'Vercel', 'Cloudflare' ].map((logo) => (
        <li key={logo} className="text-3xl font-display font-black tracking-tighter text-slate-300 dark:text-slate-800 hover:text-brand transition-all duration-500 uppercase whitespace-nowrap cursor-pointer hover:scale-110">
           {logo}
        </li>
      ))}
    </ul>
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll py-8" aria-hidden="true">
      {[ 'OpenAI', 'Anthropic', 'Gemini', 'Google', 'Meta', 'NVIDIA', 'Vercel', 'Cloudflare' ].map((logo) => (
        <li key={logo + "_copy"} className="text-3xl font-display font-black tracking-tighter text-slate-300 dark:text-slate-800 hover:text-brand transition-all duration-500 uppercase whitespace-nowrap cursor-pointer hover:scale-110">
           {logo}
        </li>
      ))}
    </ul>
  </div>
);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -100]));
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.9]));

  return (
    <main ref={containerRef} className="bg-surface dark:bg-surface-dark overflow-hidden selection:bg-brand/30 perspective-[2000px]">
      <SEO 
        title="Shoyakai – Premium All-in-One AI Productivity Platform" 
        description="Experience 2026 Resilience Intelligence. AI-powered Agriculture, Entrepreneurship, and Professional Tools tailored for Bangladesh."
        url="https://shoyakai.2com.workers.dev/"
      />

      <nav className="fixed top-8 inset-x-0 z-[100] px-6">
        <div className="max-w-6xl mx-auto glass h-20 rounded-[32px] flex items-center justify-between px-10 border border-white/30 dark:border-white/10 shadow-2xl shadow-black/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl">
           <Link to="/" className="group flex items-center gap-2">
              <Logo size="md" />
           </Link>
           
           <div className="hidden lg:flex items-center gap-12">
              {[
                { name: 'Ecosystem', path: '/hub' },
                { name: 'Agriculture', path: '/agriculture' },
                { name: 'Tools', path: '/tools-list' },
                { name: 'Blog', path: '/blog' }
              ].map((item) => (
                <Link key={item.name} to={item.path} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-brand transition-all relative group">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand transition-all group-hover:w-full" />
                </Link>
              ))}
           </div>

           <div className="flex items-center gap-6">
              <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-brand transition-all">
                 Vault
              </Link>
              <Link to="/login" className="px-8 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl shadow-brand/20 flex items-center gap-2">
                 Join Shoyakai <Zap className="w-3.5 h-3.5 fill-current" />
              </Link>
           </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center pt-40 lg:pt-20 relative z-10">
           <motion.div style={{ y: heroY, scale: heroScale }} className="space-y-12">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white text-[10px] font-black uppercase tracking-[0.3em]"
                >
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   Ecosystem v2.6 Ready
                </motion.div>

                <h1 className="text-[clamp(4rem,9vw,8rem)] font-display font-black leading-[0.8] tracking-tighter text-slate-950 dark:text-white">
                   Impact <br />
                   <span className="italic font-light text-brand/80">Intelligence.</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                   Unite 100+ professional tools with 2026 Crisis Resilience models. 
                   <span className="text-brand font-black italic"> Shoyakai </span> is the terminal for high-velocity work.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                 <Link to="/login" className="w-full sm:w-auto px-12 py-6 bg-brand text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden">
                    <span className="relative z-10">Initialize Shoyakai</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                 </Link>
                 <Link to="/hub" className="w-full sm:w-auto px-12 py-6 glass rounded-3xl font-black text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-white flex items-center justify-center gap-3 border border-white/40 hover:bg-white/90 group transition-all">
                    System Map
                 </Link>
              </div>

              <div className="flex items-center gap-10 pt-10 border-t border-slate-100 dark:border-white/5">
                 <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-900 overflow-hidden shadow-xl">
                         <img src={`https://i.pravatar.cc/150?u=${i*10}`} alt="User" />
                      </div>
                    ))}
                 </div>
                 <div className="space-y-1">
                    <div className="flex gap-1 text-amber-500">
                       {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-[10px] font-black uppercase dark:text-white tracking-widest opacity-60 italic">Used by 42k+ Professionals</p>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, rotateX: 20, y: 100 }}
             animate={{ opacity: 1, rotateX: 0, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative lg:h-[800px] group perspective-[2000px]"
           >
              <div className="absolute inset-0 bg-brand/10 blur-[160px] rounded-full group-hover:scale-125 transition-all duration-1000" />
              <motion.div 
                style={{
                  rotateX: useSpring(useTransform(scrollYProgress, [0, 0.1], [0, 15])),
                  rotateY: useSpring(useTransform(scrollYProgress, [0, 0.1], [0, -10])),
                  scale: useSpring(useTransform(scrollYProgress, [0, 0.1], [1, 0.9])),
                }}
                className="h-full"
              >
                 <AISidebarMockup />
              </motion.div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-16 top-1/3 glass p-6 rounded-[34px] border border-white/50 shadow-2xl z-20 hidden xl:flex items-center gap-5 bg-white/40 backdrop-blur-2xl"
              >
                 <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Sprout className="w-8 h-8" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 italic">Krishi AI</p>
                    <p className="text-sm font-black italic tracking-tighter">Yield Optimization: 98%</p>
                 </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 bottom-1/3 glass p-6 rounded-[34px] border border-white/50 shadow-2xl z-20 hidden xl:flex items-center gap-5 bg-white/40 backdrop-blur-2xl"
              >
                 <div className="w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                    <Rocket className="w-8 h-8" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 italic">Entrepreneur Hub</p>
                    <p className="text-sm font-black italic tracking-tighter">ROI Forecast: Positive</p>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </header>

      <section className="py-24 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
         <div className="max-w-7xl mx-auto space-y-16">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Trusted in Frontier Workflows</h3>
            <LogoTicker />
         </div>
      </section>

      {/* 2026 Resilience Section - NEW */}
      <section className="py-40 px-6 max-w-7xl mx-auto space-y-32">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-3">
                  <div className="h-[2px] w-16 bg-brand/30" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand italic">Resilience v2.6</span>
               </div>
               <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] uppercase italic text-slate-900 dark:text-white">
                  Built for <br/><span className="text-brand">Impact.</span>
               </h2>
               <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                  Solving the critical challenges of 2026. From irrigation fuel crises to entrepreneurial funding gaps in Bangladesh.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  {[
                    { t: 'Fuel Optimization', d: 'Solving the 2026 diesel crisis.' },
                    { t: 'Regu-Paperwork', d: 'Automating SME compliance.' },
                    { t: 'Market Advisor', d: 'Real-time B2B mandi tracking.' },
                    { t: 'Risk Shield', d: 'Climate-driven insurance claims.' }
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-slate-100 dark:border-white/5 group hover:border-brand/40 transition-all">
                       <ShieldCheck className="w-5 h-5 text-emerald-500 group-hover:scale-125 transition-transform" />
                       <div>
                          <p className="text-xs font-black uppercase italic tracking-tighter">{f.t}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{f.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative group">
               <div className="absolute inset-0 bg-brand/10 blur-[140px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
               <motion.div 
                whileHover={{ y: -20, rotateX: 5, rotateY: -5 }}
                className="relative aspect-square bg-slate-950 rounded-[80px] p-12 overflow-hidden border border-white/10 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)]"
               >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-20" />
                  <div className="h-full flex flex-col justify-between relative z-10">
                     <div className="flex justify-between items-start">
                        <div className="w-16 h-16 bg-brand rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-brand/20">
                           <Rocket className="w-8 h-8" />
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black uppercase tracking-widest text-brand">System: ONLINE</p>
                           <p className="text-2xl font-black italic tracking-tighter text-white uppercase">Active Engine</p>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: '84%' }} className="h-full bg-brand" />
                        </div>
                        <div className="flex justify-between text-white">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase opacity-40">Resilience Index</p>
                              <p className="text-4xl font-black italic">84/100</p>
                           </div>
                           <div className="space-y-1 text-right">
                              <p className="text-[10px] font-black uppercase opacity-40">Active Nodes</p>
                              <p className="text-4xl font-black italic">12k+</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      <section className="py-40 px-6 max-w-7xl mx-auto space-y-24">
         <div className="text-center space-y-8">
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic text-slate-900 dark:text-white leading-none">
               One Suite. <br />
               <span className="text-slate-400 font-light not-italic">Infinite Power.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto italic">Everything you need to compete on a global stage, from Dhaka to the world.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MonicaBentoCard 
              span="md:col-span-2"
              title="Hyper-Assistant"
              desc="A unified interface to GPT-4o, Claude 3.5, and Gemini 1.5. Analyze complex local legislation or global market reports instantly."
              icon={MessageCircle}
              color="text-brand"
              delay={0}
              image={true}
            />
            <MonicaBentoCard 
              title="Krishi AI 2026"
              desc="The vanguard for our farmers. Solving irrigation crises and input optimizations with precision satellite intelligence."
              icon={Sprout}
              color="text-emerald-500"
              delay={0.1}
            />
            <MonicaBentoCard 
              title="Entrepreneur Hub"
              desc="The venture OS for Bangladesh. Funding matchers, regulatory simplifiers, and local synergetics."
              icon={Rocket}
              color="text-blue-500"
              delay={0.2}
            />
            <MonicaBentoCard 
              span="md:col-span-2"
              title="100+ Pro Utilities"
              desc="Resume builders, PDF processors, data visualizations, and legal document templates. Professional efficiency, reimagined."
              icon={Layout}
              color="text-amber-500"
              delay={0.3}
              image={true}
            />
         </div>
      </section>

      {/* Extreme CTA */}
      <section className="py-40 px-6 relative overflow-hidden bg-slate-950 text-white">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-color)_0%,_transparent_70%)] opacity-30 animate-pulse" style={{ '--brand-color': '#10b981' } as any} />
         <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-12">
            <h2 className="text-[clamp(3.5rem,8vw,10rem)] font-display font-black leading-[0.8] tracking-tighter uppercase italic">
               The Future <br/> Is <span className="text-brand">Shoyakai.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl italic leading-relaxed">
               Join 42,000+ visionaries who are using intelligence to reshape their reality. The first ecosystem built for 2026 Resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link to="/login" className="px-16 py-7 bg-white text-slate-950 rounded-[40px] font-black text-sm uppercase tracking-[0.5em] shadow-[0_40px_80px_-15px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all">Launch System</Link>
               <Link to="/about" className="px-16 py-7 bg-white/10 text-white border border-white/20 rounded-[40px] font-black text-sm uppercase tracking-[0.5em] hover:bg-white/20 transition-all flex items-center gap-4">
                  The Blueprint <ArrowUpRight className="w-5 h-5" />
               </Link>
            </div>
         </div>
      </section>

      <footer className="bg-slate-50 dark:bg-slate-950 pt-40 pb-20 px-6 border-t border-slate-100 dark:border-white/5">
         <div className="max-w-7xl mx-auto space-y-40">
            <div className="flex flex-col lg:flex-row justify-between gap-32">
               <div className="space-y-12 max-w-md">
                   <Link to="/" className="group">
                      <Logo size="lg" />
                   </Link>
                   <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                     Architecting 2026 Resilience. Shoyakai Intelligence is a global-first platform optimized for local emerging economies.
                   </p>
                   <div className="flex gap-6">
                      {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                        <a key={i} href="#" className="w-14 h-14 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center text-slate-400 hover:text-brand transition-all border border-slate-100 dark:border-white/5 shadow-sm group">
                           <Icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                        </a>
                      ))}
                   </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32">
                  {[
                    { label: 'Intelligence', links: [{ n: 'Agri Shield', p: '/agriculture' }, { n: 'Startup Hub', p: '/hub' }, { n: 'Talent Rail', p: '/jobs' }] },
                    { label: 'Ecosystem', links: [{ n: 'All Tools', p: '/tools-list' }, { n: 'Shayok Blog', p: '/blog' }, { n: 'Sitemap', p: '/sitemap' }] },
                    { label: 'Company', links: [{ n: 'Mission', p: '/about' }, { n: 'Security', p: '/about' }, { n: 'Vault', p: '/login' }] }
                  ].map((col, i) => (
                    <div key={i} className="space-y-12">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-white opacity-40 italic">{col.label}</h5>
                       <div className="flex flex-col gap-6">
                          {col.links.map(link => (
                            <Link key={link.n} to={link.p} className="text-sm font-black italic text-slate-500 hover:text-brand transition-colors uppercase tracking-tight">{link.n}</Link>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between gap-10 items-center">
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Developed by Shoyakai Labs © 2026. Dhaka, Bangladesh.</p>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">Global Distribution: https://shoyakai.2com.workers.dev/</p>
               </div>
               <div className="flex gap-12">
                  <div className="flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Systems NOMINAL</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Heart className="w-3 h-3 text-red-500 fill-current" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Enabled</span>
                  </div>
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
