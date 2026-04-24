import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { MessageSquare, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, Languages, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const { t, lang } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: lang === 'bn' ? 'নমস্কার! আমি সায়োক এআই। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' : 'Hello! I am Shayok AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad' | 'anxious' | 'curious'>('neutral');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [banglaMode, setBanglaMode] = useState(lang === 'bn');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Setup Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = banglaMode ? 'bn-BD' : 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => setIsRecording(false);
      recognitionRef.current.onend = () => setIsRecording(false);
    }

    synthRef.current = window.speechSynthesis;

    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [banglaMode]);

  useEffect(() => {
    // Basic smart suggestions logic
    const lower = input.toLowerCase();
    if (lower.includes('কাজ') || lower.includes('job')) {
      setSuggestions(lang === 'bn' ? ['চাকরির খবর', 'ভবিষ্যৎ কাজের চাহিদা', 'রিমোট জবস'] : ['Latest Jobs', 'Future Job Demand', 'Remote Jobs']);
    } else if (lower.includes('চাষ') || lower.includes('farm')) {
      setSuggestions(lang === 'bn' ? ['ধানের চাষ', 'ভবিষ্যৎ বাজার দর', 'সার প্রয়োগ'] : ['Rice Farming', 'Future Market Price', 'Fertilizer Tips']);
    } else if (lower.includes('ভবিষ্যৎ') || lower.includes('future')) {
      setSuggestions(lang === 'bn' ? ['ক্যারিয়ার রোডম্যাপ', 'সাফল্যের সম্ভাবনা', 'আমার ডিজিটাল যমজ (Twin)'] : ['Career Roadmap', 'Success Probability', 'My Digital Twin']);
    } else {
      setSuggestions(lang === 'bn' ? ['ভবিষ্যৎবাণী করুন', 'আমার লক্ষ্য', 'মানসিক সহায়তা'] : ['Predict Future', 'My Life Goals', 'Need Comfort']);
    }
  }, [input, lang]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current?.start();
    }
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = banglaMode ? 'bn-BD' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Emotional detection logic
      const lowerText = textToSend.toLowerCase();
      let detectedMood: 'neutral' | 'happy' | 'sad' | 'anxious' | 'curious' = 'neutral';
      if (lowerText.includes('sad') || lowerText.includes('মন খারাপ') || lowerText.includes('বাজে')) detectedMood = 'sad';
      if (lowerText.includes('worried') || lowerText.includes('চিন্তিত') || lowerText.includes('ভয়')) detectedMood = 'anxious';
      if (lowerText.includes('happy') || lowerText.includes('ভালো') || lowerText.includes('ধন্যবাদ')) detectedMood = 'happy';
      setMood(detectedMood);

      const emotionalContext = {
        sad: "User sounds sad. Be gentle, comforting, and provide hope.",
        anxious: "User sounds anxious. Be calm, reassuring, and provide clear step-by-step guidance.",
        happy: "User sounds happy. Be enthusiastic and celebrate with them!",
        curious: "User sounds curious. Be detailed and intellectually stimulating.",
        neutral: "Be helpful and direct."
      };

      const systemPrompt = `You are Shayok.AI (Life-OS Edition), a futuristic Digital Guardian. 
      Emotion Mode: ${emotionalContext[detectedMood]}.
      Respond strictly in ${banglaMode ? 'Bangla' : 'English'}.
      Vision 2050 capabilities: You track user goals, predict market trends (rice price, job demand), and act as a digital twin.
      If user asks about future, provide predictive insights based on 2050 vision.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Message: " + textToSend }] }
        ],
      });

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.text || (banglaMode ? 'দুঃখিত, আমি বুঝতে পারছি না।' : 'Sorry, I don\'t understand.') };
      setMessages(prev => [...prev, aiMsg]);
      
      // Auto-speak if requested or common in assistant mode
      // speak(aiMsg.content); 
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: banglaMode ? 'দুঃখিত, সংযোগ বিচ্ছিন্ন হয়েছে।' : 'Sorry, connection failed.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[60vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="p-4 bg-brand text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold">{t('ai_assistant')}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] opacity-80 uppercase tracking-widest leading-none">Online</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setBanglaMode(!banglaMode)}
            className={`p-2 rounded-xl transition-all ${banglaMode ? 'bg-white text-brand' : 'bg-white/10 text-white'}`}
          >
            <Languages className="w-5 h-5" />
          </button>
          <button 
            onClick={() => speak(messages[messages.length - 1].content)}
            className={`p-2 rounded-xl transition-all ${isSpeaking ? 'bg-white text-brand' : 'bg-white/10 text-white'}`}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
        <div className="flex justify-center mb-2">
          <span className="px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 rounded-full uppercase tracking-[0.3em] shadow-sm">
            {new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'long' })}
          </span>
        </div>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-3xl flex gap-3 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-brand text-white rounded-tr-none shadow-brand/10' 
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-800'
            }`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-brand" />
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                <span className="text-[8px] opacity-40 uppercase font-bold tracking-widest">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shrink-0 order-last">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-brand rounded-full"
                  />
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thinking</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-4">
        {isRecording && (
          <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [8, 24, 8] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                className="w-1 bg-brand rounded-full opacity-60"
              />
            ))}
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap hover:bg-brand hover:text-white transition-all flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-brand" /> {s}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleRecording}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 text-white shadow-xl shadow-red-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-brand'}`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={banglaMode ? 'এখানে বার্তা লিখুন...' : 'Type message here...'}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all outline-none"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center hover:bg-brand-dark shadow-xl shadow-brand/20 disabled:opacity-50 transition-all active:scale-90"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
