import React, { useState } from 'react';
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
  Award, Video, Linkedin, Twitter, Lock, AlertCircle, CornerUpLeft, Briefcase, GraduationCap
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [generating, setGenerating] = useState(false);
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

    return text;
  };

  const generateOutput = async () => {
    if (!input.trim() || generating || !selectedTool) return;
    setGenerating(true);
    setOutput('');
    setChartData(null);
    setSlidesData(null);

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
    const slide = slides[currentSlide];

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

    return (
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
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img 
                    src={slide.imageUrl} 
                    className="w-full h-full object-cover" 
                    alt="Slide Visual"
                    referrerPolicy="no-referrer"
                  />
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
    );
  };

  return (
    <div className="space-y-6">
      {!selectedTool && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 self-start shadow-sm">
             <button 
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400'}`}
             >
               {lang === 'bn' ? 'সব টুল' : 'All Tools'}
             </button>
             <button 
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'recent' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400'}`}
             >
               {lang === 'bn' ? 'সম্প্রতি ব্যবহৃত' : 'Recent'}
             </button>
          </div>

          <div className="relative group">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? '১০০+ এআই টুল খুঁজুন...' : 'Search 100+ AI tools...'}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm outline-none focus:border-brand transition-all ring-0 group-focus-within:ring-4 group-focus-within:ring-brand/5"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', 'favorites', 'content', 'seo', 'business', 'utility', 'social'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 flex items-center gap-2 ${
                  category === cat 
                    ? 'bg-brand border-brand text-white shadow-lg shadow-brand/10' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-brand/40'
                }`}
              >
                {cat === 'favorites' && <Star className={`w-3 h-3 ${category === 'favorites' ? 'fill-white' : ''}`} />}
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {!selectedTool ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' ? filteredTools : recentTools).map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-brand transition-all text-left shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
              >
                <div 
                  onClick={() => handleToolSelect(tool)}
                  className="flex flex-1 items-center gap-4 min-w-0"
                >
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shrink-0">
                    {React.createElement(Icons[tool.icon] || FileText, { className: "w-6 h-6" })}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-brand transition-colors">
                      {lang === 'bn' ? tool.name_bn : tool.name_en}
                    </h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 truncate opacity-60">
                      {tool.category}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }}
                  className={`p-2 rounded-xl transition-all ${favorites.includes(tool.id) ? 'bg-yellow-50 text-yellow-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-300 hover:text-yellow-500'}`}
                >
                  <Star className={`w-4 h-4 ${favorites.includes(tool.id) ? 'fill-yellow-500' : ''}`} />
                </button>

                <div className="absolute right-0 bottom-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronRight className="w-4 h-4 text-brand" />
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
                {(output || chartData || slidesData) && (
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

                    {chartData && (
                      <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 p-4">
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
                              <Tooltip />
                            </PieChart>
                          ) : (
                            <BarChart data={chartData.data}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                              <YAxis fontSize={10} axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Bar dataKey="value" fill="#00A651" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                        <div className="text-center mt-2">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center justify-center gap-1">
                              <BarChartIcon className="w-3 h-3" /> Data Visualization generated by Shayok.AI
                           </p>
                        </div>
                      </div>
                    )}

                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 text-sm leading-relaxed font-medium prose dark:prose-invert max-w-none">
                       <ReactMarkdown>{output}</ReactMarkdown>
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
