import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sprout, Thermometer, Droplets, Wind, Scale, Calculator, Info, ChevronRight, X, AlertCircle, CheckCircle2, Loader2, Activity } from 'lucide-react';
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
  const [data, setData] = useState({ 
    land: '', 
    soil: '', 
    season: '', 
    waterSource: '', 
    region: '', 
    cropGroup: '' 
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = () => {
    setLoading(true);
    setTimeout(() => {
      const isRabi = data.season === 'rabi';
      setResult({
        crops: isRabi ? [
          { name: lang === 'bn' ? 'আলু' : 'Potato', type: 'Diamond', yield: '25-30 Ton/Hectare', suitability: '95%' },
          { name: lang === 'bn' ? 'সরিষা' : 'Mustard', type: 'Bari-14', yield: '1.5-2 Ton/Hectare', suitability: '88%' },
          { name: lang === 'bn' ? 'টমেটো' : 'Tomato', type: 'Hybrid', yield: '40-50 Ton/Hectare', suitability: '82%' },
        ] : [
          { name: lang === 'bn' ? 'ধান' : 'Rice', type: 'BRRI Dhan 28', yield: '5-6 Ton/Hectare', suitability: '92%' },
          { name: lang === 'bn' ? 'ভুট্টা' : 'Maize', type: 'High Yield', yield: '9-10 Ton/Hectare', suitability: '90%' },
          { name: lang === 'bn' ? 'পাট' : 'Jute', type: 'BJRI', yield: '3-4 Ton/Hectare', suitability: '85%' },
        ],
        advice: isRabi 
          ? (lang === 'bn' ? `আপনার অঞ্চলের (${data.region}) মাটির বৈশিষ্ট্য অনুযায়ী এই ফসলগুলো লাভজনক হবে। নিয়মিত সেচ ও কুয়াশা মোকাবিলায় ব্যবস্থা নিন।` : `Based on your region (${data.region}) soil characteristics, these crops will be profitable. Ensure regular irrigation and protect against fog.`)
          : (lang === 'bn' ? `আপনার জন্য (${data.waterSource}) সেচ ব্যবস্থা ব্যবহার করে ধান ও ভুট্টা চাষ লাভজনক। ড্রেনেজ ব্যবস্থা নিশ্চিত করুন।` : `Using (${data.waterSource}) irrigation, Rice and Maize are profitable for you. Ensure proper drainage.`)
      });
      setLoading(false);
      setStep(4);
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

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">{lang === 'bn' ? 'অঞ্চল নির্বাচন করুন' : 'Select Region'}</label>
                      <select 
                        value={data.region}
                        onChange={(e) => setData({...data, region: e.target.value})}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 outline-none focus:border-brand"
                      >
                        <option value="">{lang === 'bn' ? 'অঞ্চল বাছাই করুন' : 'Select Region'}</option>
                        {['Dhaka', 'Chittagong', 'Khulna', 'Sylhet', 'Rajshahi', 'Rangpur', 'Barisal', 'Mymensingh'].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    disabled={!data.land || !data.season || !data.region}
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
                        {['এঁটেল মটি', 'দোআঁশ মাটি', 'বেলে মাটি', 'পলি মাটি', 'খারি মাটি', 'লাল মাটি'].map((s) => (
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

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{lang === 'bn' ? 'জলের উৎস' : 'Water Source'}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Rainfed', 'Tube-well', 'Canal', 'River'].map((s) => (
                          <button 
                            key={s} 
                            onClick={() => setData({...data, waterSource: s})}
                            className={`p-3 rounded-xl border-2 font-bold text-xs transition-all ${data.waterSource === s ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                       <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 font-bold rounded-2xl">{lang === 'bn' ? 'পিছনে' : 'Back'}</button>
                       <button onClick={() => setStep(3)} disabled={!data.soil || !data.waterSource} className="flex-[2] py-4 bg-brand text-white font-bold rounded-2xl">{lang === 'bn' ? 'পরবর্তী' : 'Next'}</button>
                    </div>
                 </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{lang === 'bn' ? 'ফসলের ধরণ' : 'Crop Group'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cereals', 'Vegetables', 'Fruits', 'Spices', 'Fiber', 'Oilseeds'].map((s) => (
                        <button 
                          key={s} 
                          onClick={() => setData({...data, cropGroup: s})}
                          className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${data.cropGroup === s ? 'border-brand bg-brand/10 text-brand' : 'border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 font-bold rounded-2xl">{lang === 'bn' ? 'পিছনে' : 'Back'}</button>
                    <button 
                      onClick={handleRecommend}
                      disabled={loading || !data.cropGroup}
                      className="flex-[2] py-4 bg-brand text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
                    >
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Activity className="w-5 h-5" /> {t('analyze')}</>}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && result && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-3xl flex gap-3 text-green-700 dark:text-green-300">
                    <CheckCircle2 className="w-8 h-8 shrink-0 text-green-500" />
                    <div>
                      <h4 className="font-extrabold text-lg flex items-center gap-2">
                        {lang === 'bn' ? 'স্মার্ট এআই সুপারিশ' : 'Smart AI Recommendation'}
                        <div className="px-2 py-0.5 bg-green-500 text-white text-[8px] rounded-full uppercase tracking-widest">Verified</div>
                      </h4>
                      <p className="text-sm opacity-90 mt-1 leading-relaxed">{result.advice}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{lang === 'bn' ? 'সেরা ৩টি ফসল' : 'Top 3 Recommended Crops'}</label>
                    {result.crops.map((crop: any, i: number) => (
                      <div key={i} className="p-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex justify-between items-center group hover:border-brand transition-all bg-white dark:bg-slate-900 shadow-sm">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-brand/10 rounded-2xl flex items-center justify-center text-brand font-bold">
                              {i + 1}
                           </div>
                           <div>
                              <h5 className="font-black text-lg text-slate-800 dark:text-slate-100">{crop.name}</h5>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{crop.type}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-brand font-black text-xs uppercase tracking-tighter">{crop.suitability} Match</div>
                           <p className="text-[10px] font-bold text-slate-500 mt-0.5">{crop.yield}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl">
                        {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'}
                    </button>
                    <button 
                      onClick={onClose}
                      className="flex-[2] py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/10"
                    >
                      {lang === 'bn' ? 'বন্ধ করুন' : 'Finish'}
                    </button>
                  </div>
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
