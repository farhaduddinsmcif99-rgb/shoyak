import React from 'react';
import EntrepreneurHubControl from '../components/EntrepreneurHub';
import { TrendingUp, Sparkles, Target } from 'lucide-react';
import { useApp } from '../AppContext';
import SEO from '../components/SEO';

export default function EntrepreneurHubPage() {
  const { lang } = useApp();

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="উদ্যোক্তা হাব | Business Ideas Bangladesh" 
        description="নতুন ব্যবসা শুরু করার পরিকল্পনা করছেন? শায়ক এআই-এর উদ্যোক্তা হাব থেকে বিজনেস আইডিয়া, লোণ চেক এবং প্রজেক্ট ডিজাইন টুলস ব্যবহার করুন।"
        keywords="উদ্যোক্তা, ব্যবসা আইডিয়া, বিজনেস প্ল্যান, লোণ চেক, শায়ক হাব, এআই উদ্যোক্তা"
      />
      <section className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-1000">
          <Target className="w-48 h-48 text-brand" />
        </div>
        <div className="relative z-10 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 rounded-full border border-brand/30">
              <Sparkles className="w-4 h-4 text-brand" />
              <span className="text-[10px] font-black text-brand uppercase tracking-widest">{lang === 'bn' ? 'উদ্যোক্তা হাব' : 'Business Hub'}</span>
           </div>
           <h2 className="text-3xl font-black italic leading-tight">
             {lang === 'bn' ? 'আপনার সপ্নপূরণে আমরা আছি সাথে' : 'Supporting Your Entrepreneurial Dreams'}
           </h2>
           <p className="text-slate-400 text-sm font-medium">নতুন ব্যবসা শুরু করতে প্রয়োজনীয় সকল এআই টুল এখন এক জায়গায়।</p>
        </div>
      </section>

      <EntrepreneurHubControl />
    </div>
  );
}
