import React from 'react';
import { Zap } from 'lucide-react';
import { cn } from '../utils/helpers';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className, iconOnly = false, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', container: 'gap-2' },
    md: { icon: 'w-10 h-10', text: 'text-xl', container: 'gap-3' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', container: 'gap-4' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', container: 'gap-5' },
  };

  const currentSize = sizes[size];

  return (
    <div className={cn("flex items-center group", currentSize.container, className)}>
      <div className={cn(
        "relative flex items-center justify-center rounded-[1.25rem] bg-slate-900 dark:bg-white transition-all duration-500 group-hover:-rotate-12 group-hover:scale-105 overflow-hidden",
        currentSize.icon
      )}>
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-brand/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <Zap className="w-1/2 h-1/2 text-brand fill-brand" />
        
        {/* Gloss Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 skew-y-[-20deg] -translate-y-4" />
      </div>
      
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className={cn(
              "font-display font-black tracking-[-0.05em] uppercase text-slate-900 dark:text-white transition-all",
              currentSize.text
            )}>
              Shoya<span className="text-brand">kai</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand">
              Shoyaki AI
            </span>
            <div className="flex-1 h-[1px] bg-brand/30" />
          </div>
        </div>
      )}
    </div>
  );
}
