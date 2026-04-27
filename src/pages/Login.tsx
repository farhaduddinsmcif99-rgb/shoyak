import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { lang, t, login, signup, passkeyLogin } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup' | 'passkey'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passkey, setPasskey] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
      } else if (mode === 'signup') {
        success = await signup(formData.name, formData.email, formData.password);
      } else if (mode === 'passkey') {
        success = await passkeyLogin(passkey);
      }

      if (success) {
        navigate('/');
      } else {
        setError(mode === 'passkey' ? 'Invalid Passkey' : (mode === 'login' ? 'Invalid credentials' : 'User already exists'));
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <SEO 
        title="লগইন | Shayok.AI Community" 
        description="শায়ক এআই কমিউনিটিতে যোগ দিন। আপনার কৃষি ড্যাশবোর্ড অ্যাক্সেস করতে লগইন করুন।"
        keywords="লগইন, শায়ক আইডি, কৃষি পোর্টাল, স্মার্ট ড্যাশবোর্ড অ্যাক্সেস"
        type="WebPage"
      />
      {/* Abstract Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand/10 text-brand rounded-2xl border border-brand/20">
             <ShieldCheck className="w-5 h-5" />
             <span className="text-xs font-black uppercase tracking-widest leading-none">Authentication Service</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2">
               Krishi<span className="text-brand">.AI</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
               {lang === 'bn' ? 'আপনার পাশে সবসময় - লগইন করুন' : 'Your Smart Agricultural Companion'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'text-brand border-b-4 border-brand bg-brand/5' : 'text-slate-400'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'signup' ? 'text-brand border-b-4 border-brand bg-brand/5' : 'text-slate-400'}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode('passkey')}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'passkey' ? 'text-brand border-b-4 border-brand bg-brand/5' : 'text-slate-400'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 text-[10px] font-bold rounded-xl border border-red-100 dark:border-red-800 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {mode === 'passkey' ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Passkey</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-brand transition-all text-sm font-bold"
                      placeholder="Enter Admin Passkey"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {mode === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-brand transition-all text-sm font-bold"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-brand transition-all text-sm font-bold"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-brand transition-all text-sm font-bold"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-brand text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : (mode === 'signup' ? 'Create Account' : 'Verify Passkey')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400">
           <div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand" /> Secure AI Engine</div>
           <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
           <div>v2.4.0-build</div>
        </div>
      </motion.div>
    </div>
  );
}
