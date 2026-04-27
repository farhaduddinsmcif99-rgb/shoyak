import React from 'react';
import { useApp } from '../AppContext';
import { User, Shield, CreditCard, Settings, LogOut, ChevronRight, Moon, Sun, Languages, Star, HelpCircle, Fingerprint, Gauge, Award } from 'lucide-react';
import { storage } from '../utils/storage';

export default function Profile() {
  const { t, lang, setLang, darkMode, toggleDarkMode, user, isAdmin, logout, notifPrefs, updateNotifPrefs } = useApp();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'farm'>('overview');

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    ...(isAdmin ? [{ icon: Shield, label: lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard', link: '#' }] : []),
    { icon: User, label: t('profile'), link: '#' },
    { icon: Shield, label: lang === 'bn' ? 'নিরাপত্তা' : 'Security', link: '#' },
    { icon: Star, label: t('saved_items'), link: '/alerts' },
    { icon: HelpCircle, label: lang === 'bn' ? 'সাহায্য কেন্দ্র' : 'Help Center', link: '#' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <section className="bg-brand rounded-[40px] p-8 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-white/20 p-1 bg-white/10 overflow-hidden">
            <img 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
               alt="Profile" 
               className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
              {isAdmin ? 'System Administrator' : 'Elite Member'}
            </p>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="flex bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-100 dark:border-white/5 mx-4 shadow-sm">
         <button 
           onClick={() => setActiveTab('overview')}
           className={cn(
             "flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
             activeTab === 'overview' ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md" : "text-slate-400"
           )}
         >
           Profile Overview
         </button>
         <button 
           onClick={() => setActiveTab('farm')}
           className={cn(
             "flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
             activeTab === 'farm' ? "bg-brand text-white shadow-md" : "text-slate-400"
           )}
         >
           My Farm Digital Twin
         </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Trust & Guardian Section */}
            <section className="grid grid-cols-2 gap-4 px-2">
               <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                     <Fingerprint className="w-5 h-5 text-brand" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">Verified Digital Twin v4.2 Active</p>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-brand w-[85%]" />
                  </div>
               </div>
               <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                     <Award className="w-5 h-5 text-indigo-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reputation</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">Top 1% Growth Milestone Achieved</p>
               </div>
            </section>

            {/* Settings List */}
            <section className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">{lang === 'bn' ? 'অ্যাকাউন্ট সেটিংস' : 'Account Settings'}</h3>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                {menuItems.map((item, idx) => (
                  <button key={idx} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:text-brand transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="farm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 px-4"
          >
            <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-8 border border-white/5">
               <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                     <div className="w-32 h-32 rounded-full border-8 border-emerald-500/20 flex items-center justify-center">
                        <p className="text-5xl font-black italic tracking-tighter">82</p>
                     </div>
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-0 border-t-2 border-emerald-500 rounded-full" 
                     />
                  </div>
                  <div className="text-center">
                     <h4 className="text-xl font-black uppercase tracking-tight">Farm Health Score</h4>
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Updated 2h ago</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500">Cultivated Area</p>
                     <p className="text-xl font-black italic">2.4 Acres</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                     <p className="text-[10px] font-black uppercase text-slate-500">Irrigation</p>
                     <p className="text-xl font-black italic text-emerald-500">Solar + AWD</p>
                  </div>
               </div>

               <div className="p-6 bg-brand rounded-3xl space-y-4">
                  <div className="flex items-center gap-2">
                     <Zap className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Active Insight</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">Your soil nitrogen levels are peaking. Reduce Urea input by 15% next week to save ৳4,200.</p>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Saved Crop Plans</h3>
               <div className="space-y-3">
                  {['Boro Rice v2.6', 'Winter Potato Mix'].map(plan => (
                    <div key={plan} className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-brand/30 transition-all">
                       <span className="font-bold text-slate-700 dark:text-slate-200">{plan}</span>
                       <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
               </div>
            </div>

            <button className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl">Recalibrate Twin</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences */}
      <section className="space-y-3">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">Preferences</h3>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-200">{t('dark_mode')}</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-brand' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${darkMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                <Languages className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-200">{t('language')}</span>
            </div>
            <button 
               onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
               className="text-brand font-bold text-sm bg-brand/10 px-4 py-1.5 rounded-xl border border-brand/20 active:scale-95 transition-transform"
            >
              {lang === 'bn' ? 'বাংলা' : 'English'}
            </button>
          </div>
        </div>
      </section>

      {/* Notifications Management */}
      <section className="space-y-3">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">{t('notifications')}</h3>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
          {[
            { id: 'critical', label: t('notif_critical') },
            { id: 'prices', label: t('notif_prices') },
            { id: 'tips', label: t('notif_tips') },
            { id: 'business', label: t('notif_business') }
          ].map((pref) => (
            <div key={pref.id} className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 last:border-0">
              <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{pref.label}</span>
              <button 
                onClick={() => updateNotifPrefs({ ...notifPrefs, [pref.id]: !notifPrefs[pref.id] })}
                className={`w-10 h-5 rounded-full transition-all relative ${notifPrefs[pref.id] ? 'bg-brand' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${notifPrefs[pref.id] ? 'left-5.5' : 'left-0.5'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </section>

      <button 
        onClick={handleLogout}
        className="w-full p-4 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-all border border-red-100"
      >
        <LogOut className="w-5 h-5" />
        {t('logout')}
      </button>

      <div className="text-center pb-8 flex flex-col items-center gap-2">
        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.4em]">Shayok.AI • Version 2.4.0</p>
        <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
           © ALL COPYRIGHT GOES TO MD TOFIQUR RAHAMAN
        </p>
      </div>
    </div>
  );
}
