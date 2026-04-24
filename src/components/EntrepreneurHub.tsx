import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Lightbulb, Info, Wallet, MapPin, Star, BookmarkPlus, 
  ChevronRight, Loader2, Sparkles, TrendingUp, Calculator,
  Truck, Building2, Package, Percent, DollarSign, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../utils/storage';

interface CostItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface BusinessIdea {
  id: number;
  name_bn: string;
  name_en: string;
  income_bn: string;
  income_en: string;
  steps_bn: string[];
  steps_en: string[];
  risk: 'low' | 'medium' | 'high';
  risk_detail: string;
  investment: string;
  profit_timeline: string;
  sector: string;
  location: string;
  costs: CostItem[];
  suppliers: { name: string; contact: string; location: string }[];
}

export default function EntrepreneurHub() {
  const { t, lang } = useApp();
  const [activeTab, setActiveTab] = useState<'generate' | 'calculator' | 'saved'>('generate');
  const [skills, setSkills] = useState('');
  const [budget, setBudget] = useState('50000');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sector, setSector] = useState('all');
  const [location, setLocation] = useState('all');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);

  // Profit Calculator State
  const [calcInvestment, setCalcInvestment] = useState(100000);
  const [calcMonthlyExp, setCalcMonthlyExp] = useState(15000);
  const [calcMonthlyRev, setCalcMonthlyRev] = useState(45000);

  const sectors = ['all', 'agriculture', 'tech', 'retail', 'services', 'food'];
  const locations = ['all', 'Dhaka', 'Chittagong', 'Khulna', 'Sylhet', 'Rajshahi', 'Rural'];

  const MOCK_IDEAS: BusinessIdea[] = [
    {
      id: 1,
      name_bn: 'দেশি হস্তশিল্প ই-কমার্স',
      name_en: 'Native Handicrafts E-commerce',
      income_bn: '৩০,০০০ - ৫০,০০০ টাকা/মাস',
      income_en: '30,000 - 50,000 BDT/month',
      steps_bn: ['দক্ষ কারিগর খুঁজুন', 'অনলাইন শপ খুলুন', 'সোশ্যাল মিডিয়া মার্কেটিং'],
      steps_en: ['Find skilled artisans', 'Open online shop', 'Social media marketing'],
      risk: 'medium',
      risk_detail: lang === 'bn' ? 'মাঝারি ঝুঁকি' : 'Medium Risk',
      investment: '৳৫০,০০০ - ৳৮০,০০০',
      profit_timeline: '৩-৫ মাস',
      sector: 'retail',
      location: 'Dhaka',
      costs: [
        { id: '1', name: 'Website Setup', price: 15000, category: 'Tech' },
        { id: '2', name: 'Initial Stock', price: 30000, category: 'Inventory' },
        { id: '3', name: 'Marketing Ads', price: 10000, category: 'Marketing' }
      ],
      suppliers: [
        { name: 'Khatib Artisans', contact: '01712-XXXXXX', location: 'Jamalpur' },
        { name: 'Saree Wholesale Hub', contact: '01822-XXXXXX', location: 'Islampur' }
      ]
    },
    {
       id: 2,
       name_bn: 'অরগানিক সবজি সরবরাহ',
       name_en: 'Organic Vegetable Supply',
       income_bn: '২০,০০০ - ৪০,০০০ টাকা/মাস',
       income_en: '20,000 - 40,000 BDT/month',
       steps_bn: ['স্থানীয় কৃষকদের সাথে যোগাযোগ', 'ডেলিভারি নেটওয়ার্ক', 'সাবস্ক্রিপশন মডেল'],
       steps_en: ['Contact local farmers', 'Delivery network', 'Subscription model'],
       risk: 'low',
       risk_detail: lang === 'bn' ? 'কম ঝুঁকি' : 'Low Risk',
       investment: '৳২০,০০০ - ৳৩০,০০০',
       profit_timeline: '২ মাস',
       sector: 'agriculture',
       location: 'Rural',
       costs: [
         { id: '1', name: 'Delivery Van Hire', price: 5000, category: 'Logistics' },
         { id: '2', name: 'Packaging Bags', price: 2000, category: 'Supplies' },
         { id: '3', name: 'Farm Contracts', price: 15000, category: 'Inventory' }
       ],
       suppliers: [
         { name: 'Savar Agri-Coop', contact: '01911-XXXXXX', location: 'Savar' },
         { name: 'Packaging BD', contact: '01300-XXXXXX', location: 'Dhaka' }
       ]
    }
  ];

  const generateIdeas = () => {
    setLoading(true);
    setTimeout(() => {
      setIdeas(MOCK_IDEAS.filter(i => {
        const matchesRisk = riskFilter === 'all' || i.risk === riskFilter;
        const matchesSector = sector === 'all' || i.sector === sector;
        return matchesRisk && matchesSector;
      }));
      setLoading(false);
    }, 800);
  };

  const calculateROI = () => {
    const profit = calcMonthlyRev - calcMonthlyExp;
    const months = Math.ceil(calcInvestment / profit);
    return { profit, months };
  };

  const { profit, months } = calculateROI();

  return (
    <div className="space-y-8">
      {/* Ecosystem Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
         <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {['generate', 'calculator', 'saved'].map((t) => (
               <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === t ? 'bg-white dark:bg-slate-700 text-brand shadow-sm' : 'text-slate-400'
                  }`}
               >
                  {t}
               </button>
            ))}
         </div>
         <div className="flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full border border-brand/20">
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-widest">Ecosystem 2.0 Beta</span>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'generate' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[48px] border border-slate-100 dark:border-slate-800 space-y-6">
               <h2 className="text-2xl font-black italic tracking-tighter uppercase">{lang === 'bn' ? 'ব্যবসায়িক আইডিয়া জেনারেটর' : 'Idea Generator'}</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Sector</label>
                     <select 
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-brand outline-none font-bold appearance-none"
                     >
                        {sectors.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Budget</label>
                     <input 
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-brand outline-none font-bold"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Profile</label>
                     <div className="flex gap-2">
                        {['low', 'medium', 'high'].map(r => (
                           <button 
                              key={r}
                              onClick={() => setRiskFilter(r as any)}
                              className={`flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                                 riskFilter === r ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20' : 'bg-slate-50 border-slate-100 text-slate-400'
                              }`}
                           >
                              {r}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
               <button 
                  onClick={generateIdeas}
                  disabled={loading}
                  className="w-full h-14 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
               >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5 text-brand" /> Generate Blueprints</>}
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {ideas.map((idea) => (
                  <motion.div 
                    key={idea.id}
                    layoutId={`idea-${idea.id}`}
                    onClick={() => setSelectedIdea(idea)}
                    className="group bento-card p-8 cursor-pointer relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-8 text-slate-100 dark:text-slate-800 -z-10">
                        <TrendingUp className="w-24 h-24 rotate-12" />
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <span className="px-3 py-1 bg-brand/10 text-brand text-[8px] font-black uppercase tracking-widest rounded-full">{idea.risk_detail}</span>
                           <h3 className="text-3xl font-black italic tracking-tighter leading-none">{lang === 'bn' ? idea.name_bn : idea.name_en}</h3>
                           <p className="text-slate-400 text-sm font-bold">{idea.income_en}</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex-1">
                              <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Investment</p>
                              <p className="text-sm font-black">{idea.investment}</p>
                           </div>
                           <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex-1">
                              <p className="text-[8px] font-black uppercase text-slate-400 mb-1">ROI Starts</p>
                              <p className="text-sm font-black">{idea.profit_timeline}</p>
                           </div>
                        </div>
                        <button className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-all">
                           Explore Blueprint <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'calculator' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[56px] border border-slate-100 dark:border-slate-800 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand rounded-[32px] flex items-center justify-center text-white shadow-xl shadow-brand/20">
                       <Calculator className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">Profit<br/>Calculator</h2>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400">Initial Setup Cost (৳)</label>
                       <input 
                          type="number"
                          value={calcInvestment}
                          onChange={(e) => setCalcInvestment(Number(e.target.value))}
                          className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-800 rounded-2xl font-black text-2xl border-0 focus:ring-4 ring-brand/5 outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400">Monthly Expenses (৳)</label>
                       <input 
                          type="number"
                          value={calcMonthlyExp}
                          onChange={(e) => setCalcMonthlyExp(Number(e.target.value))}
                          className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-800 rounded-2xl font-black text-xl border-0 outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400">Monthly Revenue (৳)</label>
                       <input 
                          type="number"
                          value={calcMonthlyRev}
                          onChange={(e) => setCalcMonthlyRev(Number(e.target.value))}
                          className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-800 rounded-2xl font-black text-xl border-0 outline-none"
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="p-10 bg-slate-900 rounded-[56px] text-white flex flex-col justify-between aspect-square relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand/20 blur-[120px] rounded-full group-hover:scale-125 transition-all duration-1000" />
                    <div className="relative z-10 space-y-2">
                       <h3 className="text-lg font-black uppercase tracking-widest text-slate-400">ROI Forecast</h3>
                       <p className="text-6xl font-black italic tracking-tighter">
                          {months} <span className="text-2xl text-brand uppercase not-italic">Months</span>
                       </p>
                       <p className="text-slate-400 text-sm font-bold">Estimated time to recover your initial investment based on current projections.</p>
                    </div>
                    <div className="relative z-10 p-8 bg-white/5 rounded-[40px] border border-white/10 space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-black uppercase text-slate-500">Monthly Net Profit</span>
                           <span className="text-3xl font-black text-brand tracking-tighter">৳{profit.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-brand w-[60%]" />
                        </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Idea Blueprint Modal */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-6 overflow-y-auto"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
               className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[64px] border-8 border-slate-100 dark:border-slate-800 p-8 md:p-12 relative my-12"
             >
                <button 
                  onClick={() => setSelectedIdea(null)}
                  className="absolute top-8 right-8 w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-brand transition-all"
                >
                   <ArrowRight className="w-5 h-5 rotate-180" />
                </button>

                <div className="space-y-12">
                   <header className="space-y-4">
                      <div className="flex items-center gap-3">
                         <span className="px-4 py-1.5 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">{selectedIdea.sector}</span>
                         <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{selectedIdea.location}</span>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">{lang === 'bn' ? selectedIdea.name_bn : selectedIdea.name_en}</h2>
                   </header>

                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 space-y-6">
                         <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                            <Truck className="w-4 h-4" /> Startup Guide
                         </h3>
                         <div className="space-y-4">
                            {(lang === 'bn' ? selectedIdea.steps_bn : selectedIdea.steps_en).map((step, i) => (
                               <div key={i} className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-[32px] border-2 border-transparent hover:border-brand/20 transition-all">
                                  <div className="w-8 h-8 bg-brand text-white rounded-xl flex items-center justify-center text-xs font-black shrink-0">{i+1}</div>
                                  <p className="text-sm font-bold leading-tight">{step}</p>
                               </div>
                            ))}
                         </div>
                      </div>

                      <div className="lg:col-span-1 space-y-6">
                         <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                            <Package className="w-4 h-4" /> Cost Breakdown
                         </h3>
                         <div className="space-y-4">
                            {selectedIdea.costs.map((cost) => (
                               <div key={cost.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800 rounded-[32px]">
                                  <div>
                                     <p className="text-sm font-black italic">{cost.name}</p>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase">{cost.category}</p>
                                  </div>
                                  <span className="text-sm font-black text-brand">৳{cost.price.toLocaleString()}</span>
                               </div>
                            ))}
                            <div className="p-5 bg-brand text-white rounded-[32px] flex justify-between items-center">
                               <span className="text-xs font-black uppercase tracking-widest">Total Seed Capital</span>
                               <span className="text-xl font-black italic">৳{selectedIdea.costs.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}</span>
                            </div>
                         </div>
                      </div>

                      <div className="lg:col-span-1 space-y-6">
                         <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                            <Building2 className="w-4 h-4" /> Verified Suppliers
                         </h3>
                         <div className="space-y-4">
                            {selectedIdea.suppliers.map((sup, i) => (
                               <div key={i} className="p-6 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] space-y-3 group hover:border-brand transition-all">
                                  <div className="flex justify-between items-start">
                                     <h4 className="font-black italic">{sup.name}</h4>
                                     <MapPin className="w-4 h-4 text-slate-300 group-hover:text-brand transition-colors" />
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</p>
                                     <p className="text-xs font-bold text-brand">{sup.contact}</p>
                                  </div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{sup.location}, Bangladesh</p>
                               </div>
                            ))}
                            <button className="w-full py-6 bg-slate-900 text-white rounded-[40px] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
                               Connect via Shayok
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
