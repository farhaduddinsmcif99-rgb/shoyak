import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationKey, translations } from './utils/translations';
import { storage } from './utils/storage';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  t: (key: TranslationKey) => string;
  user: any;
  setUser: (user: any) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  notifications: any[];
  addNotification: (notif: any) => void;
  clearNotifications: () => void;
  notifPrefs: any;
  updateNotifPrefs: (prefs: any) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  recentlyUsed: string[];
  addRecentlyUsed: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(storage.get('lang') || 'bn');
  const [darkMode, setDarkModeState] = useState<boolean>(storage.get('dark_mode') === true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storage.get('auth_token') === 'fake-jwt-token');
  const [user, setUserState] = useState(storage.get('user') || null);
  const [isAdmin, setIsAdmin] = useState<boolean>(storage.get('user')?.role === 'admin');
  const [notifications, setNotifications] = useState<any[]>(storage.get('notifications') || []);
  const [favorites, setFavorites] = useState<string[]>(storage.get('favorites') || []);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(storage.get('recently_used') || []);
  const [notifPrefs, setNotifPrefs] = useState(storage.get('notif_prefs') || {
    critical: true,
    prices: true,
    tips: true,
    business: true
  });

  const setLang = (l: Language) => {
    setLangState(l);
    storage.set('lang', l);
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkModeState(next);
    storage.set('dark_mode', next);
    if (next) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  };

  const setUser = (u: any) => {
    setUserState(u);
    setIsAdmin(u?.role === 'admin');
    storage.set('user', u);
  };

  const isAdminPassword = (pass: string) => {
    return /^tr\d{4}$/.test(pass);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Simulate server delay
    await new Promise(r => setTimeout(r, 1000));
    const users = storage.get('mock_users') || [];
    const found = users.find((u: any) => u.email === email && u.password === pass);
    
    if (found) {
      setUser(found);
      setIsAuthenticated(true);
      storage.set('auth_token', 'fake-jwt-token');
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000));
    const users = storage.get('mock_users') || [];
    if (users.find((u: any) => u.email === email)) return false;

    const role = isAdminPassword(pass) ? 'admin' : 'user';
    const newUser = { name, email, password: pass, role, avatarId: Math.floor(Math.random() * 5) + 1 };
    const updatedUsers = [...users, newUser];
    storage.set('mock_users', updatedUsers);
    
    setUser(newUser);
    setIsAuthenticated(true);
    storage.set('auth_token', 'fake-jwt-token');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserState(null);
    storage.remove('auth_token');
    storage.remove('user');
  };

  const addNotification = (n: any) => {
    const newNotif = { ...n, id: Date.now(), timestamp: new Date().toISOString() };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      storage.set('notifications', updated);
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    storage.remove('notifications');
  };

  const updateNotifPrefs = (p: any) => {
    setNotifPrefs(p);
    storage.set('notif_prefs', p);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      storage.set('favorites', updated);
      return updated;
    });
  };

  const addRecentlyUsed = (id: string) => {
    setRecentlyUsed(prev => {
      const filtered = prev.filter(r => r !== id);
      const updated = [id, ...filtered].slice(0, 10);
      storage.set('recently_used', updated);
      return updated;
    });
  };

  useEffect(() => {
    if (darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [darkMode]);

  const t = (key: keyof typeof translations.bn) => {
    return translations[lang][key] || key;
  };

  return (
    <AppContext.Provider 
      value={{ 
        lang, setLang, 
        darkMode, toggleDarkMode, 
        t, 
        user, setUser,
        isAuthenticated, isAdmin, login, signup, logout,
        notifications, addNotification, clearNotifications,
        notifPrefs, updateNotifPrefs,
        favorites, toggleFavorite,
        recentlyUsed, addRecentlyUsed
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
