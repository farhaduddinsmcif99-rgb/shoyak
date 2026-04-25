import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { 
  Search, Filter, Sparkles, Send, Loader2, FileText, ChevronRight, Bookmark, ThumbsUp, 
  BarChart as BarChartIcon, PieChart as PieChartIcon,
  Youtube, Layout, Hash, Lightbulb, User, TrendingUp, Minimize2, Presentation,
  Target, Sprout, Thermometer, Calculator, Activity, Droplets,
  Check, Snowflake, Globe, DollarSign, Edit, Box, Truck, Shield, Users,
  BookOpen, CheckCircle, Code, Zap, Heart, Coffee, Book, Sun, Bell, PlusSquare,
  AlertTriangle, Map, Home, List, Gift, Film, Utensils, RefreshCcw, Wind, Bug,
  Database, Terminal, Code2, Palette, FileJson, Repeat, Type, Figma,
  Megaphone, Mail, Star, ShoppingBag, Link, ShieldCheck as ShieldPlayIcon, Smartphone, Calendar,
  Award, Video, Linkedin, Twitter, Lock, AlertCircle, CornerUpLeft, Briefcase, GraduationCap,
  Play, Mic, ArrowRight
} from 'lucide-react';

const Icons: any = {
  FileText, Youtube, Search, Layout, Hash, Lightbulb, User, TrendingUp, Minimize2, Presentation,
  BarChart: BarChartIcon, Target, PieChart: PieChartIcon, Sprout, Thermometer, Calculator, Activity, Droplets,
  Check, Snowflake, Globe, DollarSign, Edit, Box, Truck, Shield, Users,
  BookOpen, CheckCircle, Code, Zap, Heart, Coffee, Book, Sun, Bell, PlusSquare,
  AlertTriangle, Map, Home, List, Gift, Film, Utensils, RefreshCcw, Wind, Bug,
  Database, Terminal, Code2, Palette, FileJson, Repeat, Type, Figma,
  Megaphone, Mail, Send, Star, ShoppingBag, Link, ShieldPlay: ShieldPlayIcon, Smartphone, Calendar,
  Award, Video, Linkedin, Twitter, Lock, AlertCircle, CornerUpLeft, Briefcase, GraduationCap
};
import { aiTools, AITool } from '../data/tools';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AIToolbox() {
  const { t, lang, favorites, toggleFavorite, recentlyUsed, addRecentlyUsed } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'content' | 'seo' | 'business' | 'utility' | 'social' | 'favorites'>('all');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [chartData, setChartData] = useState<any>(null);
  const [slidesData, setSlidesData] = useState<any[] | null>(null);
  const [videoData, setVideoData] = useState<any[] | null>(null);
  const [paletteData, setPaletteData] = useState<any[] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'recent'>('all');

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = (lang === 'bn' ? tool.name_bn : tool.name_en).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' 
      ? true 
      : category === 'favorites' 
        ? favorites.includes(tool.id) 
        : tool.category === category;
    return matchesSearch && matchesCategory;
  });

  const recentTools = recentlyUsed
    .map(id => aiTools.find(tool => tool.id === id))
    .filter(Boolean) as AITool[];

  const handleToolSelect = (tool: AITool) => {
    setSelectedTool(tool);
    addRecentlyUsed(tool.id);
  };

  const parseSpecialData = (text: string) => {
    // Check for charts
    const chartMatch = text.match(/```chart\n([\s\S]*?)\n```/);
    if (chartMatch) {
      try {
        const data = JSON.parse(chartMatch[1]);
        setChartData(data);
        text = text.replace(chartMatch[0], '');
      } catch (e) {
        console.error('Failed to parse chart data', e);
      }
    } else {
      setChartData(null);
    }

    // Check for slides
    const slidesMatch = text.match(/```slides\n([\s\S]*?)\n```/);
    if (slidesMatch) {
      try {
        const data = JSON.parse(slidesMatch[1]);
        setSlidesData(data);
        setCurrentSlide(0);
        text = text.replace(slidesMatch[0], '');
      } catch (e) {
        console.error('Failed to parse slides data', e);
      }
    } else {
      setSlidesData(null);
    }

    // Check for video
    const videoMatch = text.match(/```video\n([\s\S]*?)\n```/);
    if (videoMatch) {
      try {
        const data = JSON.parse(videoMatch[1]);
        setVideoData(data);
        setCurrentScene(0);
        setIsPlaying(false);
        text = text.replace(videoMatch[0], '');
      } catch (e) {
        console.error('Failed to parse video data', e);
      }
    } else {
      setVideoData(null);
    }

    // Check for palette
    const paletteMatch = text.match(/```palette\n([\s\S]*?)\n```/);
    if (paletteMatch) {
      try {
        const data = JSON.parse(paletteMatch[1]);
        setPaletteData(data.palette || data);
        text = text.replace(paletteMatch[0], '');
      } catch (e) {
        console.error('Failed to parse palette data', e);
      }
    } else {
      setPaletteData(null);
    }

    return text;
  };

  const generateOutput = async () => {
    if (!input.trim() || generating || !selectedTool) return;
    setGenerating(true);
    setOutput('');
    setChartData(null);
    setSlidesData(null);
    setVideoData(null);
    setPaletteData(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let specialInstructions = '';
      if (selectedTool.id === 'presentation-maker') {
        specialInstructions = `
        CRITICAL: Provide the presentation as a JSON block in the 'slides' format.
        Format:
        \`\`\`slides
        [
          { "type": "title", "title": "Main Topic", "subtitle": "Presentation Overview" },
          { "type": "bullets", "title": "Key Points", "items": ["Point 1", "Point 2"] },
          { "type": "image", "title": "Visual Analysis", "content": "Analysis text", "imageUrl": "https://picsum.photos/seed/slide/800/600" },
          { "type": "quote", "text": "Inspirational quote here", "author": "Famous Person" }
        ]
        \`\`\`
        Create exactly 15 to 16 high-quality, content-rich slides covering the topic in depth. Mix and match slide types for variety.`;
      }

      if (selectedTool.id === 'ai-story-teller' || selectedTool.id === 'whiteboard-animator' || selectedTool.id === 'text-to-video') {
        specialInstructions = `
        CRITICAL: Provide the video screenplay as a JSON block in the 'video' format.
        Format:
        \`\`\`video
        [
          { "scene": 1, "text": "Dialogue or narration here", "image": "https://picsum.photos/seed/scene1/800/600", "duration": 5000, "style": "whiteboard" },
          { "scene": 2, "text": "Next scene description", "image": "https://picsum.photos/seed/scene2/800/600", "duration": 4000, "style": "story" }
        ]
        \`\`\`
        The video should have 5-8 scenes. Be creative with the narration. Style should be '${selectedTool.id === 'whiteboard-animator' ? 'whiteboard' : selectedTool.id === 'text-to-video' ? 'ai-motion' : 'cinematic'}'.`;
      }

      if (selectedTool.id === 'business-plan') {
        specialInstructions = `
        CRITICAL: You MUST include a detailed section titled 'Market Analysis'.
        The 'Market Analysis' section MUST strictly contain the following subsections:
        1. ### Target Audience: Define the primary and secondary customer segments in detail (demographics, psychographics, etc.).
        2. ### Competitor Analysis: Identify at least 3 major competitors and their strengths/weaknesses compared to this business.
        3. ### SWOT Analysis: Provide a complete SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for the business. Use a clean Markdown table format for the SWOT analysis.
        
        Also include other standard business plan elements like Executive Summary, Revenue Model, and Marketing Strategy.`;
      }

      if (selectedTool.id === 'color-palette') {
        specialInstructions = `
        CRITICAL: Provide the color palette as a JSON block in the 'palette' format.
        Format:
        \`\`\`palette
        {
          "palette": [
            { "name": "Primary", "hex": "#HEXCODE", "usage": "Backgrounds" },
            { "name": "Secondary", "hex": "#HEXCODE", "usage": "Buttons" }
          ]
        }
        \`\`\`
        Create a cohesive palette of 5-6 colors based on the user's theme. Include contrast ratios if possible.`;
      }

      const prompt = `You are a professional AI tool: ${selectedTool.name_en}. 
      Task: ${selectedTool.description_en}.
      User Input: "${input}"
      Output in: ${lang === 'bn' ? 'Bangla' : 'English'}.
      
      CRITICAL INSTRUCTIONS:
      1. Provide high-quality, professional Markdown output (using tables, headings, lists).
      2. If appropriate for the tool (like reports, analysis, data viz), include a data block in this exact format at the end of your response:
      \`\`\`chart
      { "type": "bar", "data": [{"name": "Label1", "value": 100}, {"name": "Label2", "value": 200}] }
      \`\`\`
      ${specialInstructions}
      3. No conversational filler. Just the professional result.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const rawText = response.text || 'Error generating content.';
      const cleanedText = parseSpecialData(rawText);
      setOutput(cleanedText);
    } catch (error) {
      console.error(error);
      setOutput('Generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  const COLORS = ['#00A651', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  const SlideViewer = ({ slides }: { slides: any[] }) => {
    const [viewMode, setViewMode] = useState<'single' | 'board'>('single');
    const slide = slides[currentSlide];

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setViewMode('single')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'single' ? 'bg-white dark:bg-slate-600 shadow-sm text-brand' : 'text-slate-400'}`}
              >
                Presenter
              </button>
              <button 
                onClick={() => setViewMode('board')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'board' ? 'bg-white dark:bg-slate-600 shadow-sm text-brand' : 'text-slate-400'}`}
              >
                Slide Board
              </button>
           </div>
           <div className="px-4 py-1.5 bg-brand/10 rounded-lg border border-brand/20 text-[10px] font-black text-brand uppercase tracking-widest leading-none">
              {slides.length} Deep Intelligence Slides
           </div>
        </div>

        {viewMode === 'single' ? (
          <div className="relative w-full aspect-video bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl flex flex-col group/slides">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex-1 p-12 flex flex-col justify-center text-white"
              >
                {slide.type === 'title' && (
                  <div className="text-center space-y-4">
                    <motion.h1 
                      initial={{ y: 20 }} animate={{ y: 0 }}
                      className="text-5xl md:text-7xl font-black italic tracking-tighter text-brand"
                    >
                      {slide.title}
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-medium">{slide.subtitle}</p>
                    <div className="w-24 h-1.5 bg-brand mx-auto rounded-full mt-8"></div>
                  </div>
                )}

                {slide.type === 'bullets' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4">
                      <span className="w-12 h-1 bg-brand rounded-full"></span>
                      {slide.title}
                    </h2>
                    <ul className="space-y-4 ml-16">
                      {slide.items.map((item: string, i: number) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xl md:text-2xl text-slate-300 flex items-center gap-4"
                        >
                          <div className="w-2 h-2 bg-brand rounded-full"></div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {slide.type === 'image' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
                      <p className="text-lg md:text-xl text-slate-400 leading-relaxed">{slide.content}</p>
                    </div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl flex items-center justify-center bg-slate-800">
                      <Layout className="w-16 h-16 text-slate-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    </div>
                  </div>
                )}

                {slide.type === 'quote' && (
                  <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="text-6xl text-brand font-serif italic">"</div>
                    <blockquote className="text-3xl md:text-4xl font-medium leading-tight italic text-slate-100">
                      {slide.text}
                    </blockquote>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-1 bg-brand rounded-full mb-4"></div>
                      <cite className="not-italic text-brand font-black uppercase tracking-[0.3em] text-sm">
                        {slide.author}
                      </cite>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-0 right-0 px-12 flex justify-between items-center opacity-0 group-hover/slides:opacity-100 transition-opacity">
               <div className="flex gap-2">
                 <button onClick={prevSlide} className="p-3 bg-white/10 hover:bg-brand text-white rounded-2xl transition-all backdrop-blur-md">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                 </button>
                 <button onClick={nextSlide} className="p-3 bg-white/10 hover:bg-brand text-white rounded-2xl transition-all backdrop-blur-md">
                    <ChevronRight className="w-5 h-5" />
                 </button>
               </div>
               <div className="text-xs font-black text-white/40 tracking-widest">
                  SLIDE {currentSlide + 1} / {slides.length}
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
             {slides.map((s, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setViewMode('single'); setCurrentSlide(idx); }}
                  className={`aspect-video rounded-2xl border-2 cursor-pointer relative overflow-hidden group/board ${idx === currentSlide ? 'border-brand shadow-xl' : 'border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'}`}
                >
                   <div className="absolute inset-0 bg-slate-900 group-hover/board:bg-slate-800 transition-colors p-4 flex flex-col justify-center gap-2">
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">#{idx + 1} {s.type}</span>
                      <h4 className="text-white font-bold text-xs line-clamp-2 leading-tight uppercase italic">{s.title || (s.text ? "QUOTE" : "VISUAL")}</h4>
                      <div className="w-6 h-0.5 bg-brand/40 group-hover/board:w-full transition-all duration-500" />
                   </div>
                   <div className="absolute bottom-2 right-2 p-1.5 bg-brand text-white rounded-lg scale-0 group-hover/board:scale-100 transition-transform">
                      <Presentation className="w-3 h-3" />
                   </div>
                </motion.div>
             ))}
          </div>
        )}
      </div>
    );
  };

  const VideoViewer = ({ scenes }: { scenes: any[] }) => {
    const [viewMode, setViewMode] = useState<'cinema' | 'storyboard'>('cinema');
    const scene = scenes[currentScene];

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isPlaying && viewMode === 'cinema') {
        timer = setTimeout(() => {
          if (currentScene < scenes.length - 1) {
            setCurrentScene(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        }, scene.duration || 5000);
      }
      return () => clearTimeout(timer);
    }, [isPlaying, currentScene, scenes, viewMode]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setViewMode('cinema')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'cinema' ? 'bg-white dark:bg-slate-600 shadow-sm text-brand' : 'text-slate-400'}`}
              >
                Cinema Mode
              </button>
              <button 
                onClick={() => setViewMode('storyboard')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'storyboard' ? 'bg-white dark:bg-slate-600 shadow-sm text-brand' : 'text-slate-400'}`}
              >
                Storyboard
              </button>
           </div>
           <div className="px-4 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Render Engine: Gen-4 Liquid Architecture
           </div>
        </div>

        {viewMode === 'cinema' ? (
          <div className="relative w-full aspect-video bg-black rounded-[48px] overflow-hidden shadow-2xl flex flex-col group/video border-8 border-slate-900/50 cinematic-grain">
            {/* Dynamic Atmospheric Background */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${currentScene}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0 bg-brand/5"
              >
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative flex-1 z-10"
              >
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                   <Film className="w-32 h-32 text-slate-800" />
                </div>
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                
                {/* Visual Accents */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 space-y-4">
                   <motion.div 
                     initial={{ y: 30, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.4, duration: 0.8 }}
                     className="max-w-4xl"
                   >
                      <p className="text-2xl md:text-5xl font-black text-white leading-tight drop-shadow-2xl italic text-glow tracking-tighter">
                        "{scene.text}"
                      </p>
                   </motion.div>
                </div>

                {/* Scene Badge */}
                <div className="absolute top-12 left-12 flex items-center gap-6">
                   <div className="px-6 py-2 bg-black/40 backdrop-blur-2xl rounded-full border border-white/20 flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_10px_#00A651]" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] drop-shadow">
                        Scene {currentScene + 1}
                      </span>
                   </div>
                </div>

                {scene.style === 'whiteboard' && (
                   <div className="absolute top-12 right-12 flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-xl">
                      <Edit className="w-4 h-4 text-white" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Sketch Process</span>
                   </div>
                )}
                {scene.style === 'ai-motion' && (
                   <div className="absolute top-12 right-12 flex items-center gap-3 px-6 py-2 bg-brand/20 backdrop-blur-2xl rounded-full border border-brand/40 shadow-xl">
                      <Sparkles className="w-4 h-4 text-brand animate-spin-slow" />
                      <span className="text-[10px] font-black text-brand uppercase tracking-widest">Neural Interpolation</span>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Control Dock */}
            <div className="absolute bottom-12 left-0 right-0 px-8 md:px-12 flex justify-between items-center z-30 transition-all duration-300 opacity-0 group-hover/video:opacity-100">
               <div className="flex items-center gap-6 p-2 bg-black/40 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-2xl">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-white text-black rounded-[24px] flex items-center justify-center hover:bg-brand hover:text-white active:scale-90 transition-all shadow-xl"
                  >
                     {isPlaying ? <div className="flex gap-2"><div className="w-1.5 h-6 bg-current rounded-full" /><div className="w-1.5 h-6 bg-current rounded-full" /></div> : <Play className="w-7 h-7 ml-1 fill-current" />}
                  </button>
                  
                  <div className="flex gap-2 pr-4 overflow-x-auto no-scrollbar max-w-[200px] md:max-w-md">
                     {scenes.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setCurrentScene(idx); setIsPlaying(false); }}
                          className={`relative min-w-[80px] h-12 rounded-xl overflow-hidden border-2 transition-all ${idx === currentScene ? 'border-brand scale-110 shadow-lg' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                        >
                           <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                         <Film className="w-12 h-12 text-slate-700" />
                      </div>
                           <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <span className="text-[10px] font-black text-white">{idx + 1}</span>
                           </div>
                        </button>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col items-end gap-2 pr-4">
                  {isPlaying && (
                    <div className="flex gap-1.5 h-8 items-end">
                       {[...Array(5)].map((_, i) => (
                          <motion.div 
                            key={i}
                            animate={{ height: [8, 28, 12, 24, 8] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                            className="w-1.5 bg-brand rounded-full"
                          />
                       ))}
                    </div>
                  )}
                  <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">AI STORYTELLER GEN-4</span>
               </div>
            </div>

            {/* High-Precision Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/5 z-40">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
                 className="h-full bg-brand relative"
               >
                  <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  <div className="absolute top-0 right-0 w-4 h-full bg-white shadow-[0_0_15px_#fff] blur-[4px]" />
               </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
             {scenes.map((s, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group"
                >
                    <div className="relative aspect-video bg-slate-800 flex items-center justify-center">
                       <Film className="w-12 h-12 text-slate-700" />
                       <div className="absolute top-4 left-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                          <span className="text-[10px] font-black text-white">{idx + 1}</span>
                       </div>
                       <button 
                         onClick={() => { setCurrentScene(idx); setViewMode('cinema'); setIsPlaying(true); }}
                         className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity"
                       >
                          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                             <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                       </button>
                    </div>
                   <div className="p-6 space-y-3">
                      <p className="text-xs font-bold text-slate-500 leading-relaxed italic line-clamp-3">"{s.text}"</p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800">
                         <span className="text-[9px] font-medium text-slate-400 font-mono tracking-widest">{s.duration / 1000}S DURATION</span>
                         <span className="text-[9px] font-black text-brand uppercase tracking-widest leading-none">{s.style}</span>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <SEO 
        title={selectedTool ? `${selectedTool.name_en} - AIToolbox` : "AI Toolbox"}
        description={selectedTool ? selectedTool.description_en : "Access 100+ AI-powered tools for content creation, business, utility, and more in Bangladesh."}
      />
      {!selectedTool && (
        <header className="space-y-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full border border-brand/20">
                    <Zap className="w-3.5 h-3.5 text-brand" />
                    <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">{lang === 'bn' ? 'এআই টুলবক্স' : 'Neural Toolbox'}</span>
                 </div>
                 <h1 className="text-4xl md:text-6xl font-display italic leading-none">
                    {lang === 'bn' ? '১০০+ স্মার্ট টুল' : 'Empower your vision with 100+ AI Agents'}
                 </h1>
              </div>
              <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm self-start">
                 <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400'}`}
                 >
                   {lang === 'bn' ? 'সব টুল' : 'Directory'}
                 </button>
                 <button 
                  onClick={() => setActiveTab('recent')}
                  className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'recent' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400'}`}
                 >
                   {lang === 'bn' ? 'সাম্প্রতিক' : 'Recents'}
                 </button>
              </div>
           </div>

          <div className="relative group">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? 'টুল খুঁজুন (যেমন: ইউটিউব, সিভি)...' : 'Search for an agent (e.g. YouTube, CV)...'}
              className="w-full h-20 pl-16 pr-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm outline-none focus:ring-8 focus:ring-brand/5 focus:border-brand font-display font-medium text-lg transition-all"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-brand transition-colors" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <button className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-brand transition-all tap-effect">
                  <Mic className="w-5 h-5" />
               </button>
               <div className="hidden md:flex px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400 gap-1 items-center">
                  <span>⌘</span>
                  <span>K</span>
               </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', 'favorites', 'content', 'seo', 'business', 'utility', 'social'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as any)}
                className={`h-11 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border flex items-center gap-2 ${
                  category === cat 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-2px]' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-brand hover:text-brand'
                }`}
              >
                {cat === 'favorites' && <Star className={`w-3.5 h-3.5 ${category === 'favorites' ? 'fill-white' : ''}`} />}
                {cat}
              </button>
            ))}
          </div>
        </header>
      )}

      {!selectedTool && (
        <section className="space-y-8">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Neural Intelligence Engine</h3>
                 <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex gap-1.5 h-4 items-end">
                 {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, 16, 4] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-1 bg-brand/30 rounded-full"
                    />
                 ))}
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Predictive Trends 2026', icon: TrendingUp, color: 'bg-emerald-500', desc: 'Analyzing BD stock surges', accent: 'Neural_Node_4' },
                { title: 'Cognitive Roadmap', icon: Target, color: 'bg-blue-600', desc: 'AI-curated career vectors', accent: 'Vector_Graph' },
                { title: 'Semantic Matching', icon: Search, color: 'bg-indigo-500', desc: 'Found 3 parallel work nodes', accent: 'Job_Oracle_V2' }
              ].map((s, i) => (
                <div key={i} className="relative group overflow-hidden bg-slate-950 rounded-[40px] p-8 text-white cursor-pointer hover:-translate-y-2 transition-all duration-700 border border-white/5 shadow-2xl">
                   <div className="relative z-20 flex flex-col h-full gap-8">
                      <div className={`w-14 h-14 ${s.color} rounded-[20px] flex items-center justify-center shadow-lg shadow-black/40 group-hover:rotate-12 transition-transform duration-500`}>
                         <s.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-brand uppercase tracking-widest leading-none">{s.accent}</span>
                         </div>
                         <h4 className="font-display font-bold text-2xl leading-none tracking-tighter">{s.title}</h4>
                         <p className="text-sm font-medium text-slate-400 leading-relaxed">{s.desc}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                         <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-brand transition-colors">Access Intelligence</span>
                         <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                      </div>
                   </div>
                   
                   {/* Background Glows */}
                   <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand/20 blur-[90px] group-hover:scale-150 transition-transform duration-700" />
                   <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   {/* Grid Overlay */}
                   <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none" 
                        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
              ))}
           </div>
        </section>
      )}

      {!selectedTool ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' ? filteredTools : recentTools).map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bento-card p-6 flex flex-col gap-6 cursor-pointer"
                onClick={() => handleToolSelect(tool)}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all transform group-hover:rotate-6">
                    {React.createElement(Icons[tool.icon] || FileText, { className: "w-7 h-7" })}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }}
                    className={`h-10 w-10 flex items-center justify-center rounded-2xl transition-all ${favorites.includes(tool.id) ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-300 hover:text-amber-500'}`}
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(tool.id) ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-brand transition-colors">
                    {lang === 'bn' ? tool.name_bn : tool.name_en}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {lang === 'bn' ? tool.description_bn : tool.description_en}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-brand transition-colors">{tool.category}</span>
                   <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <ChevronRight className="w-4 h-4 text-brand" />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden"
        >
           <div className="p-6 bg-brand text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <button onClick={() => { setSelectedTool(null); setOutput(''); setInput(''); setChartData(null); }} className="p-2 hover:bg-white/20 rounded-full">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                 </button>
                 <div>
                    <h2 className="text-xl font-bold">{lang === 'bn' ? selectedTool.name_bn : selectedTool.name_en}</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{selectedTool.category}</p>
                 </div>
              </div>
           </div>

           <div className="p-6 space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Input Data</label>
                 <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার তথ্য এখানে লিখুন...' : 'Write your info here...'}
                    className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl outline-none focus:border-brand transition-all resize-none font-medium"
                 />
              </div>

              <button
                onClick={generateOutput}
                disabled={generating || !input.trim()}
                className="w-full py-4 bg-brand text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand/20 disabled:opacity-50"
              >
                {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Results</>}
              </button>

              <AnimatePresence>
                {(output || chartData || slidesData || paletteData || videoData) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between">
                       <span>{lang === 'bn' ? 'প্রফেশনাল এআই রিপোর্ট' : 'Professional AI Report'}</span>
                       <div className="flex gap-2">
                          <button className="p-1 hover:text-brand transition-colors"><Bookmark className="w-4 h-4" /></button>
                          <button className="p-1 hover:text-brand transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                       </div>
                    </label>

                    {slidesData && <SlideViewer slides={slidesData} />}
                    {videoData && <VideoViewer scenes={videoData} />}

                    {paletteData && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center px-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Spectrum generated</h4>
                           <button 
                            className="text-[10px] font-black text-brand uppercase hover:underline"
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(paletteData, null, 2));
                              alert('Palette JSON copied!');
                            }}
                           >
                            Export JSON
                           </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-12">
                           {paletteData.map((color: any, idx: number) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative"
                              >
                                 <div 
                                   className="w-full aspect-square rounded-[32px] shadow-2xl transition-transform group-hover:scale-105 border-4 border-white dark:border-slate-800 cursor-pointer active:scale-95"
                                   style={{ backgroundColor: color.hex }}
                                   onClick={() => {
                                      navigator.clipboard.writeText(color.hex);
                                      // Simple notification logic would go here
                                   }}
                                 />
                                 <div className="mt-3 text-center">
                                    <p className="text-xs font-black uppercase tracking-tighter text-slate-900 dark:text-white">{color.name}</p>
                                    <p className="text-[10px] font-mono font-medium text-slate-500 uppercase">{color.hex}</p>
                                    <p className="text-[9px] font-bold text-brand uppercase hidden group-hover:block transition-all">{color.usage}</p>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                      </div>
                    )}

                    {chartData && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center px-4">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-brand rounded-full" />
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Intelligence Analytics</h4>
                           </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                           <div className="h-64 w-full p-6">
                            <ResponsiveContainer width="100%" height="100%">
                              {chartData.type === 'pie' ? (
                                <PieChart>
                                  <Pie
                                    data={chartData.data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                  >
                                    {chartData.data.map((entry: any, index: number) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                  />
                                </PieChart>
                              ) : (
                                <BarChart data={chartData.data}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                  <Tooltip 
                                    cursor={{ fill: 'rgba(0, 166, 81, 0.05)' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                  />
                                  <Bar dataKey="value" fill="#00A651" radius={[8, 8, 0, 0]} barSize={40} />
                                </BarChart>
                              )}
                            </ResponsiveContainer>
                          </div>
                          <div className="bg-white/50 dark:bg-black/20 p-4 border-t border-slate-100 dark:border-slate-800">
                             <div className="flex justify-between items-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-1">
                                   <BarChartIcon className="w-3 h-3" /> Visualized by Shayok.AI
                                </p>
                                <button className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">Download CSV</button>
                             </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-4">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Narrative output</h4>
                         <button 
                          className="flex items-center gap-2 text-[10px] font-black text-brand uppercase hover:underline"
                          onClick={() => {
                            navigator.clipboard.writeText(output);
                            addNotification({
                               title: lang === 'bn' ? 'কপি করা হয়েছে' : 'Copied!',
                               message: lang === 'bn' ? 'আউটপুট আপনার ক্লিপবোর্ডে কপি করা হয়েছে।' : 'The output has been copied to your clipboard.',
                               type: 'success',
                               icon: 'CheckCircle'
                            });
                          }}
                         >
                           <FileText className="w-3 h-3" /> Copy Markdown
                         </button>
                      </div>
                      <div className="p-10 bg-slate-50 dark:bg-slate-800 rounded-[48px] border border-slate-100 dark:border-slate-700 text-sm leading-relaxed font-medium prose dark:prose-invert max-w-none shadow-inner">
                         <ReactMarkdown>{output}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </motion.div>
      )}
    </div>
  );
}
