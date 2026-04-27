import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sprout, Thermometer, Droplets, Wind, Scale, Calculator, Info, ChevronRight, X, AlertCircle, CheckCircle2, Loader2, Activity, ShieldAlert, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../utils/helpers';
import { cn } from '../lib/utils';

interface KrishiAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'crop' | 'disease' | 'calc' | 'fuel' | 'fertilizer' | 'climate' | 'harvest';
}

export default function KrishiAIModal({ isOpen, onClose, type = 'crop' }: KrishiAIModalProps) {
  const { t, lang, user } = useApp();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ 
    land: user?.farmData?.landSize || '', 
    soil: user?.farmData?.soilType || '', 
    season: '', 
    waterSource: user?.farmData?.irrigationType || '', 
    region: user?.farmData?.location || '', 
    cropGroup: '',
    pumpType: 'diesel',
    budget: '',
    previousYield: ''
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = () => {
    setLoading(true);
    setTimeout(() => {
      if (type === 'crop') {
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
      } else if (type === 'fuel') {
        setResult({
          fuelNeed: Math.round(Number(data.land) * 1.5),
          cost: Math.round(Number(data.land) * 1.5 * 105),
          alternatives: [
            { t: 'Solar Pump', d: 'Feasibility: High. Estimated ROI: 1.8 years. Reduces fuel dependency by 100%.', status: 'Recommended' },
            { t: 'AWD Technique', d: 'Alternate Wetting and Drying saves 30-50% water and fuel by reducing pump runtime.', status: 'High Impact' }
          ],
          queue: 'Moderate (15-20 mins)',
          bestTime: '4:00 AM - 6:30 AM',
          subsidy: 'Current: 20% Rebate on Solar Pumping Kits under BD-Gov 2026 scheme.'
        });
      } else if (type === 'fertilizer') {
        const land = Number(data.land) || 0;
        setResult({
          mix: [
            { n: 'Urea', q: `${Math.round(land * 0.8)}kg`, s: 'Gov Subsidized' },
            { n: 'TSP', q: `${Math.round(land * 0.4)}kg`, s: 'Limited Supply' },
            { n: 'MOP', q: `${Math.round(land * 0.3)}kg`, s: 'Mandatory' }
          ],
          alternatives: [
            { n: 'Vermi-compost', d: 'Replace 25% Urea with 10kg/decimal vermi-compost to improve soil health.' }
          ],
          impact: 'Reducing Urea by 30% without alternatives will drop yield by 12-15%.'
        });
      } else if (type === 'climate') {
        setResult({
          riskLevel: 'Moderate (Flooding risk in late May)',
          warnings: [
            'Localized heavy rainfall predicted between May 15-20.',
            'Early Boro harvest recommended before storm surge.'
          ],
          varieties: [
            'Flood-tolerant Rice (BRRI dhan 51)',
            'Saline-tolerant Wheat (Bari Gom 33)'
          ]
        });
      } else if (type === 'harvest') {
        setResult({
          lossEst: '22% Expected (due to high humidity)',
          preservation: [
            'Traditional Sun-Drying (reduced to 12% moisture)',
            'PICS Bags (stops 99% of pest infestation)'
          ],
          valueAdd: [
            { idea: 'Potato Flour', m: '৳25 -> ৳120/kg value jump' },
            { idea: 'Dehydrated Spices', m: 'Extends shelf life to 12 months' }
          ]
        });
      } else if (type === 'disease') {
        const isBn = lang === 'bn';
        setResult({
          name: isBn ? 'ধানের ব্লাস্ট রোগ' : 'Rice Blast Disease',
          advice: isBn ? 'আপনার ফসলে ছত্রাকের আক্রমণ দেখা গেছে। দ্রুত ছত্রাকনাশক স্প্রে করুন এবং আক্রান্ত অংশ সরিয়ে ফেলুন।' : 'Fungal infection detected. Spray fungicide immediately and remove infected parts.',
          remedy: isBn ? 'ট্রাইসাইক্লাজল (Tricyclazole) গ্রুপের ছত্রাকনাশক ৫ গ্রাম ১০ লিটার পানিতে মিশিয়ে স্প্রে করুন।' : 'Spray Tricyclazole group fungicide (5g per 10L water).',
          confidence: 94
        });
      } else if (type === 'calc') {
        const isBn = lang === 'bn';
        const roi = 145; // 145% ROI mock
        setResult({
          roi,
          estProfit: (Number(data.budget || 50000) * (roi / 100)).toFixed(0),
          advice: isBn ? 'এই খাতে বিনিয়োগ বর্তমানে বেশ লাভজনক। আপনার লভ্যাংশ বৃদ্ধির জন্য আধুনিক প্রযুক্তি ব্যবহার করুন।' : 'Investment in this sector is currently highly profitable. Use modern tech to maximize gains.',
          schemes: [
            { n: isBn ? 'বাংলাদেশ ব্যাংক কৃষি ঋণ' : 'BB Agri Loan', i: '4%' },
            { n: isBn ? 'সমন্বিত খামার সহায়তা' : 'Integrated Farm Support', i: 'Subsidy' }
          ]
        });
      }
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

        <div className="p-6 h-[400px] overflow-y-auto no-scrollbar relative">
          {step === 4 && result ? (
            <div className="space-y-6">
              {type === 'crop' ? (
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
                </div>
              ) : type === 'fuel' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-500">Est. Fuel Need</p>
                      <p className="text-3xl font-black italic">{result.fuelNeed}L</p>
                    </div>
                    <div className="p-6 bg-brand text-white rounded-3xl space-y-1">
                      <p className="text-[10px] font-black uppercase text-white/50">Est. Cost</p>
                      <p className="text-3xl font-black italic">৳{result.cost}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-3xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs uppercase text-amber-600 tracking-widest">Station Intelligence</h4>
                      <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300 text-[8px] font-black rounded uppercase">Live</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-500">Queue Time:</span>
                      <span className="text-amber-600">{result.queue}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-500">Best Time:</span>
                      <span className="text-amber-600">{result.bestTime}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {result.alternatives.map((alt: any, i: number) => (
                      <div key={i} className="p-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-black italic uppercase text-slate-800 dark:text-white">{alt.t}</h5>
                          <span className="text-[8px] font-black uppercase text-brand">{alt.status}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">{alt.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : type === 'fertilizer' ? (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
                     <h4 className="text-xl font-black italic uppercase tracking-tight">Optimal Mix Plan</h4>
                     <div className="space-y-4">
                        {result.mix.map((m: any, i: number) => (
                          <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                             <div>
                                <p className="font-black text-lg">{m.n}</p>
                                <p className="text-[10px] uppercase text-slate-500 font-black">{m.s}</p>
                             </div>
                             <p className="text-2xl font-black text-brand italic">{m.q}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="p-6 bg-brand/10 border-2 border-brand/20 rounded-3xl space-y-2">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Yield Impact Prediction</p>
                    <p className="text-sm font-bold italic leading-relaxed text-slate-700 dark:text-slate-200">{result.impact}</p>
                  </div>
                </div>
              ) : type === 'climate' ? (
                <div className="space-y-6">
                  <div className="p-8 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-[40px] space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-500 text-white rounded-2xl animate-pulse">
                        <Wind className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-red-600 uppercase tracking-widest text-xs">Climate Risk Level</h4>
                        <p className="text-xl font-black italic text-red-700 dark:text-red-300">{result.riskLevel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Active Warnings</h5>
                    {result.warnings.map((w: string, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-l-4 border-red-500 text-xs font-bold leading-relaxed">
                        {w}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Tolerant Varieties</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {result.varieties.map((v: string, i: number) => (
                        <div key={i} className="p-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span className="text-xs font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : type === 'harvest' ? (
                <div className="space-y-6">
                  <div className="p-8 bg-slate-900 text-white rounded-[40px] flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase">Estimated Loss</p>
                      <p className="text-4xl font-black italic text-red-500">{result.lossEst}</p>
                    </div>
                    <Scale className="w-12 h-12 text-slate-700" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Storage Methods</h5>
                      {result.preservation.map((m: string, i: number) => (
                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-bold">{m}</div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Value Addition</h5>
                      {result.valueAdd.map((v: any, i: number) => (
                        <div key={i} className="p-4 border-2 border-brand/20 bg-brand/5 rounded-2xl">
                           <p className="text-[10px] font-black uppercase text-brand">{v.idea}</p>
                           <p className="text-[10px] font-medium mt-1">{v.m}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : type === 'disease' ? (
                <div className="space-y-6 text-center">
                   <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldAlert className="w-12 h-12 text-red-500" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{result.name}</h4>
                      <p className="text-xs font-black text-red-500 uppercase tracking-widest">{result.confidence}% Confidence Match</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl text-left space-y-4">
                      <p className="text-sm font-bold leading-relaxed">{result.advice}</p>
                      <div className="p-4 bg-emerald-500 rounded-2xl text-white">
                         <p className="text-[10px] font-black uppercase opacity-60">Recommended Remedy</p>
                         <p className="text-xs font-bold mt-1">{result.remedy}</p>
                      </div>
                   </div>
                </div>
              ) : type === 'calc' ? (
                <div className="space-y-6">
                   <div className="p-8 bg-slate-900 text-white rounded-[40px] text-center space-y-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expected ROI</p>
                      <p className="text-6xl font-black italic text-brand">+{result.roi}%</p>
                      <p className="text-xs font-bold text-slate-400">Est. Profit: ৳{result.estProfit}</p>
                   </div>
                   <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Recommended Support Schemes</h5>
                      {result.schemes.map((s: any, i: number) => (
                        <div key={i} className="p-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex justify-between items-center">
                           <div>
                              <p className="font-black text-slate-800 dark:text-white">{s.n}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase">Government Priority</p>
                           </div>
                           <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-black uppercase">{s.i}</span>
                        </div>
                      ))}
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-bold leading-relaxed italic">" {result.advice} "</p>
                   </div>
                </div>
              ) : null}

              <div className="flex gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900 z-10">
                <button onClick={() => { setStep(1); setResult(null); }} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl">
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
          ) : (
            <div className="space-y-6">
              {(type === 'crop' || type === 'fuel' || type === 'fertilizer' || type === 'climate' || type === 'harvest') && (
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
                </div>
              )}

              {type === 'disease' && (
                <div className="space-y-6">
                  <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center gap-4 text-slate-400">
                    <Camera className="w-12 h-12" />
                    <div className="text-center">
                      <p className="font-bold text-slate-500">{lang === 'bn' ? 'ছবি আপলোড করুন অথবা বর্ণনা করুন' : 'Upload photo or describe'}</p>
                      <p className="text-xs">{lang === 'bn' ? 'যেমন: পাতা হলুদ হওয়া, কালো দাগ ইত্যাদি' : 'e.g. Yellow leaves, black spots'}</p>
                    </div>
                  </div>
                  <textarea 
                    className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-brand outline-none text-sm font-medium"
                    placeholder={lang === 'bn' ? 'এখানে বিস্তারিত লিখুন...' : 'Write details here...'}
                    value={data.symptoms || ''}
                    onChange={(e) => setData({ ...data, symptoms: e.target.value })}
                  />
                  <button 
                    onClick={handleRecommend}
                    className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-95"
                    disabled={loading}
                  >
                    {loading ? <div className="flex items-center justify-center gap-2 px-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {lang === 'bn' ? 'বিশ্লেষণ হচ্ছে...' : 'Analyzing...'}</div> : t('analyze')}
                  </button>
                </div>
              )}

              {type === 'calc' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Investment Amount (৳)</label>
                        <input 
                          type="number" 
                          className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-brand transition-all font-bold"
                          value={data.budget || ''}
                          onChange={(e) => setData({ ...data, budget: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Project Period (Months)</label>
                        <input 
                          type="number" 
                          className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-brand transition-all font-bold"
                          value={data.period || ''}
                          onChange={(e) => setData({ ...data, period: e.target.value })}
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Agricultural Sector</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Crops', 'Poultry', 'Fisheries', 'Dairy'].map(sector => (
                        <button
                          key={sector}
                          onClick={() => setData({ ...data, sector })}
                          className={cn(
                            "p-4 rounded-2xl text-xs font-bold transition-all border-2",
                            data.sector === sector ? "bg-brand/10 border-brand text-brand" : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500"
                          )}
                        >
                          {sector}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={handleRecommend}
                    className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-95"
                    disabled={loading}
                  >
                    {loading ? <div className="flex items-center justify-center gap-2 px-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {lang === 'bn' ? 'হিসাব হচ্ছে...' : 'Calculating...'}</div> : (lang === 'bn' ? 'ROI বিশ্লেষণ করুন' : 'Analyze ROI')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
