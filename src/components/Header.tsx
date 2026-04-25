import React from 'react';
import { useApp } from '../AppContext';
import { Bell, Moon, Sun, Languages, MessageSquare, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from './Logo';

export default function Header() {
  const { lang, setLang, darkMode, toggleDarkMode, t, isAdmin } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex flex-col">
          <Link to="/" className="group">
            <Logo size="sm" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Toggle */}
          <div className="flex bg-slate-200 dark:bg-slate-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setLang('bn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                lang === 'bn' ? 'bg-white dark:bg-slate-700 text-brand shadow-sm scale-105' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              BN
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                lang === 'en' ? 'bg-white dark:bg-slate-700 text-brand shadow-sm scale-105' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>

          <Link 
            to="/assistant"
            className="hidden sm:flex items-center gap-2 bg-brand text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            {t('ai_assistant')}
          </Link>

          <button 
            onClick={toggleDarkMode}
            className="p-2.5 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl border border-slate-100 dark:border-slate-700 hover:text-brand transition-colors shadow-sm"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button className="hidden md:block p-2.5 text-slate-400 hover:text-brand transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          {isAdmin && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl border border-slate-700 animate-pulse">
               <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
               <span className="text-[10px] font-black uppercase tracking-widest">Admin Mod</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

