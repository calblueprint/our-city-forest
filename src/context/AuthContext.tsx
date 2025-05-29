import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/supabase/client';

WebBrowser.maybeCompleteAuthSession();

type User = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
  hasLaunched: boolean;
  setHasLaunched: (value: boolean) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

async function getUserInfo(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  const meta = data.user.user_metadata || {};
  return {
    id: data.user.id,
    email: data.user.email || '',
    name: meta.full_name || '',
    picture: meta.avatar_url || undefined,
  };
}

function isOcfEmail(user: User | null): boolean {
  return user?.email.endsWith('@ourcityforest.org') ?? false;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLaunched, setHasLaunchedState] = useState(false);

  const setHasLaunched = (value: boolean) => {
    setHasLaunchedState(value);
    AsyncStorage.setItem('hasLaunched', String(value));
  };

  const refreshUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const info = await getUserInfo();
      if (isOcfEmail(info)) {
        setUser(info);
        setIsAuthenticated(true);
      } else {
        await supabase.auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('hasLaunched');
      if (stored === 'true') setHasLaunchedState(true);
      await refreshUser();
    })();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        refreshUser();
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
    const subscription = data.subscription;

    const appStateSub = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState === 'active') refreshUser();
      },
    );

    return () => {
      subscription.unsubscribe();
      appStateSub.remove();
    };
  }, []);

  const logIn = async () => {
    setIsLoading(true);
    const redirectUrl = makeRedirectUri({ scheme: 'ourcityforest' });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: { hd: 'ourcityforest.org', prompt: 'select_account' },
      },
    });
    if (error || !data?.url) {
      console.error('Login error', error?.message || 'Unknown error');
      setIsLoading(false);
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

    if (result.type === 'success' && result.url) {
      if (result.url.includes('#access_token=')) {
        const params = new URLSearchParams(result.url.split('#')[1]);
        await supabase.auth.setSession({
          access_token: params.get('access_token') || '',
          refresh_token: params.get('refresh_token') || '',
        });
      } else {
        const code = new URL(result.url).searchParams.get('code');
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }
      }
    } else {
      console.warn('Login cancelled or failed.');
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        logIn,
        logOut,
        hasLaunched,
        setHasLaunched,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthContextProvider');
  return context;
}
