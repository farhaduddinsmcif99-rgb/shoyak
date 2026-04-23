import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Lightbulb, Info, Wallet, MapPin, Star, BookmarkPlus, ChevronRight, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../utils/storage';

export default function EntrepreneurHub() {
  const { t, lang } = useApp();
  const [skills, setSkills] = useState('');
  const [budget, setBudget] = useState('50000');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sector, setSector] = useState('all');
  const [location, setLocation] = useState('all');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);

  const riskLevels = [
    { id: 'all', name: t('filter_all') },
    { id: 'low', name: t('risk_low') },
    { id: 'medium', name: t('risk_med') },
    { id: 'high', name: t('risk_high') }
  ];

  const sectors = ['all', 'agriculture', 'tech', 'retail', 'services', 'food'];
  const locations = ['all', 'Dhaka', 'Chittagong', 'Khulna', 'Sylhet', 'Rajshahi', 'Rural'];

  const generateIdeas = () => {
    if (!skills || !budget) return;
    setLoading(true);
    setIdeas([]);

    // Simulated business idea generation logic with multi-context
    setTimeout(() => {
      const allResults = [
        {
          id: 1,
          name_bn: 'দেশি হস্তশিল্প ই-কমার্স',
          name_en: 'Native Handicrafts E-commerce',
          income_bn: '৩০,০০০ - ৫০,০০০ টাকা/মাস',
          income_en: '30,000 - 50,000 BDT/month',
          steps_bn: ['দক্ষ কারিগর খুঁজুন', 'অনলাইন শপ খুলুন', 'সোশ্যাল মিডিয়া মার্কেটিং'],
          steps_en: ['Find skilled artisans', 'Open online shop', 'Social media marketing'],
          risk: 'medium',
          risk_detail: lang === 'bn' ? 'মাঝারি ঝুঁকি (মার্কেট প্রতিযোগিতা)' : 'Medium (Market competition)',
          investment: lang === 'bn' ? '৫০,০০০ - ৮০,০০০ টাকা' : '50k - 80k BDT',
          profit_timeline: lang === 'bn' ? '৩-৫ মাস' : '3-5 Months',
          sector: 'retail',
          location: 'Dhaka',
          icon: 'ShoppingBag'
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
          risk_detail: lang === 'bn' ? 'কম ঝুঁকি (বেসিক নেটওয়ার্ক)' : 'Low (Basic local network)',
          investment: lang === 'bn' ? '২০,০০০ - ৩০,০০০ টাকা' : '20k - 30k BDT',
          profit_timeline: lang === 'bn' ? '২ মাস' : '2 Months',
          sector: 'agriculture',
          location: 'Rural',
          icon: 'Leaf'
        },
        {
          id: 3,
          name_bn: 'টেক সার্ভিস সেন্টার',
          name_en: 'Tech Service Center',
          income_bn: '৪০,০০০ - ৭০,০০০ টাকা/মাস',
          income_en: '40,000 - 70,000 BDT/month',
          steps_bn: ['সরঞ্জাম ক্রয়', 'টেকনিশিয়ান নিয়োগ', 'লোকাল মার্কেটিং'],
          steps_en: ['Buy equipment', 'Hire technicians', 'Local marketing'],
          risk: 'high',
          risk_detail: lang === 'bn' ? 'উচ্চ ঝুঁকি (টেকনিক্যাল দক্ষ সেটআপ)' : 'High (Technical expertise needed)',
          investment: lang === 'bn' ? '২ - ৩ লক্ষ টাকা' : '200k - 300k BDT',
          profit_timeline: lang === 'bn' ? '৬-৮ মাস' : '6-8 Months',
          sector: 'tech',
          location: 'Chittagong',
          icon: 'Smartphone'
        },
        {
          id: 4,
          name_bn: 'ক্ষুদ্র মৎস্য খামার',
          name_en: 'Small Scale Fish Farm',
          income_bn: '২৫,০০০ - ৪৫,০০০ টাকা/মাস',
          income_en: '25,000 - 45,000 BDT/month',
          steps_bn: ['পুকুর মেরামত', 'পোনা সংগ্রহ', 'সঠিক খাদ্য ব্যবস্থাপনা'],
          steps_en: ['Pond renovation', 'Stock fries', 'Proper feed management'],
          risk: 'medium',
          risk_detail: lang === 'bn' ? 'মাঝারি ঝুঁকি (জৈব নিরাপত্তা)' : 'Medium (Bio-security risk)',
          investment: lang === 'bn' ? '১.৫ - ২ লক্ষ টাকা' : '150k - 200k BDT',
          profit_timeline: lang === 'bn' ? '৫-৬ মাস' : '5-6 Months',
          sector: 'agriculture',
          location: 'Khulna',
          icon: 'Droplets'
        }
      ];

      const filtered = allResults.filter(i => {
        const matchesRisk = riskFilter === 'all' || i.risk === riskFilter;
        const matchesSector = sector === 'all' || i.sector === sector;
        const matchesLocation = location === 'all' || i.location === location;
        const matchesBudget = true; // Simulating budget logic
        return matchesRisk && matchesSector && matchesLocation;
      });

      setIdeas(filtered);
      setLoading(false);
    }, 1200);
  };

  const saveIdea = (idea: any) => {
    const saved = storage.get('saved_ideas') || [];
    if (!saved.find((i: any) => i.id === idea.id)) {
      storage.set('saved_ideas', [...saved, { ...idea, savedAt: new Date().toISOString() }]);
      alert(lang === 'bn' ? 'আইডিয়াটি সংরক্ষিত হয়েছে!' : 'Idea saved successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-brand" />
          <h2 className="text-xl font-bold">{t('entrepreneur')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{lang === 'bn' ? 'সেক্টর' : 'Sector'}</label>
            <select 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-brand outline-none transition-all text-xs font-bold"
            >
              {sectors.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{lang === 'bn' ? 'অবস্থান' : 'Location'}</label>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-brand outline-none transition-all text-xs font-bold"
            >
              {locations.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{lang === 'bn' ? 'দক্ষতা' : 'Skills'}</label>
             <input
               type="text"
               value={skills}
               onChange={(e) => setSkills(e.target.value)}
               placeholder="Sales, Design..."
               className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-brand outline-none transition-all text-xs font-bold"
             />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{lang === 'bn' ? 'বাজেট' : 'Budget'}</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-brand outline-none transition-all text-xs font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'ঝুঁকির মাত্রা' : 'Preferred Risk Level'}</label>
          <div className="flex flex-wrap gap-2">
            {riskLevels.map(r => (
              <button
                key={r.id}
                onClick={() => setRiskFilter(r.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${riskFilter === r.id ? 'bg-brand border-brand text-white shadow-md shadow-brand/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500'}`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateIdeas}
          disabled={loading || !skills || !budget}
          className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>{t('generate_ideas')}</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {ideas.map((idea, idx) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 border-brand/10 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{lang === 'bn' ? idea.name_bn : idea.name_en}</h3>
                    <div className="flex flex-wrap gap-2">
                       <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                         idea.risk === 'low' ? 'bg-green-100 text-green-700' :
                         idea.risk === 'medium' ? 'bg-amber-100 text-amber-700' :
                         'bg-red-100 text-red-700'
                       }`}>
                         {idea.risk_detail}
                       </span>
                       <span className="text-[10px] uppercase font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                         {lang === 'bn' ? 'আয়: ' : 'Income: '} {lang === 'bn' ? idea.income_bn : idea.income_en}
                       </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => saveIdea(idea)}
                  className="p-2 text-slate-400 hover:text-brand transition-colors"
                >
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'bn' ? 'বিনিয়োগ' : 'Investment'}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{idea.investment}</p>
                 </div>
                 <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'bn' ? 'লাভের সময়' : 'Profit Starts'}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{idea.profit_timeline}</p>
                 </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'পরবর্তী ধাপসমূহ:' : 'Next Steps:'}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {(lang === 'bn' ? idea.steps_bn : idea.steps_en).map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs leading-none border border-slate-100 dark:border-slate-700">
                      <div className="w-4 h-4 bg-brand text-white rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold">{i + 1}</div>
                      <span className="font-medium text-slate-600 dark:text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="mt-4 w-full py-2.5 border-2 border-brand/20 text-brand font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-brand hover:text-white transition-all">
                {lang === 'bn' ? 'ব্যবসা শুরু করুন' : 'Start Business'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
