import React from 'react';
import { Zap } from 'lucide-react';
import { cn } from '../utils/helpers';
import { motion } from 'motion/react';

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
    <div className={cn("flex items-center group cursor-pointer", currentSize.container, className)}>
      <div className={cn(
        "relative flex items-center justify-center rounded-[1.5rem] bg-slate-950 dark:bg-white transition-all duration-700 group-hover:rounded-[1rem] group-hover:rotate-[15deg] group-hover:scale-110 overflow-hidden shadow-2xl",
        currentSize.icon
      )}>
        {/* Particle Effect Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-color)_0%,_transparent_70%)] animate-pulse" style={{ '--brand-color': '#10b981' } as any} />
        </div>
        
        <Zap className="w-1/2 h-1/2 text-brand fill-brand z-10 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        
        {/* Dynamic Border */}
        <div className="absolute inset-0 border-2 border-brand/20 group-hover:border-brand/50 rounded-inherit transition-all duration-700" />
      </div>
      
      {!iconOnly && (
        <div className="flex flex-col -space-y-1">
          <div className="flex items-baseline gap-1">
            <span className={cn(
              "font-display font-black tracking-[-0.07em] uppercase text-slate-950 dark:text-white transition-all group-hover:tracking-[-0.02em]",
              currentSize.text
            )}>
              SHOYAKAI
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" />
          </div>
          <div className="flex items-center gap-2 overflow-hidden">
             <motion.span 
               initial={{ x: -20, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-brand transition-colors whitespace-nowrap"
             >
               INTELLIGENCE
             </motion.span>
          </div>
        </div>
      )}
    </div>
  );
}
