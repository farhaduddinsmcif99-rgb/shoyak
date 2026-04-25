import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import Logo from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Sprout, MessageSquare, LayoutGrid, Bell, Box, Briefcase, Gamepad2, Fingerprint, Mic } from 'lucide-react';
import { useApp } from '../AppContext';
import { cn } from '../utils/helpers';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { t, user, isAdmin, addNotification, notifPrefs } = useApp();

  // Simulated Push Notification Service
  useEffect(() => {
    const simulateNotifications = () => {
      const chance = Math.random();
      
      if (chance > 0.95 && notifPrefs.critical) {
        addNotification({
          title: 'জরুরি সতর্কতা!',
          message: 'আপনার এলাকায় নতুন জাতের ধানের রোগ দেখা দিয়েছে। সতর্ক থাকুন।',
          type: 'critical',
          icon: 'AlertTriangle'
        });
      } else if (chance > 0.90 && notifPrefs.prices) {
        addNotification({
          title: 'বাজার দর আপডেট',
          message: 'কারওয়ান বাজারে পেঁয়াজের দাম ৫ টাকা কমেছে।',
          type: 'price',
          icon: 'TrendingDown'
        });
      }
    };

    const interval = setInterval(simulateNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [notifPrefs, addNotification]);

  const navItems = [
    { to: '/', icon: Home, label: t('home') },
    { to: '/agriculture', icon: Sprout, label: 'Agri' },
    { to: '/jobs', icon: Briefcase, label: 'Earn' },
    { to: '/hub', icon: Box, label: 'Hub' },
    { to: '/junior', icon: Gamepad2, label: 'Junior' },
    { to: '/companion', icon: Fingerprint, label: 'Vision' },
    { to: '/assistant', icon: MessageSquare, label: 'AI' },
    { to: '/tools', icon: LayoutGrid, label: t('toolbox') },
  ];

  return (
    <div className="flex h-screen bg-surface dark:bg-surface-dark overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col items-center py-6 gap-8">
        <NavLink to="/" className="group">
           <Logo iconOnly size="sm" />
        </NavLink>
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "text-brand bg-brand/10" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )
              }
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto mb-4 relative">
          {user && (
            <div className="w-10 h-10 rounded-full border-2 border-brand overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {isAdmin && (
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></div>
             </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto no-scrollbar pb-24 md:pb-6">
          <div className="max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children ? children : <Outlet />}
                
                <footer className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 text-center pb-8">
                  <div className="flex justify-center flex-wrap gap-6 mb-4">
                    <NavLink to="/tools-list" className="text-[10px] font-black text-slate-400 hover:text-brand uppercase tracking-widest">All Tools</NavLink>
                    <NavLink to="/blog" className="text-[10px] font-black text-slate-400 hover:text-brand uppercase tracking-widest">Blog</NavLink>
                    <NavLink to="/about" className="text-[10px] font-black text-slate-400 hover:text-brand uppercase tracking-widest">About</NavLink>
                    <NavLink to="/sitemap" className="text-[10px] font-black text-slate-400 hover:text-brand uppercase tracking-widest">Sitemap</NavLink>
                    <NavLink to="/future/krishi" className="text-[10px] font-black text-slate-400 hover:text-brand uppercase tracking-widest">Krishi AI</NavLink>
                  </div>
                  <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.4em]">
                    SHOYAKAI • {new Date().getFullYear()}
                  </p>
                  <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                    © All Copyright goes to SHOYAKAI TEAM
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <BottomNav />
      </div>

      {/* Floating AI Assistant Button (Modern FAB) */}
      <NavLink
        to="/assistant"
        className={({ isActive }) => 
          cn(
            "fixed bottom-24 right-6 bg-brand text-white rounded-full flex items-center gap-3 px-6 py-4 shadow-[0_20px_50px_rgba(5,150,105,0.3)] z-40 transition-all hover:scale-105 hover:bg-brand-dark active:scale-95 group md:bottom-10 md:right-10",
            isActive ? "hidden" : "flex"
          )
        }
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-brand animate-pulse"></div>
        </div>
        <span className="text-xs font-black uppercase tracking-widest">Ask AI</span>
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Mic className="w-3 h-3" />
        </div>
      </NavLink>
    </div>
  );
}

