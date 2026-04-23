import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  DollarSign, Calculator, Target, TrendingUp, TrendingDown,
  Plus, Search, ArrowRight, Wallet, PieChart, Info,
  CheckCircle2, AlertCircle, Zap, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Finance() {
  const { lang } = useApp();
  const [expenseInput, setExpenseInput] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Seed Purchase', amount: 500, type: 'expense' },
    { id: 2, title: 'Freelance Project', amount: 2000, type: 'income' },
  ]);
  const [savingsGoal, setSavingsGoal] = useState({ target: 50000, current: 12500 });

  const totalBalance = expenses.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none uppercase">
               My <span className="text-blue-600">Finance</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Smart Money Manager</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          {/* Main Balance Card */}
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <PieChart className="w-48 h-48" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                   <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{lang === 'bn' ? 'মোট ব্যালেন্স' : 'Total Balance'}</p>
                   <h2 className="text-5xl font-black tabular-nums tracking-tighter">৳{totalBalance.toLocaleString()}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center gap-4">
                      <div className="p-2 bg-green-500 text-white rounded-xl"><TrendingUp className="w-4 h-4" /></div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Income</p>
                         <p className="text-lg font-bold">৳2,000</p>
                      </div>
                   </div>
                   <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center gap-4">
                      <div className="p-2 bg-red-500 text-white rounded-xl"><TrendingDown className="w-4 h-4" /></div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Expense</p>
                         <p className="text-lg font-bold">৳500</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Expense Tracker */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{lang === 'bn' ? 'ব্যয় ট্র্যাকার' : 'Expense Tracker'}</h3>
                <button className="p-2 bg-brand/10 text-brand rounded-xl">
                   <Plus className="w-5 h-5" />
                </button>
             </div>
             
             <div className="space-y-3">
                {expenses.map(exp => (
                  <div key={exp.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group hover:bg-slate-100 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${exp.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                           {exp.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        </div>
                        <div>
                           <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{exp.title}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase">Daily Business</p>
                        </div>
                     </div>
                     <p className={`font-black text-sm ${exp.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                        {exp.type === 'income' ? '+' : '-'}৳{exp.amount}
                     </p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <section className="space-y-6">
          {/* Savings Goal Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><Target className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold">{lang === 'bn' ? 'সঞ্চয় লক্ষ্য' : 'Savings Goal'}</h3>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Tractor Fund</p>
                      <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">৳{savingsGoal.current.toLocaleString()}</h4>
                   </div>
                   <p className="text-sm font-bold text-amber-500">25% Done</p>
                </div>
                
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '25%' }}
                    className="h-full bg-amber-500 rounded-full"
                   />
                </div>
                
                <p className="text-[10px] text-slate-400 font-bold text-center italic">Keep it up! ৳37,500 more to go.</p>
             </div>
          </div>

          {/* Loan Calculator Mini */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Calculator className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold">{lang === 'bn' ? 'লোন ক্যালকুলেটর' : 'Loan Calculator'}</h3>
             </div>

             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Principal Amount</label>
                   <input type="number" defaultValue="100000" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none border-2 border-transparent focus:border-blue-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Interest %</label>
                      <input type="number" defaultValue="9" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years</label>
                      <input type="number" defaultValue="2" className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-sm outline-none" />
                   </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30 text-center">
                   <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase mb-1">Monthly Installment</p>
                   <p className="text-2xl font-black text-blue-700 dark:text-blue-200">৳4,568</p>
                </div>
             </div>
          </div>
        </section>
      </div>

      <div className="p-8 bg-blue-600 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <Building2 className="absolute -left-10 -bottom-10 w-48 h-48 text-white/10" />
         <div className="space-y-2">
            <h3 className="text-2xl font-black">Need a formal loan?</h3>
            <p className="text-blue-100 text-sm">We are partnered with 10+ banks to help rural entrepreneurs.</p>
         </div>
         <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">CHECK ELIGIBILITY</button>
      </div>
    </div>
  );
}
