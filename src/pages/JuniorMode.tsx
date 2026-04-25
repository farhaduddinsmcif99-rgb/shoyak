import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { 
  Zap, Brain, Gamepad2, PenTool, BookOpen, Clock, 
  Gamepad, Trophy, Star, Heart, Lock, Settings, 
  User, CheckCircle2, AlertCircle, Play, Sparkles,
  ArrowLeft, ArrowRight, Mic, Volume2, Shield,
  Award, Flame, Lightbulb, Coffee, Sun, Moon,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../utils/storage';
import SEO from '../components/SEO';

// --- Sub-components for Junior Mode ---

const BrainGame = ({ onComplete }: { onComplete: (points: number) => void }) => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const checkResponse = () => {
    if (parseInt(answer) === num1 + num2) {
      setFeedback('correct');
      setTimeout(() => {
        onComplete(10);
        setNum1(Math.floor(Math.random() * 10));
        setNum2(Math.floor(Math.random() * 10));
        setAnswer('');
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border-4 border-brand/20 text-center space-y-6">
      <div className="flex justify-center gap-4 text-6xl font-black italic">
        <span className="text-brand">{num1}</span>
        <span className="text-slate-300">+</span>
        <span className="text-brand">{num2}</span>
        <span className="text-slate-300">=</span>
        <span className="text-slate-300">?</span>
      </div>
      <input 
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-32 h-20 text-4xl text-center font-black rounded-3xl border-4 border-slate-100 outline-none focus:border-brand"
        autoFocus
      />
      <button 
        onClick={checkResponse}
        className="block w-full py-6 bg-brand text-white text-xl font-black rounded-[32px] shadow-xl shadow-brand/20 uppercase tracking-widest"
      >
        Check
      </button>
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className={`text-2xl font-black ${feedback === 'correct' ? 'text-emerald-500' : 'text-red-500'}`}
          >
            {feedback === 'correct' ? 'WOW! +10 Stars ⭐' : 'Try Again! 🤔'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CreativeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#059669');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2 p-4 bg-slate-100 rounded-3xl">
        {['#059669', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#000000'].map(c => (
          <button 
            key={c}
            onClick={() => setColor(c)}
            style={{ backgroundColor: c }}
            className={`w-10 h-10 rounded-full border-4 ${color === c ? 'border-white' : 'border-transparent'}`}
          />
        ))}
        <button 
          onClick={() => {
             const ctx = canvasRef.current?.getContext('2d');
             ctx?.clearRect(0, 0, 800, 400);
          }}
          className="ml-auto px-4 py-2 bg-white rounded-xl text-xs font-black uppercase tracking-widest text-slate-400"
        >
          Clear
        </button>
      </div>
      <canvas 
        ref={canvasRef}
        width={800}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-[400px] bg-white border-4 border-slate-100 rounded-[40px] cursor-crosshair shadow-inner"
      />
    </div>
  );
};

const JuniorAI = ({ onQuestion }: { onQuestion: (p: number) => void }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'শুভদিন! আমি তোমার বন্ধু শায়ক। আজ আমরা কী নিয়ে জানব? ২+২ কেন ৪ হয় তাও জিজ্ঞেস করতে পারো! 😊' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    // Reward for asking
    onQuestion(5);

    // Simple kid-friendly AI logic
    setTimeout(() => {
      let response = "Wow! That's a great question. Let's learn together! 🌟";
      if (userMsg.includes('2+2')) response = "সহজ করে বলি, তোমার কাছে ২টা চকলেট আছে, আর আমি আরও ২টা দিলাম। গুনলে দেখবে মোট ৪টা হবে! ২+২ এভাবেই ৪ হয়। 🍫";
      if (userMsg.includes('sky')) response = "আকাশ নীল কেন জানো? সূর্যের আলো যখন পৃথিবীর বাতাসে এসে পড়ে, তখন বাতাসের অণুগুলো নীল রঙটাকে চারিদিকে ছড়িয়ে দেয়। তাই আমরা আকাশ নীল দেখি! 🌤️";
      if (userMsg.includes('homework')) response = "তোমার বাড়ির কাজে সাহায্য করতে পেরে আমি খুশি! তুমি কী শিখছো আমাকে একটু বলবে? আমরা একসাথে সমাধান করব। 📚";
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-slate-900 border-4 border-purple-100 rounded-[48px] overflow-hidden shadow-2xl">
       <div className="p-6 bg-purple-500 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Volume2 className="w-6 h-6" /></div>
          <div>
            <h3 className="text-xl font-black italic">Study Buddy</h3>
            <p className="text-[10px] font-bold uppercase opacity-60">Simple AI Learning</p>
          </div>
       </div>
       <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-[28px] text-sm font-bold ${
                m.role === 'user' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tr-none' : 'bg-purple-50 text-purple-600 rounded-tl-none border border-purple-100'
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
       </div>
       <div className="p-6 border-t-4 border-purple-50 flex gap-3">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 h-14 px-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:border-purple-300 outline-none font-bold"
          />
          <button onClick={handleSend} className="w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 active:scale-90 transition-all">
             <Mic className="w-6 h-6" />
          </button>
       </div>
    </div>
  );
};

const StoryMaker = ({ onComplete }: { onComplete: (p: number) => void }) => {
  const [character, setCharacter] = useState('');
  const [setting, setSetting] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = () => {
    setLoading(true);
    setTimeout(() => {
      setStory(`Once upon a time, ${character} went to ${setting}. It was a magical day where ${character} found a giant golden egg. Inside the egg was a map to a hidden treasure of chocolate stars! ${character} lived happily ever after.`);
      setLoading(false);
      onComplete(25);
    }, 1500);
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-900 rounded-[48px] border-4 border-emerald-100 dark:border-emerald-900/50 space-y-6">
      <div className="space-y-4">
        <input 
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          placeholder="Who is the hero? (e.g. A Brave Cat)"
          className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-emerald-300 outline-none font-bold"
        />
        <input 
          value={setting}
          onChange={(e) => setSetting(e.target.value)}
          placeholder="Where are they? (e.g. The Moon)"
          className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-emerald-300 outline-none font-bold"
        />
        <button 
          onClick={generateStory}
          disabled={loading || !character || !setting}
          className="w-full py-4 bg-emerald-500 text-white font-black rounded-3xl uppercase tracking-widest shadow-xl shadow-emerald-500/20"
        >
          {loading ? 'Writing Story...' : 'Create Story ✨'}
        </button>
      </div>
      {story && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-emerald-50 text-emerald-800 rounded-3xl border-2 border-emerald-100 italic leading-relaxed">
          {story}
        </motion.div>
      )}
    </div>
  );
};

const VideoCreator = ({ onComplete }: { onComplete: (p: number) => void }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    { text: "Once in a digital world...", image: "https://picsum.photos/seed/j1/800/600" },
    { text: "A tiny hero was born.", image: "https://picsum.photos/seed/j2/800/600" },
    { text: "They learned to code magic.", image: "https://picsum.photos/seed/j3/800/600" },
    { text: "And saved the day!", image: "https://picsum.photos/seed/j4/800/600" }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setVideoUrl(null);
    setCurrentScene(0);
    setTimeout(() => {
      setIsGenerating(false);
      setVideoUrl('done');
      onComplete(50);
    }, 3000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (videoUrl === 'done') {
      timer = setInterval(() => {
        setCurrentScene(prev => (prev + 1) % scenes.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [videoUrl]);

  return (
    <div className="p-8 bg-white dark:bg-slate-900 rounded-[48px] border-4 border-indigo-100 dark:border-indigo-900/50 space-y-6">
       {!videoUrl && !isGenerating && (
          <div className="space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <Video className="w-6 h-6 text-indigo-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">AI Video Gen (Junior)</span>
             </div>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Describe your cartoon... (e.g. A flying fish in space)"
               className="w-full h-32 p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 outline-none focus:border-indigo-300 font-bold resize-none"
             />
             <button 
               onClick={handleGenerate}
               disabled={!prompt}
               className="w-full py-6 bg-indigo-600 text-white font-black rounded-[32px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
             >
                GENERATE MINI CARTOON 🎬
             </button>
          </div>
       )}

       {isGenerating && (
          <div className="h-64 flex flex-col items-center justify-center space-y-6">
             <div className="relative">
                <div className="w-16 h-16 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400 animate-pulse" />
             </div>
             <p className="text-xl font-black italic text-indigo-600 animate-pulse">AI is drawing your world...</p>
          </div>
       )}

       {videoUrl === 'done' && (
          <div className="space-y-6">
             <div className="relative aspect-video rounded-[40px] overflow-hidden border-8 border-slate-900 shadow-2xl">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={currentScene}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="relative h-full bg-slate-800 flex items-center justify-center text-indigo-400"
                   >
                       <Video className="w-16 h-16 opacity-20" />
                       <div className="absolute inset-x-0 bottom-0 p-8 bg-black/60 backdrop-blur-md text-white text-center">
                          <p className="text-xl font-black italic">"{scenes[currentScene].text}"</p>
                       </div>
                   </motion.div>
                </AnimatePresence>
                <div className="absolute top-4 right-4 px-4 py-2 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-full">
                   Scene {currentScene + 1}/4
                </div>
             </div>
             <button 
               onClick={() => setVideoUrl(null)}
               className="w-full py-4 bg-slate-100 text-slate-400 font-black rounded-[32px] uppercase tracking-widest"
             >
                CREATE ANOTHER 🔄
             </button>
          </div>
       )}
    </div>
  );
};

const MemoryGame = ({ onComplete }: { onComplete: (p: number) => void }) => {
  const icons = ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const [cards, setCards] = useState<{ id: number, icon: string, flipped: boolean, solved: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    const doubled = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({ id: i, icon, flipped: false, solved: false }));
    setCards(doubled);
  }, []);

  const handleClick = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].solved) return;
    
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]].icon === cards[newFlipped[1]].icon) {
        setTimeout(() => {
          const solvedCards = [...cards];
          solvedCards[newFlipped[0]].solved = true;
          solvedCards[newFlipped[1]].solved = true;
          setCards(solvedCards);
          setFlipped([]);
          if (solvedCards.every(c => c.solved)) onComplete(30);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[newFlipped[0]].flipped = false;
          resetCards[newFlipped[1]].flipped = false;
          setCards(resetCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map(card => (
        <div 
          key={card.id}
          onClick={() => handleClick(card.id)}
          className={`aspect-square rounded-2xl flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${
            card.flipped || card.solved ? 'bg-white rotate-y-180 border-4 border-brand shadow-lg' : 'bg-brand'
          }`}
        >
          {(card.flipped || card.solved) ? card.icon : '?'}
        </div>
      ))}
    </div>
  );
};

const BreathingExercise = () => {
  const [phase, setPhase] = useState<'In' | 'Hold' | 'Out'>('In');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => {
        if (prev <= 1) {
          if (phase === 'In') { setPhase('Hold'); return 4; }
          if (phase === 'Hold') { setPhase('Out'); return 4; }
          if (phase === 'Out') { setPhase('In'); return 4; }
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <motion.div 
        animate={{ scale: phase === 'In' ? 1.5 : phase === 'Out' ? 1 : 1.5 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-48 h-48 bg-emerald-500/20 rounded-full flex items-center justify-center relative"
      >
        <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-4xl shadow-2xl">
          {counter}
        </div>
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-ping opacity-20" />
      </motion.div>
      <div className="text-center">
        <h3 className="text-4xl font-black italic uppercase tracking-tighter text-emerald-600">{phase === 'In' ? 'Breathe In' : phase === 'Hold' ? 'Hold' : 'Breathe Out'}</h3>
        <p className="text-slate-400 font-bold mt-2">Let all your stress float away like a cloud ☁️</p>
      </div>
    </div>
  );
};

export default function JuniorMode() {
  const { lang, user } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'create' | 'play' | 'parent'>('home');
  const [points, setPoints] = useState(() => storage.get('junior_points') || 150);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [showExitLock, setShowExitLock] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [showZen, setShowZen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [lockCode, setLockCode] = useState('');
  const [badges, setBadges] = useState<string[]>(['Star Learner']);
  const [floatingPoints, setFloatingPoints] = useState<number | null>(null);

  const getLevel = () => {
    if (points >= 1000) return { name: 'Genius', color: 'bg-indigo-500', icon: Award };
    if (points >= 500) return { name: 'Smart', color: 'bg-brand', icon: Sparkles };
    return { name: 'Beginner', color: 'bg-slate-400', icon: User };
  };

  const level = getLevel();

  const facts = [
     { id: 1, title: 'Honey is the only food that never expires!', icon: '🍯' },
     { id: 2, title: 'Bees have 5 eyes!', icon: '🐝' },
     { id: 3, title: 'Bananas are berries, but strawberries are not!', icon: '🍌' },
     { id: 4, title: 'A day on Venus is longer than a year on Venus!', icon: '🪐' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        
        // AI Behavior Tracker Logic
        if (prev === 5400) { // 30 mins used
           alert("You've used phone 30 mins. Time for a 5 min break! 🧘");
        }
        if (prev === 3600) { // 1 hour used
           alert("You've been playing a lot! Why not recreate a story? ✍️");
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTaskComplete = (p: number) => {
    setPoints(prev => {
      const newPoints = prev + p;
      storage.set('junior_points', newPoints);
      return newPoints;
    });
    setFloatingPoints(p);
    setTimeout(() => setFloatingPoints(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-slate-950 font-sans selection:bg-brand selection:text-white">
      <SEO 
        title="Junior Mode" 
        description="A safe, gamified space for children to learn, create, and play with AI-powered guidance in Bangladesh."
      />
      {/* Junior Header */}
      <nav className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20">
              <Zap className="w-8 h-8" />
           </div>
           <div>
              <h1 className="text-2xl font-black italic tracking-tighter">SHAYOK <span className="text-brand">JUNIOR</span></h1>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Learning Playground</p>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden sm:flex h-14 px-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] items-center gap-3 shadow-sm">
              <level.icon className={`w-5 h-5 ${level.color} text-white p-1 rounded-full`} />
              <span className="text-xs font-black uppercase tracking-widest">{level.name}</span>
           </div>
           <div className="relative h-14 px-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] flex items-center gap-3 shadow-sm">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-xl font-black">{points}</span>
              <AnimatePresence>
                {floatingPoints && (
                  <motion.span 
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -40, opacity: 0 }}
                    key="float"
                    className="absolute right-0 top-0 text-brand font-black z-50 pointer-events-none"
                  >
                    +{floatingPoints}
                  </motion.span>
                )}
              </AnimatePresence>
           </div>
           <button 
             onClick={() => setShowExitLock(true)}
             className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all shadow-sm"
           >
              <Settings className="w-6 h-6" />
           </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="col-span-2 p-8 bg-slate-900 rounded-[48px] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full group-hover:scale-125 transition-all duration-1000" />
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Clock className="w-6 h-6 text-brand" />
                       <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Play Time Remaining</h3>
                    </div>
                    <span className="text-3xl font-black italic">{formatTime(timeLeft)}</span>
                 </div>
                 <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand"
                      initial={{ width: 0 }}
                      animate={{ width: `${(timeLeft / 7200) * 100}%` }}
                    />
                 </div>
                 <p className="text-slate-400 text-xs font-bold leading-relaxed">
                   "You've been doing great today! Remember to take a break after every 30 minutes to rest your eyes. 👀"
                 </p>
              </div>
           </div>

           <div className="p-8 bg-brand rounded-[48px] text-white flex flex-col justify-between group">
              <div className="space-y-2">
                 <h3 className="text-2xl font-black italic leading-tight">Daily Challenge</h3>
                 <p className="text-brand-dark/60 text-xs font-bold uppercase tracking-widest">Earn 50 Stars ⭐</p>
              </div>
              <div className="space-y-3">
                 <div className="p-4 bg-white/20 rounded-3xl flex items-center gap-3 border border-white/20">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-tight">Complete Daily Challenge</span>
                 </div>
                 <button 
                  onClick={() => handleTaskComplete(50)}
                  className="w-full py-4 bg-white text-brand font-black rounded-3xl uppercase tracking-widest shadow-xl shadow-brand/20 group-hover:scale-105 active:scale-95 transition-all"
                 >
                    CLAIM 50 STARS
                 </button>
              </div>
           </div>
        </div>

        {/* Junior Navigation */}
        <div className="flex justify-center gap-4 py-4">
           {[
             { id: 'home', icon: zapIcon, label: 'Hub' },
             { id: 'learn', icon: brainIcon, label: 'Learn' },
             { id: 'create', icon: penIcon, label: 'Create' },
             { id: 'play', icon: gamepadIcon, label: 'Play' }
           ].map((tab: any) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-3 px-8 py-4 rounded-[32px] transition-all font-black text-xs uppercase tracking-widest ${
                 activeTab === tab.id 
                   ? 'bg-slate-900 text-white shadow-2xl scale-110' 
                   : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 border-2 border-slate-100 dark:border-slate-800'
               }`}
             >
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 ${activeTab === tab.id ? 'text-brand' : 'text-slate-400'}`}>
                  {tab.id === 'home' && <Zap className="w-5 h-5" />}
                  {tab.id === 'learn' && <Brain className="w-5 h-5" />}
                  {tab.id === 'create' && <PenTool className="w-5 h-5" />}
                  {tab.id === 'play' && <Gamepad2 className="w-5 h-5" />}
                </div>
                {tab.label}
             </button>
           ))}
        </div>

        {/* Active View */}
        <div className="py-8">
           <AnimatePresence mode="wait">
             {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[56px] border-4 border-blue-100 dark:border-blue-800/50 space-y-6">
                      <div className="w-16 h-16 bg-blue-500 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                         <BookOpen className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-black italic">Story Mode</h3>
                         <p className="text-slate-500 text-xs font-bold leading-relaxed">
                           Explore magical stories from Bangladesh. Learn moral values while having fun!
                         </p>
                      </div>
                      <button 
                        onClick={() => { setShowStory(true); handleTaskComplete(10); }}
                        className="w-full py-4 bg-white dark:bg-slate-800 text-blue-600 font-black rounded-[32px] border-4 border-blue-100 dark:border-blue-800"
                      >
                         READ NOW +10 ⭐
                      </button>
                   </div>

                   <div className="p-8 bg-purple-50 dark:bg-purple-900/20 rounded-[56px] border-4 border-purple-100 dark:border-purple-800/50 space-y-6">
                      <div className="w-16 h-16 bg-purple-500 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                         <Sparkles className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-black italic">AI Study Buddy</h3>
                         <p className="text-slate-500 text-xs font-bold leading-relaxed">
                           Ask any homework question in Bangla. I explain things simply for you!
                         </p>
                      </div>
                      <button 
                        onClick={() => setShowAI(true)}
                        className="w-full py-4 bg-white dark:bg-slate-800 text-purple-600 font-black rounded-[32px] border-4 border-purple-100 dark:border-purple-800"
                      >
                         ASK ME
                      </button>
                   </div>

                   <div className="p-8 bg-brand/5 dark:bg-brand/10 rounded-[56px] border-4 border-brand/10 dark:border-brand/20 space-y-6">
                      <div className="w-16 h-16 bg-brand rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-brand/20">
                         <Star className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-black italic">Scroll-to-Learn</h3>
                         <p className="text-slate-500 text-xs font-bold leading-relaxed">
                           Short, fun facts about history, science, and the world. Swipe for next!
                         </p>
                      </div>
                      <button 
                        onClick={() => { setShowFacts(true); handleTaskComplete(10); }}
                        className="w-full py-4 bg-white dark:bg-slate-800 text-brand font-black rounded-[32px] border-4 border-brand/10"
                      >
                         DIVE IN +10 ⭐
                      </button>
                   </div>
                </motion.div>
             )}

             {activeTab === 'play' && (
                <motion.div key="play" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                         <h2 className="text-3xl font-black italic uppercase tracking-widest text-brand">Math Speed Quest 🚀</h2>
                         <BrainGame onComplete={handleTaskComplete} />
                      </div>
                      <div className="space-y-8">
                         <h2 className="text-3xl font-black italic uppercase tracking-widest text-indigo-500">Memory Match 🧩</h2>
                         <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border-4 border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                            <MemoryGame onComplete={handleTaskComplete} />
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'create' && (
                <motion.div key="create" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 pb-20">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-8 text-center">
                         <h2 className="text-3xl font-black italic uppercase tracking-widest text-brand">Drawing Studio 🎨</h2>
                         <CreativeCanvas />
                      </div>
                      <div className="space-y-8 text-center">
                         <h2 className="text-3xl font-black italic uppercase tracking-widest text-emerald-500">Story Maker ✍️</h2>
                         <StoryMaker onComplete={handleTaskComplete} />
                      </div>
                   </div>
                   <div className="max-w-4xl mx-auto space-y-8 text-center">
                      <h2 className="text-3xl font-black italic uppercase tracking-widest text-indigo-500">AI Video Creator 📽️</h2>
                      <VideoCreator onComplete={handleTaskComplete} />
                   </div>
                </motion.div>
              )}

             {activeTab === 'learn' && (
                <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-8 bg-amber-50 rounded-[48px] border-4 border-amber-100 space-y-4">
                         <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white"><Trophy className="w-6 h-6" /></div>
                            <h3 className="text-2xl font-black italic">Daily Quiz</h3>
                         </div>
                         <p className="text-slate-500 text-sm font-bold">Answer 5 quick questions about history. Earn 50 Stars!</p>
                         <button className="px-6 py-3 bg-white text-amber-600 font-black rounded-2xl border-4 border-amber-100">PLAY QUIZ</button>
                      </div>
                      <div className="p-8 bg-emerald-50 rounded-[48px] border-4 border-emerald-100 space-y-4">
                         <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white"><Heart className="w-6 h-6" /></div>
                            <h3 className="text-2xl font-black italic">Calm Mode</h3>
                         </div>
                         <p className="text-slate-500 text-sm font-bold">Take 2 minutes to breathe and relax. Listen to rain sounds.</p>
                         <button 
                           onClick={() => { setShowZen(true); handleTaskComplete(10); }}
                           className="px-6 py-3 bg-white text-emerald-600 font-black rounded-2xl border-4 border-emerald-100"
                         >
                            START ZEN +10 ⭐
                         </button>
                      </div>
                      <div className="p-8 bg-indigo-50 rounded-[48px] border-4 border-indigo-100 space-y-4">
                         <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white"><Play className="w-6 h-6" /></div>
                            <h3 className="text-2xl font-black italic">Skill Feed</h3>
                         </div>
                         <p className="text-slate-500 text-sm font-bold">Watch short educational videos and learn new skills!</p>
                         <button 
                           onClick={() => { setShowContent(true); handleTaskComplete(10); }}
                           className="px-6 py-3 bg-white text-indigo-600 font-black rounded-2xl border-4 border-indigo-100"
                         >
                            WATCH NOW +10 ⭐
                         </button>
                      </div>
                   </div>
                </motion.div>
             )}

             {activeTab === 'parent' && (
                <motion.div key="parent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-slate-900 rounded-[56px] text-white space-y-6">
                         <div className="flex items-center gap-4">
                            <Settings className="w-8 h-8 text-brand" />
                            <h3 className="text-2xl font-black italic">Parent Controls</h3>
                         </div>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl">
                               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Daily Screen Limit</span>
                               <span className="text-xl font-black italic text-brand">2.5 Hours</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl">
                               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Junior AI Access</span>
                               <div className="w-12 h-6 bg-brand rounded-full relative">
                                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="p-10 bg-white dark:bg-slate-900 rounded-[56px] border-4 border-slate-100 dark:border-slate-800 space-y-6">
                         <h3 className="text-2xl font-black italic">Activity Report</h3>
                         <div className="space-y-3">
                            {[
                               { label: 'Math Games', time: '45 mins', score: '+120 Stars' },
                               { label: 'Story Reader', time: '20 mins', score: '+50 Stars' }
                            ].map((row, i) => (
                               <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                                  <span className="text-sm font-bold">{row.label}</span>
                                  <div className="text-right">
                                     <p className="text-xs font-black text-brand">{row.time}</p>
                                     <p className="text-[10px] font-bold text-slate-400">{row.score}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
      </main>

      {/* Exit Lock Modal */}
      <AnimatePresence>
        {showAI && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[110] flex items-center justify-center p-6">
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-2xl relative">
                <button onClick={() => setShowAI(false)} className="absolute -top-16 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 font-black">X</button>
                <JuniorAI onQuestion={handleTaskComplete} />
             </motion.div>
          </motion.div>
        )}

        {showFacts && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-brand/90 backdrop-blur-3xl z-[110] flex items-center justify-center p-6 text-white">
             <div className="w-full max-w-md text-center space-y-12">
                <button onClick={() => setShowFacts(false)} className="absolute top-8 right-8 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center font-black">X</button>
                <div className="text-[120px] animate-bounce">{facts[currentFact].icon}</div>
                <h2 className="text-4xl font-black italic tracking-tighter leading-tight">{facts[currentFact].title}</h2>
                <div className="flex justify-center gap-4">
                   <button 
                    onClick={() => setCurrentFact(prev => (prev === 0 ? facts.length - 1 : prev - 1))}
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"
                   >
                     <ArrowLeft className="w-8 h-8" />
                   </button>
                   <button 
                    onClick={() => setCurrentFact(prev => (prev === facts.length - 1 ? 0 : prev + 1))}
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"
                   >
                     <ArrowRight className="w-8 h-8" />
                   </button>
                </div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Swipe for next fact</p>
             </div>
          </motion.div>
        )}

        {showStory && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white dark:bg-slate-950 z-[110] flex flex-col p-12">
              <button onClick={() => setShowStory(false)} className="self-end w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center font-black mb-12">X</button>
              <div className="max-w-3xl mx-auto space-y-12 overflow-y-auto no-scrollbar">
                 <div className="space-y-4 text-center">
                    <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">Adventure Story</span>
                    <h2 className="text-6xl font-black italic tracking-tighter leading-none">The Brave Little Kingfisher 🦜</h2>
                 </div>
                 <div className="text-3xl font-medium leading-[1.6] text-slate-600 dark:text-slate-300 italic text-center px-12">
                    "একদা এক গ্রামে নীলু নামের এক ছোট্ট মাছরাঙা থাকত। তার গায়ের রঙ ছিল আকাশের মতো নীল..."
                 </div>
                 <p className="text-xl font-medium text-slate-500 leading-loose text-center">
                    While everyone else was afraid of the storm, Nilu decided to help the other birds find a safe shelter. Nilu knew that being brave wasn't about not being afraid, but about helping others even when you are.
                 </p>
                 <div className="h-64 bg-slate-50 rounded-[64px] border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-300 italic font-black uppercase tracking-widest">
                    [ Interactive Story Illustration ]
                 </div>
                 <button className="w-full py-8 bg-blue-600 text-white rounded-[48px] text-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-500/40">
                    NEXT CHAPTER
                 </button>
              </div>
           </motion.div>
        )}

        {showZen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#F0FDF4] dark:bg-slate-950 z-[120]">
             <button onClick={() => setShowZen(false)} className="absolute top-8 right-8 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center font-black">X</button>
             <BreathingExercise />
          </motion.div>
        )}

        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[120] flex items-center justify-center p-6">
             <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[56px] overflow-hidden p-8 space-y-8 relative">
                <button onClick={() => setShowContent(false)} className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black">X</button>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Skill Feed 📺</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { title: 'How to make a paper bird', duration: '5:30', views: '2k' },
                     { title: 'Why is exercise important?', duration: '3:15', views: '5k' }
                   ].map((vid, i) => (
                      <div key={i} className="space-y-4">
                         <div className="aspect-video bg-slate-200 rounded-3xl flex items-center justify-center text-slate-400">
                            <Play className="w-12 h-12" />
                         </div>
                         <div className="flex justify-between items-start px-2">
                            <h4 className="font-black text-sm italic">{vid.title}</h4>
                            <span className="text-[10px] font-bold text-slate-400">{vid.duration}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>
        )}

        {showExitLock && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[56px] border-8 border-brand/20 p-12 text-center space-y-8"
            >
              <div className="w-20 h-20 bg-brand/10 text-brand rounded-[40px] flex items-center justify-center mx-auto">
                 <Lock className="w-10 h-10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black italic uppercase">Parent Lock</h3>
                <p className="text-slate-500 text-sm font-bold">Solve this math problem to exit Junior Mode.</p>
              </div>

              <div className="text-5xl font-black italic py-4">
                 12 <span className="text-brand">x</span> 3 <span className="text-slate-300">=</span> ?
              </div>

              <input 
                type="number"
                value={lockCode}
                onChange={(e) => setLockCode(e.target.value)}
                placeholder="Answer"
                className="w-full p-6 bg-slate-50 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-800 rounded-3xl text-center text-2xl font-black outline-none focus:border-brand"
              />

              <div className="flex gap-4">
                 <button 
                  onClick={() => {
                    setShowExitLock(false);
                    setLockCode('');
                  }}
                  className="flex-1 py-4 bg-slate-100 rounded-3xl font-black text-xs uppercase tracking-widest text-slate-400"
                 >
                   Cancel
                 </button>
                 <button 
                  onClick={() => {
                    if (lockCode === '36') window.location.href = '/hub';
                  }}
                  className="flex-1 py-4 bg-brand text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand/20"
                 >
                   Exit Now
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Minimal icon constants to avoid repeated imports in this block
const zapIcon = <Zap className="w-5 h-5" />;
const brainIcon = <Brain className="w-5 h-5" />;
const penIcon = <PenTool className="w-5 h-5" />;
const gamepadIcon = <Gamepad2 className="w-5 h-5" />;
