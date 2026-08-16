import { useState, useEffect, createContext, useContext } from 'react';
import { auth, googleAuthProvider } from '../lib/firebase.ts';
import { onAuthStateChanged, signInWithPopup, signOut, User, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  googleAccessToken: string | null;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

interface Notification {
  id: number;
  text: string;
  type: 'info' | 'success' | 'error';
  date: Date;
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (text: string, type: 'info' | 'success' | 'error') => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(localStorage.getItem('google_access_token'));
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: 'Bem-vindo ao FinanGo! Comece adicionando uma transação.', type: 'info', date: new Date() },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const addNotification = (text: string, type: 'info' | 'success' | 'error') => {
    setNotifications(prev => [{ id: Date.now(), text, type, date: new Date() }, ...prev]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const token = await firebaseUser.getIdToken();
        try {
          await axios.post('/api/auth/sync', {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          console.error("Failed to sync user", error);
        }
      } else {
        setUser(null);
        setGoogleAccessToken(null);
        localStorage.removeItem('google_access_token');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      // Adding scopes explicitly for Sheets
      googleAuthProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
      
      const result = await signInWithPopup(auth, googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      
      if (token) {
        setGoogleAccessToken(token);
        localStorage.setItem('google_access_token', token);
      }
    } catch (error: any) {
      console.error("Sign in failed", error);
      if (error.code === 'auth/cancelled-popup-request') {
        addNotification('A janela de login foi fechada ou bloqueada. Tente novamente.', 'error');
      } else {
        addNotification('Falha ao entrar com Google.', 'error');
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const getToken = async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken();
  };

  return (
    <AuthContext.Provider value={{ user, loading, googleAccessToken, signIn, logout, getToken }}>
      <NotificationsContext.Provider value={{ notifications, addNotification, showNotifications, setShowNotifications }}>
        {children}
      </NotificationsContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within an AppProvider');
  }
  return context;
}
