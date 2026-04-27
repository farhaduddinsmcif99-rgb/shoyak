import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationKey, translations } from './utils/translations';
import { storage } from './utils/storage';
import { auth, signInWithGoogle } from './lib/firebase';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getFirestoreDoc, setFirestoreDoc } from './lib/firestoreService';

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
  googleLogin: () => Promise<void>;
  logout: () => void;
  passkeyLogin: (passkey: string) => Promise<boolean>;
  notifications: any[];
  addNotification: (notif: any) => void;
  clearNotifications: () => void;
  notifPrefs: any;
  updateNotifPrefs: (prefs: any) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  recentlyUsed: string[];
  addRecentlyUsed: (id: string) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(storage.get('lang') || 'bn');
  const [darkMode, setDarkModeState] = useState<boolean>(storage.get('dark_mode') === true);
  const [user, setUserState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>(storage.get('notifications') || []);
  const [favorites, setFavorites] = useState<string[]>(storage.get('favorites') || []);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(storage.get('recently_used') || []);
  const [notifPrefs, setNotifPrefs] = useState(storage.get('notif_prefs') || {
    critical: true,
    prices: true,
    tips: true,
    business: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        // Fetch or create user doc in Firestore
        const userDoc = await getFirestoreDoc('users', firebaseUser.uid);
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: userDoc?.role || 'user',
          farmData: userDoc?.farmData || {},
          lastLogin: new Date().toISOString()
        };

        if (!userDoc) {
          await setFirestoreDoc('users', firebaseUser.uid, {
            ...userData,
            createdAt: new Date().toISOString()
          });
        }

        setUserState(userData);
        setIsAdmin(userData.role === 'admin');
        storage.set('user', userData);
      } else {
        // Check if we have an admin bypass session
        const storedUser = storage.get('user');
        if (storedUser && storedUser.uid === 'admin_bypass') {
          setUserState(storedUser);
          setIsAdmin(true);
        } else {
          setUserState(null);
          setIsAdmin(false);
          storage.remove('user');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
    if (u && auth.currentUser) {
      setFirestoreDoc('users', auth.currentUser.uid, u);
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(firebaseUser, { displayName: name });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const googleLogin = async () => {
    await signInWithGoogle();
  };

  const logout = () => {
    signOut(auth);
    storage.remove('admin_session');
  };

  const passkeyLogin = async (passkey: string): Promise<boolean> => {
    if (passkey === 'tr0000') {
      const adminUser = {
        uid: 'admin_bypass',
        email: 'admin@krishi.ai',
        displayName: 'Master Admin',
        role: 'admin',
        lastLogin: new Date().toISOString()
      };
      setUserState(adminUser);
      setIsAdmin(true);
      storage.set('user', adminUser);
      storage.set('admin_session', true);
      return true;
    }
    return false;
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

  const isAuthenticated = !!user;

  return (
    <AppContext.Provider 
      value={{ 
        lang, setLang, 
        darkMode, toggleDarkMode, 
        t, 
        user, setUser,
        isAuthenticated, isAdmin, login, signup, googleLogin, logout, passkeyLogin,
        notifications, addNotification, clearNotifications,
        notifPrefs, updateNotifPrefs,
        favorites, toggleFavorite,
        recentlyUsed, addRecentlyUsed,
        loading
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
