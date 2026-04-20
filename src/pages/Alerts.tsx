import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ShieldCheck, TrendingUp, Bell, Clock, Trash2, ChevronRight, Bookmark, X, AlertCircle } from 'lucide-react';
import { storage } from '../utils/storage';
import { motion, AnimatePresence } from 'motion/react';

export default function Alerts() {
  const { lang, t, notifications, clearNotifications } = useApp();
  const [tab, setTab] = useState<'alerts' | 'saved'>('alerts');
  const [scamHistory, setScamHistory] = useState(storage.get('scam_history') || []);
  const [savedIdeas, setSavedIdeas] = useState(storage.get('saved_ideas') || []);

  const clearHistory = (type: 'scam' | 'idea', id: number) => {
    if (type === 'scam') {
      const newHist = scamHistory.filter((h: any) => h.id !== id);
      setScamHistory(newHist);
      storage.set('scam_history', newHist);
    } else {
      const newIdeas = savedIdeas.filter((i: any) => i.id !== id);
      setSavedIdeas(newIdeas);
      storage.set('saved_ideas', newIdeas);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
        <button
          onClick={() => setTab('alerts')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            tab === 'alerts' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          {t('notifications')}
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            tab === 'saved' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          {t('saved_items')}
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {tab === 'alerts' ? (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center px-4">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('notifications')}</h3>
                 <button onClick={clearNotifications} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Clear All</button>
              </div>
              
              {notifications.length === 0 ? (
                <div className="text-center py-20 grayscale opacity-40">
                  <Bell className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-bold">{lang === 'bn' ? 'কোনো নোটিফিকেশন নেই' : 'No notifications yet'}</p>
                </div>
              ) : (
                notifications.map((item: any) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className={`absolute left-0 top-0 w-1.5 h-full ${item.type === 'critical' ? 'bg-red-500' : 'bg-brand'}`}></div>
                    <div className="flex gap-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'critical' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-brand'}`}>
                          {item.type === 'critical' ? <AlertCircle className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                       </div>
                       <div>
                          <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.message}</p>
                          <div className="flex items-center gap-1.5 mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             <Clock className="w-3 h-3" />
                             {new Date(item.timestamp).toLocaleTimeString()} • Shayok Service
                          </div>
                       </div>
                    </div>
                  </div>
                ))
              )}

              {/* Also show Scam History here or in another sub-section */}
              {scamHistory.length > 0 && (
                 <>
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 mt-8">{t('scam_check')} History</h3>
                   {scamHistory.map((item: any) => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-xl h-fit ${
                             item.result.status === 'safe' ? 'bg-green-100 text-green-600' : 
                             item.result.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                           }`}>
                             <AlertCircle className="w-5 h-5" />
                           </div>
                           <div>
                              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">Analysis Result</span>
                              <h4 className="font-bold text-lg leading-tight capitalize">{item.result.status}</h4>
                           </div>
                        </div>
                        <button 
                          onClick={() => clearHistory('scam', item.id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 italic font-medium leading-relaxed">"{item.input}"</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <div className="flex items-center gap-1.5">
                           <Clock className="w-3 h-3" />
                           {new Date(item.date).toLocaleDateString()}
                         </div>
                         <div className="text-brand">Verified by Shayok.AI</div>
                      </div>
                    </div>
                  ))}
                 </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {savedIdeas.length === 0 ? (
                <div className="text-center py-20 grayscale opacity-40">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-bold">{lang === 'bn' ? 'কোনো আইডিয়া সংরক্ষিত নেই' : 'No saved ideas yet'}</p>
                </div>
              ) : (
                savedIdeas.map((idea: any) => (
                  <div key={idea.id} className="bg-white dark:bg-slate-900 p-5 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                         <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{lang === 'bn' ? idea.name_bn : idea.name_en}</h4>
                        <p className="text-xs text-slate-400">{lang === 'bn' ? idea.income_bn : idea.income_en}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => clearHistory('idea', idea.id)}
                      className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
