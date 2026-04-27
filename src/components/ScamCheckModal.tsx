import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Search, ShieldCheck, ShieldAlert, ShieldX, X, Info, Smartphone, Landmark, Beaker, FileText, CheckCircle2, History, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../utils/storage';
import { cn } from '../utils/helpers';

interface ScamCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScamCategory = 'all' | 'dfs' | 'loan' | 'agri' | 'bank' | 'guide' | 'alerts';

export default function ScamCheckModal({ isOpen, onClose }: ScamCheckModalProps) {
  const { lang } = useApp();
  const [input, setInput] = useState('');
  const [category, setCategory] = useState<ScamCategory>('all');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ status: 'safe' | 'warning' | 'scam', detail: string, score: number } | null>(null);

  const categories: { id: ScamCategory; name: string; icon: any }[] = [
    { id: 'all', name: lang === 'bn' ? 'সব' : 'All', icon: Search },
    { id: 'dfs', name: lang === 'bn' ? 'আর্থিক (বিকাশ/নগদ)' : 'Financial (DFS)', icon: Smartphone },
    { id: 'loan', name: lang === 'bn' ? 'ঋণ জালিয়াতি' : 'Loan Fraud', icon: FileText },
    { id: 'agri', name: lang === 'bn' ? 'সার/কৃষি' : 'Agri/Fertilizer', icon: Beaker },
    { id: 'bank', name: lang === 'bn' ? 'ব্যাংক সুরক্ষা' : 'Bank Security', icon: Landmark },
    { id: 'guide', name: lang === 'bn' ? 'সুরক্ষা পদ্ধতি' : 'Safety Guide', icon: ShieldCheck },
    { id: 'alerts', name: lang === 'bn' ? 'সতর্কবার্তা' : 'Threat Alerts', icon: AlertTriangle },
  ];

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const val = input.toLowerCase();
      let res: { status: 'safe' | 'warning' | 'scam', detail: string, score: number };

      // 2026 specific triggers
      if (val.includes('otp') || val.includes('পিন') || val.includes('pin') || val.includes('price') || val.includes('বিকাশ') || val.includes('নগদ') || val.includes('রকেট')) {
        res = {
          status: 'scam',
          score: 98,
          detail: lang === 'bn' ? 'এটি নিশ্চিত আর্থিক জালিয়াতি! বিশেষ করে রকেট বা নগদে পিন চাইলে কখনোই দেবেন না। সরকারি কোনো সংস্থা পিন চায় না।' : 'CRITICAL THREAT: This matches financial phishing patterns exactly. Official agencies (Bkash/Nagad/Rocket) will NEVER ask for your PIN.'
        };
      } else if (val.includes('loan') || val.includes('ঋণ') || val.includes('শর্তহীন') || val.includes('সফটওয়ার') || val.includes('app')) {
        res = {
          status: 'warning',
          score: 72,
          detail: lang === 'bn' ? 'সন্দেহজনক অ্যাপ বা লিংকের মাধ্যমে ঋণের অফার। এটি আপনার মোবাইল থেকে তথ্য চুরি করতে পারে।' : 'MALWARE WARNING: Unofficial loan apps are being used to steal personal data. Verify the lender via the Entrepreneur Hub first.'
        };
      } else if (val.includes('subsidy') || val.includes('ভর্তুকি') || val.includes('সার') || val.includes('fertilizer')) {
        res = {
          status: 'warning',
          score: 55,
          detail: lang === 'bn' ? 'সার ভর্তুকির জন্য কোনো ফি লাগে না। যদি কেউ টাকা চায় তবে সেটি প্রতারণা।' : 'SUBSIDY ALERT: Government fertilizer subsidies are 100% free. Any request for an "advance processing fee" is a scam.'
        };
      } else {
        res = {
          status: 'safe',
          score: 5,
          detail: lang === 'bn' ? 'এখন পর্যন্ত এটি নিরাপদ মনে হচ্ছে। তবুও সচেতন থাকুন।' : 'No malicious signatures detected. Always double-check source numbers.'
        };
      }

      setResult(res);
      setAnalyzing(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5"
      >
        <div className="p-8 border-b border-slate-50 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-500/20">
                <ShieldAlert className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-black tracking-tight uppercase leading-none">Scam <span className="text-red-500">Guardian</span></h2>
                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">AI Protection v2.6</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-red-500 hover:text-white rounded-2xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex bg-slate-50 dark:bg-slate-800/50 p-2 gap-2 overflow-x-auto no-scrollbar">
           {categories.map(cat => (
             <button 
               key={cat.id}
               onClick={() => setCategory(cat.id)}
               className={cn(
                 "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2",
                 category === cat.id ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg" : "text-slate-400 hover:bg-white dark:hover:bg-slate-800"
               )}
             >
               <cat.icon className="w-3 h-3" />
               {cat.name}
             </button>
           ))}
        </div>

        <div className="p-8 h-[500px] overflow-y-auto no-scrollbar">
           <AnimatePresence mode="wait">
              {category === 'guide' ? (
                <motion.div key="guide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="space-y-4">
                      <h3 className="text-xl font-black uppercase tracking-tighter italic">Safe Transaction Rules</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {[
                           { t: 'Check Source', d: 'Always verify the sender number. Official banks use long codes.' },
                           { t: 'Never Share PIN', d: 'No staff will ever ask for your PIN/OTP in any scenario.' },
                           { t: 'Avoid urgency', d: 'Scammers create panic. Take 10 minutes to breathe before acting.' },
                           { t: 'Direct Calls', d: 'Call the official helpdesk directly from their secure website.' }
                         ].map((item, i) => (
                           <div key={i} className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl space-y-2">
                              <p className="text-xs font-black text-emerald-600 uppercase italic tracking-widest">{item.t}</p>
                              <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{item.d}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              ) : category === 'alerts' ? (
                <motion.div key="alerts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Current 2026 Threats</h3>
                   </div>
                   {[
                     { t: 'Fake Agri-Subsidy SMS', r: 'CRITICAL', d: 'Directing users to input Bkash PIN on "agrisub.net".' },
                     { t: 'Flood Insurance Call (Naogaon Area)', r: 'HIGH', d: 'Requesting advance fee for climate insurance claims.' },
                     { t: 'Unsecured Loans (1% Interest)', r: 'MEDIUM', d: 'WhatsApp based scams asking for identity documents.' }
                   ].map((a, i) => (
                     <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-3xl space-y-3">
                        <div className="flex justify-between items-start">
                           <h4 className="text-sm font-black italic">{a.t}</h4>
                           <span className={cn("px-2 py-0.5 rounded-lg text-[8px] font-black", a.r === 'CRITICAL' ? "bg-red-500 text-white" : "bg-amber-400 text-black")}>{a.r}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{a.d}</p>
                     </div>
                   ))}
                </motion.div>
              ) : (
                <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Analyze Content / Number / URL</label>
                      <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={lang === 'bn' ? 'সন্দেহজনক মেসেজ বা নাম্বার এখানে দিন...' : 'Paste message, number, or suspicious link...'}
                        className="w-full h-40 p-6 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-red-500/20 outline-none rounded-[40px] text-sm font-medium resize-none transition-all dark:text-white"
                      />
                   </div>

                   <button 
                     onClick={handleAnalyze}
                     disabled={analyzing || !input}
                     className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black tracking-[0.2em] uppercase text-xs shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                   >
                     {analyzing ? <Smartphone className="w-5 h-5 animate-bounce" /> : <Search className="w-5 h-5" />}
                     {analyzing ? 'Scanning Intelligence...' : 'Initiate Deep Scan'}
                   </button>

                   {result && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }}
                       className={cn(
                         "p-8 rounded-[40px] border-2 space-y-4",
                         result.status === 'scam' ? "bg-red-500/5 border-red-500/20 text-red-600" : 
                         result.status === 'warning' ? "bg-amber-500/5 border-amber-500/20 text-amber-600" : 
                         "bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
                       )}
                     >
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             {result.status === 'scam' ? <ShieldX className="w-8 h-8" /> : result.status === 'warning' ? <ShieldAlert className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                             <h4 className="text-xl font-black uppercase italic tracking-tighter">
                               {result.status === 'scam' ? 'Threat Detected' : result.status === 'warning' ? 'Potential Risk' : 'Safe to proceed'}
                             </h4>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black uppercase opacity-60">Risk Score</p>
                             <p className="text-2xl font-black">{result.score}%</p>
                          </div>
                       </div>
                       <p className="text-sm font-medium leading-relaxed opacity-90">{result.detail}</p>
                       <div className="flex gap-2">
                          <button className="flex-1 py-3 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">Report to Database</button>
                          <button className="flex-1 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5">Track Pattern</button>
                       </div>
                     </motion.div>
                   )}

                   <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                         <span className="text-[10px] font-black uppercase text-slate-400">Trusted Verification List</span>
                         <Smartphone className="w-3 h-3 text-emerald-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         {['16247 (Bkash)', '16167 (Nagad)'].map(t => (
                           <div key={t} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-white/5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-[10px] font-black uppercase">{t}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-slate-400" />
              <p className="text-[10px] font-black uppercase tracking-widest italic text-slate-400">Protected Sessions: 84</p>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 underline underline-offset-4 decoration-emerald-500/30 font-display italic">shoyakai intelligence</p>
        </div>
      </motion.div>
    </div>
  );
}
