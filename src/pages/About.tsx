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
        title="About Shoyakai | Mission, Values & Founder's Vision" 
        description="Discover the mission of Shoyakai (Shoyaki AI), led by MD Tofiqur Rahaman. We are democratizing Artificial Intelligence through free, high-performance digital tools for creators and professionals globally."
        keywords="about shoyakai, MD Tofiqur Rahaman, Shoyaki AI mission, free AI tools, technology democratization, Shoyakai Labs Dhaka"
        type="WebPage"
        schemaData={{
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Person",
            "name": "MD Tofiqur Rahaman",
            "jobTitle": "Founder & Lead Architect",
            "description": "Visionary leader behind Shoyakai (Shoyaki AI), dedicated to democratizing technology access."
          }
        }}
      />

      <section className="text-center space-y-8 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
           <Fingerprint className="w-3.5 h-3.5 text-brand" />
           <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Our Impact</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-display italic leading-none tracking-tighter max-w-5xl mx-auto">
          Empowering the <br /> <span className="text-brand">Next Billion</span> Creators.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
          Shoyakai (Shoyaki AI) was born out of a simple observation: the most powerful tools on the internet are often locked behind paywalls. We are here to democratize Artificial Intelligence for every student, entrepreneur, and professional.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display italic tracking-tight">Our Core Mission.</h2>
            <div className="space-y-6 text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              <p>
                Our mission is to eliminate the "Digital Divide" by providing high-performance, AI-driven tools at zero cost. We believe that geographic or financial barriers should never limit a person's ability to innovate, create, or solve problems.
              </p>
              <p>
                In a world rapidly being reshaped by large language models and neural networks, Shoyakai serves as a localized bridge—tailoring global advancements in tech to meet the unique needs of users in Bangladesh and emerging markets.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-white/5 space-y-4">
                <Target className="w-8 h-8 text-brand" />
                <h4 className="font-bold text-xl">Accessibility</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Available to anyone, anywhere, 24/7.</p>
             </div>
             <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4">
                <Zap className="w-8 h-8 text-brand" />
                <h4 className="font-bold text-xl">Innovation</h4>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Constant R&D to bring the latest AI to your fingertips.</p>
             </div>
             <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4">
                <Users className="w-8 h-8 text-brand" />
                <h4 className="font-bold text-xl">Community</h4>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Built by the people, for the people.</p>
             </div>
             <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-white/5 space-y-4">
                <Shield className="w-8 h-8 text-brand" />
                <h4 className="font-bold text-xl">Ethics</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Transparent, secure, and privacy-focused AI.</p>
             </div>
          </div>
        </div>
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto py-20 border-t border-slate-100 dark:border-white/5">
         <div className="relative group">
            <div className="absolute inset-0 bg-brand/20 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
            <div className="relative bg-slate-100 dark:bg-slate-800 aspect-[4/5] rounded-[48px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                 alt="MD Tofiqur Rahaman - Founder of Shoyakai (Shoyaki AI)" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 bg-slate-800" 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10 space-y-2">
                  <p className="text-white font-black text-2xl tracking-tighter uppercase italic">MD Tofiqur Rahaman</p>
                  <p className="text-brand font-black text-[10px] tracking-[0.3em] uppercase">Founder & Architect</p>
               </div>
            </div>
         </div>
         <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
               <Zap className="w-3.5 h-3.5 text-brand" />
               <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">The Visionary</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display italic tracking-tighter leading-none">
               Meet <span className="text-brand">Tofiqur</span> Rahaman.
            </h2>
            <div className="space-y-6 text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
               <p>
                  MD Tofiqur Rahaman is the visionary founder behind Shoyakai. With a deep passion for technology and its potential to solve real-world problems, he set out to build an ecosystem that makes advanced AI and productivity tools accessible to everyone in Bangladesh and beyond.
               </p>
               <p>
                  His vision for Shoyakai (Shoyaki AI) is to create a "Neural Playground"—a space where complexity is stripped away, leaving only the power of intelligence. He believes that by providing these tools for free, we can unlock the latent potential of millions of talented individuals who are currently under-served by the global tech economy.
               </p>
               <p>
                  "I believe that the next wave of innovation will come from those who have the tools to build. Shoyakai is my contribution to that future—providing the digital infrastructure for the next generation of thinkers, creators, and entrepreneurs in Dhaka, Chittagong, and globally."
               </p>
               <div className="pt-6 relative aspect-video rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                    alt="MD Tofiqur Rahaman working as Lead Architect at Shoyakai Labs" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">Architectural Focus</span>
                  </div>
               </div>
               <div className="pt-4 flex flex-wrap gap-3">
                  {['AI Democratization', 'Future of Work', 'Tech Independence', 'Bangladesh 2.0'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-20 border-t border-slate-100 dark:border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display italic tracking-tighter">Visual Journey.</h2>
            <p className="text-slate-500 font-medium">Inside the labs and the vision powering Shoyakai Intelligence.</p>
         </div>
         
         <div className="relative group overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 px-6 whitespace-nowrap"
            >
              {[
                 { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", title: "Robotics Research" },
                 { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", title: "Neural Processing" },
                 { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", title: "Cybersecurity" },
                 { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", title: "Global Network" },
                 { url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800", title: "Data Centers" },
                 { url: "https://images.unsplash.com/photo-1522071823991-b9671e303020?auto=format&fit=crop&q=80&w=800", title: "Collaboration" },
                 { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", title: "Design Language" },
                 { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", title: "Lead Architect" }
              ].map((img, i) => (
                 <div 
                   key={i}
                   className="min-w-[400px] h-[300px] bg-slate-100 dark:bg-slate-800 rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 relative shadow-2xl transition-all hover:scale-105"
                 >
                    <img src={img.url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-8">
                       <p className="text-white font-black text-xs uppercase tracking-widest">{img.title}</p>
                    </div>
                 </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                 { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", title: "Robotics Research" },
                 { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", title: "Neural Processing" },
                 { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", title: "Cybersecurity" },
                 { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", title: "Global Network" }
              ].map((img, i) => (
                 <div 
                   key={`dup-${i}`}
                   className="min-w-[400px] h-[300px] bg-slate-100 dark:bg-slate-800 rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 relative shadow-2xl"
                 >
                    <img src={img.url} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                 </div>
              ))}
            </motion.div>
         </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto py-20 border-t border-slate-100 dark:border-white/5">
         <div className="order-2 lg:order-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
               <Shield className="w-3.5 h-3.5 text-blue-500" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Our Culture</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display italic tracking-tighter leading-none">
               Built on <span className="text-blue-500">Collaboration</span>.
            </h2>
            <div className="space-y-6 text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
               <p>
                  Technology is only as strong as the community that uses it. At Shoyakai, we foster an environment of open dialogue and shared discovery. These photos capture the essence of our journey—diverse minds coming together to solve complex problems in real-time.
               </p>
               <p>
                  From the heart of Dhaka's tech scene, we are scaling a platform that speaks the language of tomorrow. Every line of code and every design choice is a reflection of our commitment to excellence and collective growth.
               </p>
            </div>
         </div>
         <div className="order-1 lg:order-2 relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
            <div className="relative bg-slate-100 dark:bg-slate-800 aspect-video rounded-[48px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1522071823991-b9671e303020?auto=format&fit=crop&q=80&w=800" 
                 alt="Shoyakai Team Collaboration Session in Dhaka - Building AI Tools" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                 referrerPolicy="no-referrer"
               />
            </div>
         </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 border-t border-slate-100 dark:border-white/5">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
               <h3 className="text-3xl font-display italic">The Path Forward.</h3>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  As we move deeper into the age of autonomous systems, Shoyakai will continue to evolve. Our roadmap includes the integration of more sophisticated multimodal AI models, localized LLMs for Bengali processing, and specialized toolsets for industrial and academic research.
               </p>
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-display italic">A Global Ecosystem.</h3>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  While our roots are in Bangladesh, our vision is global. We are building Shoyakai to be a first-class citizen of the global open-source and free-software movement, contributing back to the intelligence that powers our platform.
               </p>
            </div>
         </div>
      </section>

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
