import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../supabase/client';
import { User } from '@supabase/supabase-js';

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const syncAuthState = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem('authStatus');
        setIsAuthenticated(storedAuth === 'true');

        const { data } = await supabase.auth.getUser();
        setUser(data.user ?? null);
      } catch (error) {
        console.error('Error loading authentication state:', error);
      }
    };

    syncAuthState();
  }, []);

  const setAuthenticated = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('authStatus', value ? 'true' : 'false');
      setIsAuthenticated(value);

      if (value) {
        const { data } = await supabase.auth.getUser();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to update authentication state:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated: setAuthenticated, user}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
