import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Sprout, MessageSquare, LayoutGrid, Bell, Box, Briefcase } from 'lucide-react';
import { useApp } from '../AppContext';
import { cn } from '../utils/helpers';

export default function Layout() {
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
    { to: '/assistant', icon: MessageSquare, label: 'AI' },
    { to: '/tools', icon: LayoutGrid, label: t('toolbox') },
  ];

  return (
    <div className="flex h-screen bg-surface dark:bg-surface-dark overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col items-center py-6 gap-8">
        <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
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
                <Outlet />
                
                <footer className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 text-center pb-8">
                  <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.4em]">
                    Shayok.AI • {new Date().getFullYear()}
                  </p>
                  <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                    © All Copyright goes to MD TOFIQUR RAHAMAN
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <BottomNav />
      </div>

      {/* Floating AI Assistant Button */}
      <NavLink
        to="/assistant"
        className={({ isActive }) => 
          cn(
            "fixed bottom-24 right-6 w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-brand/40 z-40 transition-all hover:scale-110 active:scale-95 group md:bottom-8 md:right-8",
            isActive ? "hidden" : "flex"
          )
        }
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-bounce" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
      </NavLink>
    </div>
  );
}

