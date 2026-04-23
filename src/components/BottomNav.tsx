import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sprout, MessageSquare, LayoutGrid, Bell, Box, Briefcase, User } from 'lucide-react';
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                isActive ? "text-brand scale-110" : "text-slate-400 hover:text-slate-600"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
