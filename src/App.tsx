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
import Login from './pages/Login';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGuard><Layout /></AuthGuard>}>
            <Route path="/" element={<Home />} />
            <Route path="/krishi" element={<KrishiAI />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/tools" element={<AIToolbox />} />
            <Route path="/entrepreneur" element={<Entrepreneur />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}


