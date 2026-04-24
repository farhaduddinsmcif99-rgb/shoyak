import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import KrishiAI from './pages/KrishiAI';
import AIAssistant from './pages/AIAssistant';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import AIToolbox from './pages/AIToolbox';
import Hub from './pages/Hub';
import Jobs from './pages/Jobs';
import Agriculture from './pages/Agriculture';
import Finance from './pages/Finance';
import Entrepreneur from './pages/Entrepreneur';
import JuniorMode from './pages/JuniorMode';
import LifeCompanion from './pages/LifeCompanion';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Blog from './pages/Blog';
import PublicTools from './pages/PublicTools';
import ToolDetail from './pages/ToolDetail';
import Sitemap from './pages/Sitemap';
import KrishiLanding from './pages/seo/KrishiLanding';
import StudentLanding from './pages/seo/StudentLanding';
import VisionLanding from './pages/seo/VisionLanding';
import { motion, AnimatePresence } from 'motion/react';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function HomeCheck() {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? (
    <AuthGuard>
      <Layout>
        <Home />
      </Layout>
    </AuthGuard>
  ) : (
    <LandingPage />
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        
        {/* Public SEO Landing Pages */}
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tools-list" element={<PublicTools />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          <Route path="/future/krishi" element={<KrishiLanding />} />
          <Route path="/future/students" element={<StudentLanding />} />
          <Route path="/future/vision" element={<VisionLanding />} />
        </Route>

        <Route path="/" element={<HomeCheck />} />

        <Route element={<AuthGuard><Layout /></AuthGuard>}>
          <Route path="/krishi" element={<KrishiAI />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/agriculture" element={<Agriculture />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/tools" element={<AIToolbox />} />
          <Route path="/entrepreneur" element={<Entrepreneur />} />
          <Route path="/junior" element={<JuniorMode />} />
          <Route path="/companion" element={<LifeCompanion />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AppProvider>
  );
}


