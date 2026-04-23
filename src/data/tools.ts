export interface AITool {
  id: string;
  name_bn: string;
  name_en: string;
  category: 'content' | 'seo' | 'business' | 'utility' | 'social';
  description_bn: string;
  description_en: string;
  icon: string;
}

export const aiTools: AITool[] = [
  // 1-15 (Existing or refined)
  { id: 'article-writer', name_bn: 'আর্টিকেল রাইটার', name_en: 'Article Writer', category: 'content', description_bn: 'যেকোনো বিষয়ে পূর্ণাঙ্গ আর্টিকেল তৈরি করুন', description_en: 'Create full articles on any topic', icon: 'FileText' },
  { id: 'yt-script', name_bn: 'ইউটিউব স্ক্রিপ্ট জেনারেটর', name_en: 'YouTube Script Generator', category: 'social', description_bn: 'ভিডিওর জন্য আকর্ষণীয় স্ক্রিপ্ট তৈরি করুন', description_en: 'Create engaging scripts for videos', icon: 'Youtube' },
  { id: 'seo-keywords', name_bn: 'এসইও কিওয়ার্ড রিসার্চার', name_en: 'SEO Keyword Researcher', category: 'seo', description_bn: 'আপনার ব্লগের জন্য লাভজনক কিওয়ার্ড খুঁজুন', description_en: 'Find profitable keywords for your blog', icon: 'Search' },
  { id: 'meta-gen', name_bn: 'মেটা টাইটেল ও ডেসক্রিপশন', name_en: 'Meta Title & Description', category: 'seo', description_bn: 'এসইও ফ্রেন্ডলি মেটা ডাটা তৈরি করুন', description_en: 'Create SEO friendly meta data', icon: 'Layout' },
  { id: 'social-caption', name_bn: 'সোশ্যাল মিডিয়া ক্যাপশন', name_en: 'Social Media Caption', category: 'social', description_bn: 'FB, Insta, TikTok এর জন্য ক্যাপশন', description_en: 'Captions for FB, Insta, TikTok', icon: 'Hash' },
  { id: 'hashtag-gen', name_bn: 'হ্যাশট্যাগ জেনারেটর', name_en: 'Hashtag Generator', category: 'social', description_bn: 'ভাইরাল হ্যাশট্যাগ খুঁজে বের করুন', description_en: 'Find viral hashtags', icon: 'Hash' },
  { id: 'content-ideas', name_bn: 'কনটেন্ট আইডিয়া জেনারেটর', name_en: 'Content Idea Generator', category: 'content', description_bn: 'নতুন নতুন কনটেন্ট আইডিয়া পান', description_en: 'Get fresh content ideas', icon: 'Lightbulb' },
  { id: 'pdf-maker', name_bn: 'পিডিএফ মেকার', name_en: 'PDF Maker', category: 'utility', description_bn: 'টেক্সট থেকে পিডিএফ ফাইল তৈরি করুন', description_en: 'Create PDF files from text', icon: 'FileText' },
  { id: 'resume-builder', name_bn: 'সিভি/রেজুমে বিল্ডার', name_en: 'Resume Builder', category: 'utility', description_bn: 'পেশাদার সিভি তৈরি করুন', description_en: 'Create professional resumes', icon: 'User' },
  { id: 'business-plan', name_bn: 'বিজনেস প্ল্যান জেনারেটর', name_en: 'Business Plan Generator', category: 'business', description_bn: 'আপনার ব্যবসার জন্য পূর্ণাঙ্গ পরিকল্পনা', description_en: 'Full plan for your business', icon: 'TrendingUp' },
  { id: 'summarizer', name_bn: 'টেক্সট সামারাইজার', name_en: 'Text Summarizer', category: 'utility', description_bn: 'বড় লেখাকে সংক্ষেপে প্রকাশ করুন', description_en: 'Summarize long texts', icon: 'Minimize2' },
  { id: 'presentation-maker', name_bn: 'প্রেজেন্টেশন আউটলাইন', name_en: 'Presentation Outline', category: 'utility', description_bn: 'স্লাইডের জন্য আউটলাইন ও তথ্য', description_en: 'Outline and info for slides', icon: 'Presentation' },
  { id: 'market-report', name_bn: 'মার্কেট এনালাইসিস রিপোর্ট', name_en: 'Market Analysis Report', category: 'business', description_bn: 'যেকোনো খাতের জন্য পূর্ণাঙ্গ মার্কেট রিপোর্ট', description_en: 'Full market report for any sector', icon: 'BarChart' },
  { id: 'investor-pitch', name_bn: 'ইনভেস্টর পিচ ডেক', name_en: 'Investor Pitch Deck', category: 'business', description_bn: 'বিনিয়োগকারীদের জন্য আকর্ষণীয় পিচ তৈরি করুন', description_en: 'Create attractive pitches for investors', icon: 'Target' },
  { id: 'data-viz', name_bn: 'ডিজিটাল ডাটা ভিজুয়ালাইজার', name_en: 'Digital Data Visualizer', category: 'utility', description_bn: 'আপনার ডাটা থেকে চার্ট ও গ্রাফ তৈরি করুন', description_en: 'Create charts and graphs from your data', icon: 'PieChart' },

  // 16-30 (Agriculture & Rural Economy)
  { id: 'fertilizer-guide', name_bn: 'সার প্রয়োগ গাইড', name_en: 'Bio-Fertilizer Guide', category: 'utility', description_bn: 'জমিতে সঠিক সার প্রয়োগের নিয়ম', description_en: 'Guide for correct fertilizer usage', icon: 'Sprout' },
  { id: 'soil-ph', name_bn: 'মাটির pH অপ্টিমাইজার', name_en: 'Soil pH Optimizer', category: 'utility', description_bn: 'মাটির অম্লতা ঠিক করার পরামর্শ', description_en: 'Advice on fixing soil acidity', icon: 'Thermometer' },
  { id: 'cattle-calc', name_bn: 'গবাদিপশু খাদ্যের হিসাব', name_en: 'Cattle Feed Calculator', category: 'utility', description_bn: 'গরুর সুষম খাদ্যের পরিমাণ নির্ধারণ', description_en: 'Determine balanced feed for cattle', icon: 'Calculator' },
  { id: 'poultry-doc', name_bn: 'পোল্ট্রি রোগ নির্ণয়', name_en: 'Poultry Disease Guide', category: 'utility', description_bn: 'মুরগির সাধারণ রোগ ও প্রতিকার', description_en: 'Common poultry diseases and fixes', icon: 'Activity' },
  { id: 'fish-ponds', name_bn: 'মৎস্য খামার অক্সিজেন ক্যালক', name_en: 'Fish Pond Oxygen Estimator', category: 'utility', description_bn: 'পুকুরে অক্সিজেনের মাত্রা বজায় রাখা', description_en: 'Maintain oxygen levels in ponds', icon: 'Droplets' },
  { id: 'seed-wizard', name_bn: 'বীজ শোধন উইজার্ড', name_en: 'Seed Treatment Wizard', category: 'utility', description_bn: 'বীজ বপনের আগে শোধন পদ্ধতি', description_en: 'Seed treatment before sowing', icon: 'Check' },
  { id: 'cold-storage', name_bn: 'কোল্ড স্টোরেজ প্রাইসিং', name_en: 'Cold Storage Pricing', category: 'business', description_bn: 'হিমাগারের সর্বশেষ ভাড়া ও তথ্য', description_en: 'Latest cold storage rent and info', icon: 'Snowflake' },
  { id: 'export-bridge', name_bn: 'রপ্তানি-আমদানি সেতুবন্ধন', name_en: 'Export-Import Bridge', category: 'business', description_bn: 'বিদেশে পণ্য পাঠানোর নির্দেশিকা', description_en: 'Global product shipping guide', icon: 'Globe' },
  { id: 'micro-loan', name_bn: 'ক্ষুদ্রঋণ যোগ্যতা যাচাই', name_en: 'Micro-Loan Eligibility', category: 'business', description_bn: 'ঋণ পাওয়ার শর্ত ও যোগ্যতা', description_en: 'Loan conditions and eligibility', icon: 'DollarSign' },
  { id: 'trade-license', name_bn: 'ট্রেড লাইসেন্স গাইড', name_en: 'Trade License Guide', category: 'business', description_bn: 'ব্যবসায়িক লাইসেন্স পাওয়ার ধাপসমূহ', description_en: 'Steps to get business license', icon: 'FileText' },
  { id: 'tin-reg', name_bn: 'টিন (TIN) রেজিস্ট্রেশন', name_en: 'TIN Registration Help', category: 'business', description_bn: 'সহজে ই-টিন রেজিস্ট্রেশন করুন', description_en: 'Easy e-TIN registration', icon: 'Edit' },
  { id: 'vat-calc', name_bn: 'ভ্যাট (VAT) ক্যালকুলেটর', name_en: 'VAT Calculator', category: 'business', description_bn: 'ব্যবসায়িক ভ্যাট হিসাব করুন', description_en: 'Calculate business VAT', icon: 'Calculator' },
  { id: 'inventory-risk', name_bn: 'ইনভেন্টরি রিস্ক ম্যানেজার', name_en: 'Inventory Risk Manager', category: 'business', description_bn: 'মালামালের স্টক ও ঝুঁকি ব্যবস্থাপনা', description_en: 'Stock and risk management', icon: 'Box' },
  { id: 'supply-chain', name_bn: 'সাপ্লাই চেইন ট্র্যাকার', name_en: 'Supply Chain Tracker', category: 'business', description_bn: 'পণ্য সরবরাহের গতিবিধি ট্র্যাকিং', description_en: 'Tracking product supply flow', icon: 'Truck' },
  { id: 'ecommerce-policy', name_bn: 'ই-কমার্স পলিসি রাইটার', name_en: 'E-commerce Policy Writer', category: 'business', description_bn: 'অনলাইন শপের জন্য প্রয়োজনীয় পলিসি', description_en: 'Necessary policies for online shops', icon: 'Shield' },

  // 31-45 (Education & Skills)
  { id: 'interview-coach', name_bn: 'জব ইন্টারভিউ কোচ', name_en: 'Job Interview Coach', category: 'content', description_bn: 'চাকরির ইন্টারভিউয়ের প্রস্তুতি নিন', description_en: 'Prepare for job interviews', icon: 'Users' },
  { id: 'assignment-struct', name_bn: 'অ্যাসাইনমেন্ট কাঠামো হেল্প', name_en: 'Assignment Structure Help', category: 'content', description_bn: 'অ্যাসাইনমেন্টের সুন্দর ফরম্যাট তৈরি', description_en: 'Create good assignment formats', icon: 'Layout' },
  { id: 'thesis-finder', name_bn: 'থিসিস টপিক ফাইন্ডার', name_en: 'Thesis Topic Finder', category: 'content', description_bn: 'গবেষণার জন্য নতুন টপিক খুঁজুন', description_en: 'Find new research topics', icon: 'Search' },
  { id: 'vocab-booster', name_bn: 'ভোকাবুলারি বুস্টার', name_en: 'Vocabulary Booster', category: 'content', description_bn: 'নতুন নতুন শব্দ শিখুন সহজে', description_en: 'Learn new words easily', icon: 'BookOpen' },
  { id: 'bangla-grammar', name_bn: 'বাংলা ব্যাকরণ চেকার', name_en: 'Bangla Grammar Checker', category: 'content', description_bn: 'লেখার ভুল সংশোধন করুন', description_en: 'Correct writing errors', icon: 'CheckCircle' },
  { id: 'math-helper', name_bn: 'গণিত সমাধান সহকারী', name_en: 'Math Solver Helper', category: 'utility', description_bn: 'জটিল অংকের সমাধান বুঝে নিন', description_en: 'Understand complex math fixes', icon: 'Calculator' },
  { id: 'coding-assistant', name_bn: 'কোডিং অ্যাসিস্ট্যান্ট', name_en: 'Coding Assistant', category: 'utility', description_bn: 'প্রোগ্রামিং এর সমস্যায় সহায়তা', description_en: 'Help with programming issues', icon: 'Code' },
  { id: 'logic-puzzle', name_bn: 'লজিক পাজল জেনারেটর', name_en: 'Logic Puzzle Generator', category: 'utility', description_bn: 'মস্তিষ্কের ব্যায়ামের জন্য পাজল', description_en: 'Puzzles for brain exercise', icon: 'Zap' },
  { id: 'budget-planner', name_bn: 'পার্সোনাল বাজেট প্ল্যানার', name_en: 'Personal Budget Planner', category: 'utility', description_bn: 'নিজের আর্থিক হিসাব রাখুন', description_en: 'Keep your financial accounts', icon: 'PieChart' },
  { id: 'savings-tracker', name_bn: 'সেভিংস গোল ট্র্যাকার', name_en: 'Savings Goal Tracker', category: 'utility', description_bn: 'জমানোর লক্ষ্য অর্জন করুন', description_en: 'Achieve your saving goals', icon: 'Target' },
  { id: 'health-symptom', name_bn: 'স্বাস্থ্য লক্ষণ চেকার', name_en: 'Health Symptom Checker', category: 'utility', description_bn: 'প্রাথমিক স্বাস্থ্য বিষয়ক ধারণা', description_en: 'Initial health concepts', icon: 'Heart' },
  { id: 'nutrition-tracker', name_bn: 'পুষ্টি ও ক্যালরি ট্র্যাকার', name_en: 'Nutrition Tracker', category: 'utility', description_bn: 'খাবারের পুষ্টিগুণ জানুন', description_en: 'Know nutrients of food', icon: 'Coffee' },
  { id: 'mental-journal', name_bn: 'মানসিক স্বাস্থ্য জার্নাল', name_en: 'Mental Health Journal', category: 'utility', description_bn: 'নিজের অনুভূতিগুলো লিখে রাখুন', description_en: 'Write down your feelings', icon: 'Book' },
  { id: 'yoga-builder', name_bn: 'যোগব্যায়াম রুটিন', name_en: 'Yoga Routine Builder', category: 'utility', description_bn: 'সুস্থ থাকতে ইয়োগা রুটিন', description_en: 'Yoga routine for health', icon: 'Sun' },
  { id: 'med-reminder', name_bn: 'ঔষধ অনুস্মারক', name_en: 'Medication Reminder', category: 'utility', description_bn: 'সময়মতো ঔষধ খাওয়ার সিডিউল', description_en: 'Medication schedule on time', icon: 'Bell' },

  // 46-60 (Legal & Civic)
  { id: 'firstaid-guide', name_bn: 'প্রাথমিক চিকিৎসা গাইড', name_en: 'First Aid Guide', category: 'utility', description_bn: 'জরুরি মুহূর্তে প্রাথমিক চিকিৎসা', description_en: 'First aid in emergencies', icon: 'PlusSquare' },
  { id: 'legal-drafter', name_bn: 'লিগ্যাল ডকুমেন্ট ড্রাফটার', name_en: 'Legal Document Drafter', category: 'business', description_bn: 'আইনি চিঠিপত্র ও নোটিশ তৈরি', description_en: 'Generate legal letters and notices', icon: 'FileText' },
  { id: 'land-record', name_bn: 'জমির খতিয়ান তথ্য হেল্প', name_en: 'Land Record Search Help', category: 'business', description_bn: 'অনালাইনে জমির তথ্য পাওয়ার উপায়', description_en: 'Way to get land info online', icon: 'Search' },
  { id: 'consumer-rights', name_bn: 'ভোক্তা অধিকার নির্দেশিকা', name_en: 'Consumer Rights Guide', category: 'business', description_bn: 'আপনার অধিকার সম্পর্কে জানুন', description_en: 'Know about your rights', icon: 'Shield' },
  { id: 'utility-bill', name_bn: 'ইউটিলিটি বিল এস্টিমেটর', name_en: 'Utility Bill Estimator', category: 'utility', description_bn: 'বিদ্যুৎ ও পানির বিল অনুমান', description_en: 'Estimate electricity and water bills', icon: 'Zap' },
  { id: 'nid-passport', name_bn: 'এনআইডি ও পাসপোর্ট ট্র্যাকিং', name_en: 'NID/Passport Help', category: 'utility', description_bn: 'সহজে আবেদনের নিয়ম ও ট্র্যাকিং', description_en: 'Easy application and tracking', icon: 'User' },
  { id: 'traffic-fine', name_bn: 'ট্রাফিক ফাইন চেকার', name_en: 'Traffic Fine Checker', category: 'utility', description_bn: 'ট্রাফিক মামলার তথ্য চেক করুন', description_en: 'Check traffic case info', icon: 'AlertTriangle' },
  { id: 'travel-planner', name_bn: 'ভ্রমণ পরিকল্পনা ও বাজেট', name_en: 'Travel Itinerary Planner', category: 'utility', description_bn: 'দেশ-বিদেশ ভ্রমণের রুটিন', description_en: 'Inside-outside travel routine', icon: 'Map' },
  { id: 'hotel-logic', name_bn: 'হোটেল বুকিং লজিক', name_en: 'Hotel Booking Advisor', category: 'utility', description_bn: 'সেরা হোটেল বেছে নেওয়ার টিপস', description_en: 'Tips for picking best hotels', icon: 'Home' },
  { id: 'wedding-budget', name_bn: 'বিয়ে বাজেট প্ল্যানার', name_en: 'Wedding Budget Planner', category: 'utility', description_bn: 'বিয়ের খরচের পূর্ণাঙ্গ হিসাব', description_en: 'Full wedding cost account', icon: 'Heart' },
  { id: 'event-checklist', name_bn: 'ইভেন্ট চেকলিস্ট মেকার', name_en: 'Event Checklist Maker', category: 'utility', description_bn: 'যেকোনো অনুষ্ঠানের প্রস্তুতি তালিকা', description_en: 'Prep list for any event', icon: 'List' },
  { id: 'gift-ideas', name_bn: 'উপহার আইডিয়া জেনারেটর', name_en: 'Gift Idea Generator', category: 'utility', description_bn: 'প্রিয়জনের জন্য সেরা উপহারের তালিকা', description_en: 'Best gift list for loved ones', icon: 'Gift' },
  { id: 'movie-recom', name_bn: 'মুভি ও বই সুপারিশ', name_en: 'Movie/Book Recommender', category: 'utility', description_bn: 'আপনার রুচি অনুযায়ী সুপারিশ', description_en: 'Recommendation by your taste', icon: 'Film' },
  { id: 'recipe-bot', name_bn: 'পার্সোনালাইজড রেসিপি', name_en: 'Recipe Personalized Bot', category: 'utility', description_bn: 'সহজ ও মজাদার রান্নার নিয়ম', description_en: 'Easy and tasty cooking rules', icon: 'Utensils' },
  { id: 'cooking-sub', name_bn: 'রান্নার উপকরণ বিকল্প', name_en: 'Cooking Substitution Guide', category: 'utility', description_bn: 'উপকরণ না থাকলে বিকল্প কি দেবেন', description_en: 'Subs if ingredients missing', icon: 'RefreshCcw' },

  // 61-75 (Tech & Dev)
  { id: 'home-workout', name_bn: 'হোম ওয়ার্কআউট প্ল্যানার', name_en: 'Home Workout Planner', category: 'utility', description_bn: 'ঘরে বসে শরীরচর্চার রুটিন', description_en: 'Exercise routine at home', icon: 'Activity' },
  { id: 'meditation-guide', name_bn: 'মেডিটেশন গাইড', name_en: 'Meditation Guide', category: 'utility', description_bn: 'মানসিক প্রশান্তির উপায়', description_en: 'Way to mental peace', icon: 'Wind' },
  { id: 'bug-finder', name_bn: 'কোডিং বাগ ফাইন্ডার', name_en: 'Coding Bug Finder', category: 'utility', description_bn: 'কোডের ভুল খুঁজে বের করুন', description_en: 'Find errors in code', icon: 'Bug' },
  { id: 'sql-gen', name_bn: 'এসকিউএল কোয়েরি জেনারেটর', name_en: 'SQL Query Generator', category: 'utility', description_bn: 'সহজে ডাটাবেস কোয়েরি লিখুন', description_en: 'Write DB queries easily', icon: 'Database' },
  { id: 'python-helper', name_bn: 'পাইথন স্ক্রিপ্ট হেল্পার', name_en: 'Python Script Helper', category: 'utility', description_bn: 'পাইথন কোডিংয়ে তাৎক্ষণিক সাহায্য', description_en: 'Instant Python coding help', icon: 'Terminal' },
  { id: 'react-builder', name_bn: 'রিঅ্যাক্ট কম্পোনেন্ট বিল্ডার', name_en: 'React Component Builder', category: 'utility', description_bn: 'তৈরি করুন কাস্টম রিঅ্যাক্ট কোড', description_en: 'Create custom React code', icon: 'Code2' },
  { id: 'tailwind-helper', name_bn: 'টেইলউইন্ড সিএসএস হেল্পার', name_en: 'Tailwind CSS Helper', category: 'utility', description_bn: 'ডিজাইনে টেইলউইন্ড ক্লাস জেনারেট', description_en: 'Generate Tailwind classes', icon: 'Palette' },
  { id: 'api-doc', name_bn: 'এপিআই ডকুমেন্টেশন রাইটার', name_en: 'API Documentation Writer', category: 'utility', description_bn: 'সুন্দর এপিআই ডকুমেন্টেশন তৈরি', description_en: 'Create nice API documentation', icon: 'FileJson' },
  { id: 'regex-builder', name_bn: 'রেজেক্স (Regex) বিল্ডার', name_en: 'Regex Builder', category: 'utility', description_bn: 'জটিল রেজেক্স সহজে লিখুন', description_en: 'Write complex regex easily', icon: 'Code' },
  { id: 'unit-converter', name_bn: 'ইউনিট কনভার্টার প্রো', name_en: 'Unit Converter Pro', category: 'utility', description_bn: 'সব ধরণের ইউনিটের রূপান্তর', description_en: 'Conversion of all units', icon: 'Repeat' },
  { id: 'color-palette', name_bn: 'কালার প্যালেট জেনারেটর', name_en: 'Color Palette Generator', category: 'utility', description_bn: 'ডিজাইনের জন্য রঙ নির্বাচন করুন', description_en: 'Select colors for design', icon: 'Droplets' },
  { id: 'font-pair', name_bn: 'ফন্ট পেয়ারিং গাইড', name_en: 'Font Pairing Guide', category: 'utility', description_bn: 'সেরা ফন্ট ম্যাচিং আইডিয়া', description_en: 'Best font matching ideas', icon: 'Type' },
  { id: 'logo-sketch', name_bn: 'লোগো আইডিয়া স্কেচার', name_en: 'Logo Idea Sketcher', category: 'utility', description_bn: 'ব্র্যান্ডের জন্য লোগোর আইডিয়া', description_en: 'Logo ideas for brand', icon: 'Figma' },
  { id: 'ad-copy', name_bn: 'অ্যাড কপিরাইটার', name_en: 'Ad Copywriter', category: 'content', description_bn: 'বিজ্ঞাপনের জন্য নজরকাড়া লেখা', description_en: 'Eye-catching ad copy', icon: 'Megaphone' },
  { id: 'email-wizard', name_bn: 'ইমেইল সাবজেক্ট লাইন', name_en: 'Email Subject Wizard', category: 'content', description_bn: 'ইমেইল ক্লিক রেট বাড়ানোর উপায়', description_en: 'Way to increase email open rate', icon: 'Mail' },

  // 76-90 (Marketing & Strategy)
  { id: 'newsletter-draft', name_bn: 'নিউজলেটার ড্রাফটার', name_en: 'Newsletter Drafter', category: 'content', description_bn: 'সাপ্তাহিক নিউজলেটার তৈরি করুন', description_en: 'Create weekly newsletters', icon: 'Send' },
  { id: 'press-release', name_bn: 'প্রেস রিলিজ রাইটার', name_en: 'Press Release Writer', category: 'content', description_bn: 'সংবাদ বিজ্ঞপ্তির সুন্দর ফরম্যাট', description_en: 'Nice format for press releases', icon: 'Globe' },
  { id: 'slogan-gen', name_bn: 'স্লোগান জেনারেটর', name_en: 'Slogan Generator', category: 'content', description_bn: 'ব্যবসার জন্য সুন্দর স্লোগান', description_en: 'Nice slogans for business', icon: 'Zap' },
  { id: 'brand-name', name_bn: 'ব্র্যান্ড নেম ফাইন্ডার', name_en: 'Brand Name Finder', category: 'business', description_bn: 'ইউনিক ব্র্যান্ড নাম খুঁজুন', description_en: 'Find unique brand names', icon: 'Star' },
  { id: 'product-desc', name_bn: 'প্রোডাক্ট ডেসক্রিপশন', name_en: 'Product Description Maker', category: 'content', description_bn: 'পণ্যের আকর্ষণীয় বিবরণ', description_en: 'Attractive product descriptions', icon: 'ShoppingBag' },
  { id: 'amazon-listing', name_bn: 'লিস্টিং অপ্টিমাইজার', name_en: 'Ecommerce Listing Optimizer', category: 'seo', description_bn: 'বিক্রি বাড়ানোর জন্য লিস্টিং', description_en: 'Listing to increase sales', icon: 'TrendingUp' },
  { id: 'keyword-density', name_bn: 'কিওয়ার্ড ডেনসিটি চেকার', name_en: 'Keyword Density Checker', category: 'seo', description_bn: 'লেখায় কিওয়ার্ডের মাত্রা পরীক্ষা', description_en: 'Check keyword density in writing', icon: 'FileText' },
  { id: 'backlink-idea', name_bn: 'ব্যাকলিঙ্ক আইডিয়া', name_en: 'Backlink Idea Generator', category: 'seo', description_bn: 'এসইও ইমপ্রুভ করতে ব্যাকলিঙ্ক', description_en: 'Backlinks to improve SEO', icon: 'Link' },
  { id: 'sitemap-builder', name_bn: 'সাইটম্যাপ বিল্ডার হেল্প', name_en: 'Sitemap Builder Help', category: 'seo', description_bn: 'ওয়েবসাইটের সাইটম্যাপ তৈরি', description_en: 'Create website sitemap', icon: 'Map' },
  { id: 'robots-gen', name_bn: 'Robots.txt জেনারেটর', name_en: 'Robots.txt Generator', category: 'seo', description_bn: 'সার্চ ইঞ্জিন ইন্ডেক্সিং কন্ট্রোল', description_en: 'Control search engine indexing', icon: 'ShieldPlay' },
  { id: 'schema-wizard', name_bn: 'স্কিমা মার্কআপ উইজার্ড', name_en: 'Schema Markup Wizard', category: 'seo', description_bn: 'সুন্দর রিচ স্নিপেট তৈরি করুন', description_en: 'Create nice rich snippets', icon: 'Code' },
  { id: 'page-speed', name_bn: 'পেজ স্পিড অ্যাডভাইজার', name_en: 'Page Speed Advisor', category: 'seo', description_bn: 'ওয়েবসাইট ফাস্ট করার পরামর্শ', description_en: 'Advice to make website fast', icon: 'Activity' },
  { id: 'mobile-friendly', name_bn: 'মোবাইল ফ্রেন্ডলিনেস চেক', name_en: 'Mobile Friendliness Check', category: 'seo', description_bn: 'মোবাইলে ওয়েবসাইটের পারফরম্যান্স', description_en: 'Website performance on mobile', icon: 'Smartphone' },
  { id: 'social-calendar', name_bn: 'সোশ্যাল মিডিয়া ক্যালেন্ডার', name_en: 'Social Media Calendar', category: 'social', description_bn: 'পোস্টের পরিকল্পনা ও সিডিউলিং', description_en: 'Post planning and scheduling', icon: 'Calendar' },
  { id: 'viral-post', name_bn: 'ভাইরাল পোস্ট আইডিয়া', name_en: 'Viral Post Idea Gen', category: 'social', description_bn: 'বেশি বেশি রিচ পাওয়ার কৌশল', description_en: 'Strategy to get more reach', icon: 'Award' },

  // 91-100 (Finalized Tools)
  { id: 'reels-script', name_bn: 'রিলস স্ক্রিপ্ট রাইটার', name_en: 'Reels Script Writer', category: 'social', description_bn: 'ছোট ভিডিওর জন্য স্ক্রিপ্ট', description_en: 'Scripts for short videos', icon: 'Video' },
  { id: 'tiktok-trend', name_bn: 'টিকটক ট্রেন্ড লোকেটার', name_en: 'TikTok Trend Locator', category: 'social', description_bn: 'এখন কি ট্রেন্ডিং এ আছে জানুন', description_en: 'Know what is trending now', icon: 'TrendingUp' },
  { id: 'linkedin-bio', name_bn: 'লিঙ্কডইন বায়ো অপ্টিমাইজার', name_en: 'LinkedIn Bio Optimizer', category: 'social', description_bn: 'পেশাদার প্রোফাইল তৈরি করুন', description_en: 'Create professional profiles', icon: 'Linkedin' },
  { id: 'twitter-thread', name_bn: 'টুইটার থ্রেড মেকার', name_en: 'Twitter Thread Maker', category: 'social', description_bn: 'ভাইরাল থ্রেড সহজে সাজান', description_en: 'Arrange viral threads easily', icon: 'Twitter' },
  { id: 'privacy-policy', name_bn: 'প্রাইভেসি পলিসি জেনারেটর', name_en: 'Privacy Policy Gen', category: 'business', description_bn: 'ওয়েবসাইটের জন্য প্রাইভেসি পলিসি', description_en: 'Privacy policy for website', icon: 'Lock' },
  { id: 'terms-gen', name_bn: 'টার্মস অফ সার্ভিস জেনারেটর', name_en: 'Terms of Service Gen', category: 'business', description_bn: 'আইনি শর্তাবলী তৈরি করুন', description_en: 'Create legal terms', icon: 'FileText' },
  { id: 'disclaimer-gen', name_bn: 'ডিসক্লেইমার জেনারেটর', name_en: 'Disclaimer Generator', category: 'business', description_bn: 'আইনি ঝুঁকি থেকে বাঁচার টুল', description_en: 'Tool to avoid legal risks', icon: 'AlertCircle' },
  { id: 'refund-policy', name_bn: 'রিফান্ড পলিসি বিল্ডার', name_en: 'Refund Policy Builder', category: 'business', description_bn: 'সহজে রিফান্ড পলিসি লিখুন', description_en: 'Write refund policy easily', icon: 'CornerUpLeft' },
  { id: 'internship-finder', name_bn: 'ইন্টার্নশিপ ফাইন্ডার হেল্প', name_en: 'Internship Finder Help', category: 'utility', description_bn: 'ইন্টার্নশিপ খোঁজার সঠিক উপায়', description_en: 'Right way to find internships', icon: 'Briefcase' },
   { id: 'scholarship-search', name_bn: 'স্কলারশিপ সার্চ প্রো', name_en: 'Scholarship Search Pro', category: 'utility', description_bn: 'বিদেশে উচ্চশিক্ষার অনুদান খুঁজুন', description_en: 'Find grants for foreign studies', icon: 'GraduationCap' },
   { id: 'ssc-hsc-helper', name_bn: 'এসএসসি/এইচএসসি সহায়ক', name_en: 'SSC/HSC Study Helper', category: 'utility', description_bn: 'বোর্ড পরীক্ষার জন্য প্রস্তুতি ও টিপস', description_en: 'Prep and tips for board exams', icon: 'BookOpen' },
   { id: 'quiz-system', name_bn: 'এআই কুইজ সিস্টেম', name_en: 'AI Quiz System', category: 'utility', description_bn: 'যেকোনো বিষয়ে কুইজ তৈরি ও প্র্যাকটিস', description_en: 'Create and practice quizzes', icon: 'Zap' },
   { id: 'notes-gen', name_bn: 'নোটস জেনারেটর', name_en: 'Notes Generator', category: 'content', description_bn: 'লেকচার বা বই থেকে দ্রুত নোট তৈরি', description_en: 'Quick notes from lectures or books', icon: 'Edit' },
   { id: 'cv-gen', name_bn: 'প্রফেশনাল সিভি জেনারেটর', name_en: 'Professional CV Generator', category: 'utility', description_bn: 'চাকরির জন্য আধুনিক সিভি ডিজাইন', description_en: 'Modern CV design for jobs', icon: 'User' },
   { id: 'email-writer', name_bn: 'এআই ইমেইল রাইটার', name_en: 'AI Email Writer', category: 'content', description_bn: 'পেশাদার ইমেইল দ্রুত লিখুন', description_en: 'Write professional emails quickly', icon: 'Mail' }
];
