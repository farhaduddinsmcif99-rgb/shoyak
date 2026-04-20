import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Search, ShieldCheck, ShieldAlert, ShieldX, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../utils/storage';

interface ScamCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScamCheckModal({ isOpen, onClose }: ScamCheckModalProps) {
  const { t, lang } = useApp();
  const [input, setInput] = useState('');
  const [category, setCategory] = useState<'all' | 'link' | 'sms' | 'call' | 'social'>('all');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ status: 'safe' | 'warning' | 'scam', detail: string } | null>(null);

  const categories = [
    { id: 'all', name: lang === 'bn' ? 'সব' : 'All' },
    { id: 'link', name: lang === 'bn' ? 'লিঙ্ক' : 'Link' },
    { id: 'sms', name: lang === 'bn' ? 'এসএমএস' : 'SMS' },
    { id: 'call', name: lang === 'bn' ? 'কল' : 'Call' },
    { id: 'social', name: lang === 'bn' ? 'ফেসবুক/ইমো' : 'FB/Imo' },
  ];

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResult(null);

    // Simulated AI analysis logic
    setTimeout(() => {
      let analysisResult: { status: 'safe' | 'warning' | 'scam', detail: string };
      
      const val = input.toLowerCase();
      const isUrgent = val.includes('এখনই') || val.includes('urgent') || val.includes('last chance');
      
      if (val.includes('lottery') || val.includes('winner') || val.includes('otp') || val.includes('prize') || val.includes('bkash') || val.includes('nagad')) {
        analysisResult = { 
          status: 'scam', 
          detail: lang === 'bn' ? 'এটি নিশ্চিতভাবেই একটি স্ক্যাম। আপনার তথ্য শেয়ার করবেন না।' : 'This is definitely a scam. Do not share your information.' 
        };
      } else if ((val.includes('http') && !val.includes('https')) || isUrgent) {
        analysisResult = { 
          status: 'warning', 
          detail: lang === 'bn' ? 'এই লিঙ্কে প্রবেশ করার আগে সাবধান থাকুন। এটি তড়িঘড়ি করার ফাঁদ হতে পারে।' : 'Be careful before opening this link. It might be an urgency trap.' 
        };
      } else {
        analysisResult = { 
          status: 'safe', 
          detail: lang === 'bn' ? 'প্রাথমিকভাবে এটি নিরাপদ মনে হচ্ছে।' : 'Initially, this seems safe.' 
        };
      }

      setResult(analysisResult);
      setAnalyzing(false);

      // Save to alerts/history
      const history = storage.get('scam_history') || [];
      storage.set('scam_history', [
        { id: Date.now(), input, result: analysisResult, date: new Date().toISOString() },
        ...history
      ].slice(0, 50));
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-brand" />
            </div>
            <h2 className="text-xl font-bold">{t('scam_check')}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex gap-2 overflow-x-auto no-scrollbar">
           {categories.map(cat => (
             <button
               key={cat.id}
               onClick={() => setCategory(cat.id as any)}
               className={`px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 ${category === cat.id ? 'bg-brand border-brand text-white shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'}`}
             >
               {cat.name}
             </button>
           ))}
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">{t('scam_input_label')}</label>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-brand focus:ring-0 transition-all resize-none"
                placeholder={lang === 'bn' ? 'বার্তাট এখানে পেস্ট করুন...' : 'Paste the message here...'}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !input}
            className="w-full py-4 bg-brand hover:bg-brand-dark disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Search className="w-5 h-5" />
                </motion.div>
                <span>{lang === 'bn' ? 'বিশ্লেষণ করা হচ্ছে...' : 'Analyzing...'}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>{t('analyze')}</span>
              </>
            )}
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border-2 flex gap-4 ${
                  result.status === 'safe' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800' :
                  result.status === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800' :
                  'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800'
                }`}
              >
                <div className="mt-1">
                  {result.status === 'safe' && <ShieldCheck className="w-8 h-8" />}
                  {result.status === 'warning' && <ShieldAlert className="w-8 h-8" />}
                  {result.status === 'scam' && <ShieldX className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {result.status === 'safe' ? t('result_safe') : result.status === 'warning' ? t('result_warning') : t('result_scam')}
                  </h3>
                  <p className="text-sm opacity-90">{result.detail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
              <Info className="w-4 h-4" />
              {t('report_btn')}
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 shadow-md">
              <X className="w-4 h-4" />
              {t('block_btn')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
