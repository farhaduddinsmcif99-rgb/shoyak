import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed bottom-24 left-4 right-4 md:right-auto md:w-80 z-[100] p-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
        type === 'success' ? 'bg-green-600 border-green-500 text-white' :
        type === 'error' ? 'bg-red-600 border-red-500 text-white' :
        'bg-slate-800 border-slate-700 text-white'
      }`}
    >
      {type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
      {type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
      {type === 'info' && <Info className="w-5 h-5 shrink-0" />}
      
      <p className="flex-1 text-sm font-bold">{message}</p>
      
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
