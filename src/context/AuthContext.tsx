import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem('authenticated');
        console.log('Auth state from storage:', storedAuth);
        setIsAuthenticated(storedAuth === 'true');
      } catch (error) {
        console.error('Error loading authentication state:', error);
      }
    };

    syncAuthState();
  }, []);

  const setAuthenticated = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('authenticated', value ? 'true' : 'false');
      setIsAuthenticated(value);
    } catch (error) {
      console.error('Failed to update authentication state:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
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
