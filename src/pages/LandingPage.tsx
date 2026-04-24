import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, Shield, Zap, Target, Globe, Sprout, 
  Briefcase, Activity, Sparkles, ChevronRight, Play, 
  Users, Award, Cpu, MessageCircle, BarChart3, Fingerprint, Lock
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
    <div ref={containerRef} className="bg-surface dark:bg-surface-dark overflow-hidden">
      <SEO 
        title="Shoyakai – Free Online Tools & Simple Web Apps" 
        description="Shoyakai offers free online tools and simple web apps to help you work faster, smarter, and easier. Fast, lightweight, and easy to use."
        keywords="free online tools, simple web apps, free web tools, online utility tools, productivity tools online"
      />

      {/* Persistent Nav - Floating Glass */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass px-8 py-4 rounded-[32px] flex items-center justify-between shadow-2xl shadow-black/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 grad-brand rounded-xl flex items-center justify-center rotate-12">
               <Fingerprint className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter uppercase">SHOYAKAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { name: 'Tools', path: '/tools-list' },
              { name: 'About', path: '/about' },
              { name: 'Blog', path: '/blog' }
            ].map((item) => (
              <Link key={item.name} to={item.path} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          <Link 
            to="/login" 
            className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            Launch System
          </Link>
        </div>
      </nav>

      {/* Hero Section - The Magnitude */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl w-full text-center space-y-16"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full border border-brand/20 text-[10px] font-black uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" /> Introducing Shoyakai
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl lg:text-[7rem] font-display font-medium leading-[0.85] tracking-tighter"
            >
              Free Online Tools & <br /> <span className="italic text-brand">Simple Web Apps</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed"
            >
              Welcome to Shoyakai, a collection of free online tools and simple web applications designed to make your daily tasks easier. Whether you need quick utilities, productivity tools, or lightweight web apps, everything here is built to be fast, simple, and accessible for everyone.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/login" className="w-full sm:w-auto px-10 py-6 bg-brand text-white rounded-[32px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand/20 hover:scale-105 hover:shadow-brand/40 transition-all flex items-center justify-center gap-3">
              Start Using Tools <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative pt-20"
          >
             <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full animate-pulse" />
             <div className="relative glass h-[400px] md:h-[600px] rounded-[48px] border-white/30 overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="relative w-64 h-64">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-4 border-dashed border-brand/40 rounded-full"
                   />
                   <motion.div 
                     animate={{ rotate: -360 }}
                     transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-4 border border-brand/20 rounded-full"
                   />
                   <div className="absolute inset-8 border-2 border-brand/60 rounded-full flex items-center justify-center bg-brand/5 backdrop-blur-3xl shadow-[0_0_100px_rgba(5,150,105,0.4)]">
                      <Fingerprint className="w-16 h-16 text-brand animate-pulse" />
                   </div>
                   
                   {/* Orbiting nodes */}
                   {[0, 90, 180, 270].map((angle, i) => (
                     <motion.div
                       key={i}
                       animate={{ 
                         rotate: [0, 360],
                         scale: [1, 1.2, 1]
                       }}
                       transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
                       className="absolute w-4 h-4 bg-white rounded-full shadow-lg border-2 border-brand"
                       style={{ 
                         top: '50%', 
                         left: '50%', 
                         margin: '-8px',
                         transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)` 
                       }}
                     />
                   ))}
                </div>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                   {['NEURAL_LINK_READY', 'SAT_COMM_ACTIVE', 'ENCRYPTION_MAX'].map(status => (
                     <div key={status} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand rounded-full animate-ping" />
                        <span className="text-[10px] font-mono font-bold text-brand">{status}</span>
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-16 space-y-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
               {[
                 { label: 'Active Citizens', val: '2.4M+' },
                 { label: 'AI Accuracy', val: '99.2%' },
                 { label: 'Impact Score', val: 'A+' },
                 { label: 'Real-time Ops', val: '24/7' }
               ].map((stat, i) => (
                 <div key={i} className="text-center space-y-1">
                    <p className="text-3xl font-display font-medium">{stat.val}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                 </div>
               ))}
            </div>

            <div className="space-y-6">
               <p className="text-[8px] font-black uppercase tracking-[0.6em] text-slate-400 opacity-50">Empowering Local Ecosystems</p>
               <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tighter">
                     <span className="w-6 h-6 bg-slate-900 rounded-md" /> DHAKA TECH
                  </div>
                  <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tighter">
                     <span className="w-6 h-6 bg-slate-900 rounded-md rotate-45" /> SYLHET LABS
                  </div>
                  <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tighter">
                     <span className="w-6 h-6 bg-slate-900 rounded-full" /> CTG GLOBAL
                  </div>
                  <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tighter">
                     <div className="flex gap-1">
                        <div className="w-2 h-6 bg-slate-900" />
                        <div className="w-2 h-6 bg-slate-900 mt-2" />
                     </div> BARISAL AI
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Shoyakai Section */}
      <section id="technology" className="py-32 px-6 max-w-7xl mx-auto space-y-20">
        <div className="space-y-6 max-w-3xl">
           <SectionLabel text="Our Free Tools" />
           <h2 className="text-5xl md:text-7xl font-display">A modular core for every dimension of productivity.</h2>
           <p className="text-xl text-slate-500 font-medium">From quick text utilities to advanced AI assistants, Shoyakai provides everything you need to work smarter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 bento-card p-12 space-y-8">
             <h3 className="text-3xl font-display">Why Choose Shoyakai</h3>
             <ul className="space-y-6">
                {[
                  { title: "Fast loading tools", desc: "Optimized for speed and efficiency." },
                  { title: "Simple user interface", desc: "Clean design without clutter." },
                  { title: "Free to use", desc: "No hidden costs or subscriptions." },
                  { title: "No unnecessary complexity", desc: "Direct tools for direct results." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                     <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                     </div>
                  </li>
                ))}
             </ul>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
             <FeatureCard 
               title="Popular Tools" 
               desc="Check out our most used applications by millions of users."
               icon={Sparkles}
               color="text-brand"
               delay={0.1}
             />
             <FeatureCard 
               title="Productivity Suite" 
               desc="Tools designed to save you hours of manual work."
               icon={Zap}
               color="text-blue-500"
               delay={0.2}
             />
             <Link to="/tools" className="sm:col-span-2 bento-card p-10 flex items-center justify-between group hover:bg-brand hover:text-white transition-all cursor-pointer">
                <div className="space-y-2">
                   <h3 className="text-3xl font-display">View All Tools</h3>
                   <p className="text-slate-500 group-hover:text-white/80">Explore our full directory of utility apps.</p>
                </div>
                <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-all" />
             </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Dark Minimal */}
      <section id="vision" className="bg-slate-950 py-40 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <SectionLabel text="The Philosophy" />
          <h2 className="text-5xl md:text-8xl font-display italic leading-none tracking-tighter">
            We are building <br /> 
            <span className="text-brand">Dignity, </span>
            <span>not just Data.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Our mission is to democratize intelligence. We believe every citizen in Bangladesh, from the tea-gardens of Sylhet to the ports of Chittagong, deserves a world-class digital companion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
             {[
               { icon: Lock, label: 'Absolute Privacy', desc: 'Sovereign data ownership for every user.' },
               { icon: Zap, label: 'Zero Barrier', desc: 'Optimized for low-bandwidth environments.' },
               { icon: Users, label: 'Community Focus', desc: 'Tools designed for collective growth.' }
             ].map((item, i) => (
               <div key={i} className="space-y-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-brand/20 transition-colors">
                     <item.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h4 className="font-bold text-lg">{item.label}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Vision 2050 Immersive */}
      <section className="relative h-[800px] flex items-center overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000" 
           className="absolute inset-0 w-full h-full object-cover opacity-20"
           alt="Futuristic Bangladesh"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent dark:from-surface-dark dark:via-surface-dark/90" />
         
         <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-10">
               <SectionLabel text="Vision 2050" />
               <h2 className="text-6xl md:text-8xl font-display leading-[0.9] tracking-tighter">The Blueprint for a <br /> <span className="text-brand">Smart Nation.</span></h2>
               <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
                  Join the movement towards Vision 2050. We are mapping the future of education, healthcare, and infrastructure. Explore the interactive roadmap of what Bangladesh will become.
               </p>
               <Link to="/future/vision" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-brand hover:gap-6 transition-all group">
                  Explore Roadmap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
         </div>
      </section>

      {/* Pricing / Join Section */}
      <section id="pricing" className="py-32 px-6 max-w-5xl mx-auto text-center space-y-20">
         <div className="space-y-6">
            <SectionLabel text="The Access" />
            <h2 className="text-5xl md:text-7xl font-display">Simple. Transparent. Scalable.</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bento-card p-12 text-left space-y-8 border-slate-100 dark:border-slate-800">
               <div className="space-y-2">
                  <h4 className="text-xl font-bold">Standard Citizen</h4>
                  <p className="text-[10px] font-black text-brand uppercase tracking-widest">Free Forever</p>
               </div>
               <p className="text-slate-500 font-medium">Essential AI tools for daily life, security alerts, and basic diagnostics.</p>
               <ul className="space-y-4">
                  {['Digital Identity Shield', 'Community Alerts', 'Basic Krishi Scan', 'Job Marketplace'].map(u => (
                    <li key={u} className="flex items-center gap-3 text-sm font-medium">
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                       {u}
                    </li>
                  ))}
               </ul>
               <Link to="/login" className="block w-full py-5 glass rounded-2xl font-black text-xs uppercase tracking-widest text-center tap-effect">Get Started</Link>
            </div>

            <div className="bento-card p-12 text-left space-y-8 bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-[60px] rounded-full" />
               <div className="space-y-2 relative z-10">
                  <h4 className="text-xl font-bold">Pro Entrepreneur</h4>
                  <div className="flex items-baseline gap-1">
                     <span className="text-3xl font-display font-medium">৳ ৪৯৯</span>
                     <span className="text-xs text-slate-500 uppercase font-black">/ Month</span>
                  </div>
               </div>
               <p className="text-slate-400 font-medium">Advanced intelligence for business growth, detailed analytics, and priority access.</p>
               <ul className="space-y-4 relative z-10">
                  {['Full Business Hub', 'Market Predictive AI', 'Health Video Consults', 'AI Resume Master'].map(u => (
                    <li key={u} className="flex items-center gap-3 text-sm font-medium">
                       <CheckCircle2 className="w-5 h-5 text-brand" />
                       {u}
                    </li>
                  ))}
               </ul>
               <Link to="/login" className="block w-full py-5 bg-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-xl shadow-brand/20 tap-effect relative z-10">Upgrade to Pro</Link>
            </div>
         </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 py-20 px-6 border-t border-slate-100 dark:border-slate-900">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-20">
               <div className="space-y-10 max-w-md">
                   <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grad-brand rounded-xl flex items-center justify-center rotate-12">
                       <Fingerprint className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-display font-black text-2xl tracking-tighter uppercase">SHOYAKAI</span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Designed for efficiency. Shoyakai is your central hub for free online tools and simple web applications. Built for the next generation of digital excellence.
                  </p>
                  <div className="flex gap-6">
                     {[Twitter, Linkedin, Instagram, MessageCircle].map((Icon, i) => (
                       <a key={i} href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-brand transition-colors">
                          <Icon className="w-5 h-5" />
                       </a>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                  {[
                    { label: 'Platform', links: [{ n: 'All Tools', p: '/tools-list' }, { n: 'Popular', p: '/tools-list' }, { n: 'New Apps', p: '/tools-list' }] },
                    { label: 'Resources', links: [{ n: 'Blog', p: '/blog' }, { n: 'Guides', p: '/blog' }, { n: 'FAQ', p: '/about' }] },
                    { label: 'Company', links: [{ n: 'About Shoyakai', p: '/about' }, { n: 'Careers', p: '/about' }, { n: 'Contact', p: '/about' }] }
                  ].map((col, i) => (
                    <div key={i} className="space-y-6">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{col.label}</h5>
                       <div className="flex flex-col gap-4">
                          {col.links.map(link => (
                            <Link key={link.n} to={link.p} className="text-xs font-bold text-slate-500 hover:text-brand transition-colors">{link.n}</Link>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-40 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between gap-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© 2026 Shayok Intelligence Systems Ltd. Built in Dhaka.</p>
               <div className="flex gap-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Status: All Green</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Localized: BN-BD</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

const Twitter = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Linkedin = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>;
const Instagram = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const CheckCircle2 = (props: any) => <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
