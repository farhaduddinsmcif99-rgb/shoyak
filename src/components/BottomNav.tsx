import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sprout, MessageSquare, LayoutGrid, Bell, Box, Briefcase, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { cn } from '../utils/helpers';

export default function BottomNav() {
  const { t } = useApp();

  const navItems = [
    { to: '/', icon: Home, label: t('home') },
    { to: '/jobs', icon: Briefcase, label: 'Earn' },
    { to: '/agriculture', icon: Sprout, label: 'Agri' },
    { to: '/hub', icon: Box, label: 'Hub' },
    { to: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60 px-4 py-2 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "relative flex flex-col items-center gap-1.5 p-2 transition-all duration-500",
                isActive ? "text-brand" : "text-slate-400"
              )
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  animate={isActive ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
                  className={cn(
                    "w-12 h-8 flex items-center justify-center rounded-2xl transition-colors",
                    isActive ? "bg-brand/10" : "bg-transparent"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                </motion.div>
                <span className={cn("text-[10px] font-black uppercase tracking-tighter transition-all", isActive ? "opacity-100 scale-100" : "opacity-60 scale-90")}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="nav-dot"
                    className="absolute -bottom-1 w-1 h-1 bg-brand rounded-full"
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
