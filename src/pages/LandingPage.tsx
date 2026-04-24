import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, Shield, Zap, Target, Globe, Sprout, 
  Briefcase, Activity, Sparkles, ChevronRight, Play, 
  Users, Award, Cpu, MessageCircle, BarChart3, Fingerprint, Lock, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FeatureCard = ({ title, desc, icon: Icon, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bento-card p-10 flex flex-col gap-8 group"
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-500`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-display group-hover:text-brand transition-colors">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
    <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 transition-opacity">
      Learn More <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-[1px] w-8 bg-brand/30" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">{text}</span>
  </div>
);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="bg-surface dark:bg-surface-dark overflow-hidden">
      <SEO 
        title="Shoyakai – Free Online Tools & Simple Web Apps for Productivity" 
        description="Welcome to Shoyakai: Best free online tools and simple web apps. Fast, lightweight, and designed for daily productivity. No login required for utility tools."
        keywords="free online tools, simple web apps, free web tools, online utility tools, productivity tools online, best free online tools for daily use"
      />

      {/* Persistent Nav - Floating Glass */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass px-8 py-4 rounded-[32px] flex items-center justify-between shadow-2xl shadow-black/10 backdrop-blur-xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 grad-brand rounded-xl flex items-center justify-center rotate-12 shadow-lg">
               <Fingerprint className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter uppercase text-slate-900 dark:text-white">SHOYAKAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { name: 'Tools', path: '/tools-list' },
              { name: 'Blog', path: '/blog' },
              { name: 'About', path: '/about' }
            ].map((item) => (
              <Link key={item.name} to={item.path} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          <Link 
            to="/login" 
            className="px-8 py-3 bg-brand text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand/10 blur-[120px] rounded-full animate-pulse opacity-50" />
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-1000 opacity-50" />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl w-full text-center space-y-12"
        >
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-brand/5 dark:bg-brand/10 text-brand rounded-full border border-brand/20 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
            >
              <Sparkles className="w-4 h-4" /> 
              <span>V3.0 Released: Pro-Grade Productivity</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-[7.5rem] font-display font-medium leading-[0.85] tracking-tighter text-slate-900 dark:text-white"
            >
              The Modern <br /> 
              <span className="italic text-brand font-light">Productivity Suite.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed"
            >
              Welcome to <strong>Shoyakai</strong>, your ultimate destination for <span className="text-slate-900 dark:text-slate-100 italic">free online tools</span> and <span className="text-slate-900 dark:text-slate-100 italic">simple web applications</span>. Built to be fast, lightweight, and accessible, we help millions work smarter every day.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/login" className="w-full sm:w-auto px-12 py-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-[32px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
              Explore All Tools <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-12 py-6 glass rounded-[32px] font-black text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center justify-center gap-3 group border border-white/20">
               Learn Our Vision
            </Link>
          </motion.div>

          {/* Interactive Preview Mock */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="relative pt-12"
          >
             <div className="absolute inset-0 bg-brand/20 blur-[120px] rounded-full scale-75 animate-pulse" />
             <div className="relative glass aspect-[16/9] max-w-5xl mx-auto rounded-[48px] border border-white/30 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent pointer-events-none group-hover:opacity-40 transition-opacity" />
                <div className="h-full w-full flex flex-col">
                   <div className="h-12 w-full bg-white/10 border-b border-white/20 flex items-center px-6 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="ml-4 h-6 w-1/3 bg-white/5 rounded-md border border-white/10" />
                   </div>
                   <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                      <div className="relative w-80 h-80">
                         <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-brand/30 rounded-full" />
                         <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-10 border border-brand/20 rounded-full" />
                         <div className="absolute inset-20 bg-brand/5 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(16,185,129,0.3)] border border-brand/20 ring-1 ring-brand/10 ring-offset-8 ring-offset-transparent">
                            <Fingerprint className="w-20 h-20 text-brand" />
                         </div>
                      </div>

                      {/* Floating Tool Snippets */}
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-20 glass p-4 rounded-2xl border border-white/30 shadow-xl">
                         <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-brand" />
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-slate-100">FAST_OCR_V2</p>
                               <div className="h-1 w-12 bg-brand/50 rounded-full" />
                            </div>
                         </div>
                      </motion.div>
                      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-20 glass p-4 rounded-2xl border border-white/30 shadow-xl">
                         <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-slate-100">AI_EDITOR_PRO</p>
                               <div className="h-1 w-16 bg-blue-400/50 rounded-full" />
                            </div>
                         </div>
                      </motion.div>
                   </div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Social Trust Section */}
      <section className="py-20 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
         <div className="max-w-7xl mx-auto px-6 space-y-12">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Powering Modern Workflows</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
               {['OpenAI', 'Anthropic', 'HuggingFace', 'Vercel', 'Meta'].map(n => (
                 <span key={n} className="text-2xl font-display font-black tracking-tighter dark:text-white uppercase">{n}</span>
               ))}
            </div>
         </div>
      </section>

      {/* Why Choose Shoyakai Section */}
      <section id="tools" className="py-40 px-6 max-w-7xl mx-auto space-y-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
           <div className="space-y-8 max-w-3xl">
              <SectionLabel text="The Infrastructure" />
              <h2 className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter text-slate-900 dark:text-white">Why Shoyakai?</h2>
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                 We've engineered a platform that eliminates the barriers between user intent and digital execution. Our <span className="text-brand italic">free online productivity tools</span> are crafted for speed.
              </p>
           </div>
           <Link to="/tools-list" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-brand hover:gap-6 transition-all group">
              View All 100+ Tools <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bento-card p-12 space-y-12 border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5"
          >
             <div className="space-y-6">
                <h3 className="text-4xl font-display text-slate-900 dark:text-white">Our Core Pillars</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Simple yet powerful benchmarks for every tool we deploy.</p>
             </div>
             <ul className="space-y-8">
                {[
                  { title: "Fast loading tools", desc: "Optimized for speed and zero latency." },
                  { title: "Simple user interface", desc: "Clean design for better focus." },
                  { title: "Free to use", desc: "Accessibility is our primary goal." },
                  { title: "No login requirement", desc: "Start working in seconds." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-5 group">
                     <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-4 h-4 shadow-sm" />
                     </div>
                     <div className="space-y-1">
                        <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                     </div>
                  </li>
                ))}
             </ul>
          </motion.div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
             <FeatureCard 
               title="Popular Utilities" 
               desc="Check out our most used applications: Image compression, PDF tools, and text utilities."
               icon={Sparkles}
               color="text-brand"
               delay={0.1}
             />
             <FeatureCard 
               title="AI Assistants" 
               desc="Advanced language and image models ready to help you with content creation."
               icon={Zap}
               color="text-blue-500"
               delay={0.2}
             />
             <motion.div 
               whileHover={{ y: -5 }} 
               className="sm:col-span-2 bento-card p-12 flex flex-col md:flex-row items-center justify-between gap-10 group bg-slate-950 text-white overflow-hidden relative"
             >
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="space-y-6 relative z-10">
                   <h3 className="text-4xl md:text-5xl font-display italic leading-tight">Ready to boost your <br /> <span className="text-brand">Digital Workflow?</span></h3>
                   <p className="text-slate-400 font-medium max-w-md">Join over 2.4 million users who have switched to Shoyakai for their daily tasks.</p>
                </div>
                <Link to="/login" className="px-10 py-5 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all relative z-10 shrink-0">
                   Get Started Free
                </Link>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="bg-slate-950 py-40 px-6 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-6xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-8">
            <SectionLabel text="The Global Vision" />
            <h2 className="text-6xl md:text-9xl font-display italic leading-none tracking-tighter">
              Innovation for <br /> 
              <span className="text-brand underline decoration-brand/30 decoration-8 underline-offset-8">Everyone</span>.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {[
               { icon: Globe, val: '190+', label: 'Countries Reached', desc: 'Used globally from Dhaka to New York.' },
               { icon: Activity, val: '24/7', label: 'Continuous Service', desc: 'Engineered for high-availability.' },
               { icon: Shield, val: 'Bank-Grade', label: 'Security Standard', desc: 'Your data, your rules. Always.' }
             ].map((stat, i) => (
               <div key={i} className="space-y-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-brand/20 group-hover:border-brand/40 transition-all duration-500">
                     <stat.icon className="w-8 h-8 text-brand" />
                  </div>
                  <div className="space-y-2">
                     <p className="text-5xl font-display font-medium">{stat.val}</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                  </div>
                  <p className="text-slate-400 font-medium leading-relaxed">{stat.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonials (AI Style) */}
      <section className="py-40 px-6 max-w-7xl mx-auto space-y-20">
         <div className="text-center space-y-6">
            <SectionLabel text="The Community" />
            <h2 className="text-5xl font-display text-slate-900 dark:text-white">Trusted by Creators</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { name: "Sarah J.", role: "Digital Artist", text: "Shoyakai's AI tools are literally magic. I save at least 2 hours every day on mundane formatting tasks." },
               { name: "Rahim A.", role: "SME Owner", text: "The transparency and speed are what hooked me. Best free web tools collection I've ever found." },
               { name: "Kevin L.", role: "Student", text: "Actually lightweight. Most web apps feel heavy, but Shoyakai stays fast even on my low-end laptop." }
            ].map((t, i) => (
               <div key={i} className="bento-card p-10 space-y-8 bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex gap-1 text-brand">
                     {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-brand" />)}
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-medium italic">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white uppercase text-xs">{t.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Pricing fallback */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center space-y-12">
         <h2 className="text-5xl md:text-7xl font-display text-slate-900 dark:text-white">Free, And We Mean It.</h2>
         <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            While we offer optional pro tiers for heavy enterprise usage, our core utilities will always be <span className="text-brand font-bold">free online tools</span> for someone starting out. 
         </p>
         <Link to="/login" className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[32px] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all inline-block">
            Create Free Account
         </Link>
      </section>

      {/* FAQ Section */}
      <section className="py-40 px-6 max-w-4xl mx-auto space-y-20 border-t border-slate-100 dark:border-white/5">
         <div className="text-center space-y-6">
            <SectionLabel text="Support" />
            <h2 className="text-5xl font-display text-slate-900 dark:text-white">Frequently Asked Questions</h2>
         </div>
         <div className="space-y-10">
            {[
               { q: "Are the tools really free?", a: "Yes, Shoyakai provides a core suite of free online tools for everyone. We believe in democratizing access to professional utilities." },
               { q: "Do I need to create an account?", a: "You can browse and use many basic tools without an account. However, creating a free account allows you to save history and access advanced AI features." },
               { q: "Is my data secure?", a: "We prioritize privacy. Most of our tools process data locally in your browser, and we never store your personal documents unless you explicitly choose to save them." },
               { q: "Can I suggest a new tool?", a: "Absolutely! We're constantly expanding our catalog based on community feedback. Contact us through the about page." }
            ].map((faq, i) => (
               <div key={i} className="space-y-3">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white italic">Q: {faq.q}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.a}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 py-32 px-6 border-t border-slate-100 dark:border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-32">
               <div className="space-y-12 max-w-md">
                   <div className="flex items-center gap-3">
                    <div className="w-12 h-12 grad-brand rounded-2xl flex items-center justify-center rotate-12 shadow-lg">
                       <Fingerprint className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-display font-black text-3xl tracking-tighter uppercase text-slate-900 dark:text-white">SHOYAKAI</span>
                  </div>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Elevating daily digital experiences through precision tools and simple web applications. The future of productivity is here.
                  </p>
                  <div className="flex gap-8">
                     {[Twitter, Linkedin, Instagram, MessageCircle].map((Icon, i) => (
                       <a key={i} href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand transition-all border border-white/20 hover:scale-110 active:scale-95">
                          <Icon className="w-6 h-6" />
                       </a>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                  {[
                    { label: 'Platform', links: [{ n: 'All Tools', p: '/tools-list' }, { n: 'AI Assistant', p: '/assistant' }, { n: 'Digital Toolbox', p: '/tools' }] },
                    { label: 'Resources', links: [{ n: 'Blog', p: '/blog' }, { n: 'Mission', p: '/about' }, { n: 'Sitemap', p: '/sitemap' }, { n: 'Krishi AI', p: '/future/krishi' }] },
                    { label: 'Company', links: [{ n: 'About Us', p: '/about' }, { n: 'Careers', p: '/about' }, { n: 'Privacy', p: '/about' }] }
                  ].map((col, i) => (
                    <div key={i} className="space-y-8">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white opacity-50">{col.label}</h5>
                       <div className="flex flex-col gap-6">
                          {col.links.map(link => (
                            <Link key={link.n} to={link.p} className="text-sm font-bold text-slate-500 hover:text-brand transition-colors">{link.n}</Link>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-40 pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between gap-8 items-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">© 2026 Shoyakai Labs. All rights reserved.</p>
               <div className="flex gap-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand">System Status: Active</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Built in Dhaka, Scaling Globally.</span>
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
const CheckCircle2 = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
