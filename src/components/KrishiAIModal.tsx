import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sprout, Thermometer, Droplets, Wind, Scale, Calculator, Info, ChevronRight, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../utils/helpers';

interface KrishiAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'crop' | 'disease' | 'calc';
}

export default function KrishiAIModal({ isOpen, onClose, type = 'crop' }: KrishiAIModalProps) {
  const { t, lang } = useApp();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ land: '', soil: '', season: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = () => {
    setLoading(true);
    setTimeout(() => {
      const isRabi = data.season === 'rabi';
      setResult({
        crops: isRabi ? [
          { name: lang === 'bn' ? 'আলু' : 'Potato', type: 'Diamond', yield: '25-30 Ton/Hectare' },
          { name: lang === 'bn' ? 'সরিষা' : 'Mustard', type: 'Bari-14', yield: '1.5-2 Ton/Hectare' },
        ] : [
          { name: lang === 'bn' ? 'ধান' : 'Rice', type: 'BRRI Dhan 28', yield: '5-6 Ton/Hectare' },
          { name: lang === 'bn' ? 'ভুট্টা' : 'Maize', type: 'High Yield', yield: '9-10 Ton/Hectare' },
        ],
        advice: isRabi 
          ? (lang === 'bn' ? 'শীতকাল উচ্চ মূল্যের ফসলের জন্য উপযুক্ত। নিয়মিত সেচ ও কুয়াশা মোকাবিলায় ব্যবস্থা নিন।' : 'Winter is perfect for high-value crops. Ensure regular irrigation and protect against fog.')
          : (lang === 'bn' ? 'বর্ষাকালে ধান ও ভুট্টা লাভজনক। ড্রেনেজ ব্যবস্থা নিশ্চিত করুন।' : 'Rice and Maize are profitable in monsoon. Ensure proper drainage.')
      });
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 bg-brand text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6" />
            <h2 className="text-xl font-bold">
              {type === 'crop' ? t('crop_recommendation') : type === 'disease' ? t('disease_id') : t('calculator')}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {type === 'crop' && (
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl flex gap-3 text-blue-700 dark:text-blue-300">
                    <Info className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{lang === 'bn' ? 'সঠিক তথ্য দিলে এআই আপনাকে সেরা ফসল নির্বাচন করতে সাহায্য করবে।' : 'Provide accurate info for AI to help choose the best crop.'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <button className="flex flex-col items-center gap-2 p-4 border-2 border-brand/20 bg-brand/5 rounded-2xl hover:border-brand transition-all">
                        <Thermometer className="w-6 h-6 text-brand" />
                        <span className="text-xs font-bold uppercase">{lang === 'bn' ? 'মাটির নমুনা' : 'Soil Sample'}</span>
                     </button>
                     <button className="flex flex-col items-center gap-2 p-4 border-2 border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 rounded-2xl hover:border-brand transition-all">
                        <Droplets className="w-6 h-6 text-blue-500" />
                        <span className="text-xs font-bold uppercase">{lang === 'bn' ? 'সেচ ব্যবস্থা' : 'Irrigation'}</span>
                     </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{lang === 'bn' ? 'মৌসুম নির্বাচন করুন' : 'Select Season'}</label>
                      <div className="flex gap-2">
                        {['kharif', 'rabi', 'year_round'].map((s) => (
                          <button 
                            key={s} 
                            onClick={() => setData({...data, season: s})}
                            className={`flex-1 py-3 rounded-xl border-2 font-black text-[10px] uppercase transition-all ${data.season === s ? 'border-brand bg-brand text-white' : 'border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-400'}`}
                          >
                            {lang === 'bn' ? (s === 'kharif' ? 'খরিপ' : s === 'rabi' ? 'রবি' : 'বারোমাসি') : s.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">{lang === 'bn' ? 'জমির পরিমাণ (ডেসিমাল)' : 'Land Size (Decimal)'}</label>
                      <input 
                        type="number" 
                        value={data.land} 
                        onChange={(e) => setData({...data, land: e.target.value})} 
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 outline-none focus:border-brand" 
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    disabled={!data.land || !data.season}
                    className="w-full py-4 bg-brand text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-brand/20"
                  >
                    {lang === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {step === 2 && (
                 <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{lang === 'bn' ? 'মাটির ধরণ নির্বাচন করুন' : 'Select Soil Type'}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['এঁটেল মটি', 'দোআঁশ মাটি', 'বেলে মাটি', 'পলি মাটি'].map((s) => (
                          <button 
                            key={s} 
                            onClick={() => setData({...data, soil: s})}
                            className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${data.soil === s ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleRecommend}
                      disabled={loading || !data.soil}
                      className="w-full py-4 bg-brand text-white font-bold rounded-2xl flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : t('analyze')}
                    </button>
                 </div>
              )}

              {step === 3 && result && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl flex gap-3 text-green-700 dark:text-green-300">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <div>
                      <h4 className="font-bold">{lang === 'bn' ? 'এআই সুপারিশ' : 'AI Recommendation'}</h4>
                      <p className="text-sm opacity-90">{result.advice}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {result.crops.map((crop: any, i: number) => (
                      <div key={i} className="p-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex justify-between items-center group hover:border-brand transition-all">
                        <div>
                          <h5 className="font-bold text-lg">{crop.name}</h5>
                          <p className="text-xs text-slate-500">{crop.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-brand uppercase">{crop.yield}</p>
                          <div className="text-[10px] text-slate-400">Estimated Yield</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-slate-100 dark:bg-slate-800 font-bold rounded-2xl"
                  >
                    {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>
              )}
            </div>
          )}

          {type === 'disease' && (
            <div className="space-y-6">
               <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center gap-4 text-slate-400">
                  <AlertCircle className="w-12 h-12" />
                  <div className="text-center">
                    <p className="font-bold text-slate-500">{lang === 'bn' ? 'লক্ষণগুলো বর্ণনা করুন' : 'Describe symptoms'}</p>
                    <p className="text-xs">{lang === 'bn' ? 'যেমন: পাতা হলুদ হওয়া, কালো দাগ ইত্যাদি' : 'e.g. Yellow leaves, black spots'}</p>
                  </div>
               </div>
               <textarea 
                  className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-brand outline-none"
                  placeholder={lang === 'bn' ? 'এখানে লিখুন...' : 'Write here...'}
               />
               <button className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20">
                  {t('analyze')}
               </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
