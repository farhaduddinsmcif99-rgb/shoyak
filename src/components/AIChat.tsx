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
      setSuggestions(lang === 'bn' ? ['চাকরির খবর', 'রিমোট জবস', 'পার্ট টাইম কাজ'] : ['Latest Jobs', 'Remote Jobs', 'Part-time Work']);
    } else if (lower.includes('চাষ') || lower.includes('farm')) {
      setSuggestions(lang === 'bn' ? ['ধানের চাষ', 'পোকা দমন', 'সার প্রয়োগ'] : ['Rice Farming', 'Pest Control', 'Fertilizer Tips']);
    } else {
      setSuggestions([]);
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
      const systemPrompt = `You are Shayok.AI, a helpful assistant for Bangladeshi citizens. Tagline: "আপনার পাশে, সবসময়". 
      Talk friendly and culturally appropriate. Respond STRICTLY in ${banglaMode ? 'Bangla' : 'English'}. 
      Key user groups: Farmers (Krishi), Entrepreneurs, Students.
      Stay helpful, respectful, and informative about Bangladesh.`;

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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="flex justify-center mb-2">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 rounded-full uppercase tracking-widest">
            Today
          </span>
        </div>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 ${
              msg.role === 'user' 
                ? 'bg-brand text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
            }`}>
              {msg.role === 'assistant' && <Bot className="w-5 h-5 shrink-0 mt-1" />}
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700">
              <Loader2 className="w-5 h-5 animate-spin text-brand" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 space-y-3">
        {suggestions.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-brand/20 text-brand text-[10px] font-bold rounded-xl whitespace-nowrap hover:bg-brand hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" /> {s}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-2xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={banglaMode ? 'এখানে বার্তা লিখুন...' : 'Type message here...'}
            className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm focus:border-brand transition-all outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 bg-brand text-white rounded-2xl hover:bg-brand-dark shadow-lg shadow-brand/20 disabled:opacity-50 transition-all"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
