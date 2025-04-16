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

const getUserInfo = async (): Promise<User | null> => {
  console.log('[AuthContext] Fetching user info...');
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.warn('[AuthContext] No user found or error:', error);
    return null;
  }
  const { user } = data;
  const meta = user.user_metadata ?? {};
  const userInfo = {
    id: user.id,
    email: user.email ?? '',
    name: meta.full_name ?? '',
    picture: meta.avatar_url ?? undefined,
  };
  console.log('[AuthContext] User info:', userInfo);
  return userInfo;
};

const isOcfEmail = (user: User | null): boolean => {
  const result = user?.email.endsWith('@ourcityforest.org') ?? false;
  if (user) {
    console.log(
      `[AuthContext] Checking OCF email for ${user.email}: ${result}`,
    );
  }
  return result;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLaunched, setHasLaunchedState] = useState(false);

  const setHasLaunched = (value: boolean) => {
    setHasLaunchedState(value);
    AsyncStorage.setItem('hasLaunched', value.toString());
    console.log(`[AuthContext] Set hasLaunched to ${value}`);
  };

  const refreshUser = async () => {
    console.log('[AuthContext] Refreshing user session...');
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const currentUser = await getUserInfo();
      if (isOcfEmail(currentUser)) {
        setUser(currentUser);
        setIsAuthenticated(true);
        console.log('[AuthContext] User authenticated:', currentUser);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        await supabase.auth.signOut();
        console.warn('[AuthContext] User not OCF email, signed out.');
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
      console.log('[AuthContext] No session found, user set to null.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('hasLaunched');
      if (stored === 'true') setHasLaunchedState(true);
      console.log(`[AuthContext] hasLaunched from storage: ${stored}`);
      await refreshUser();
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`[AuthContext] Auth state change: ${event}`);
        if (event === 'SIGNED_IN' && session) {
          // Delay refresh to ensure the session is fully available.
          setTimeout(() => {
            refreshUser();
          }, 1000);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          console.log('[AuthContext] User signed out.');
        }
      },
    );

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log(`[AuthContext] App state changed: ${nextAppState}`);
      if (nextAppState === 'active') {
        await refreshUser();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      authListener.subscription.unsubscribe();
      if (typeof subscription.remove === 'function') {
        subscription.remove();
      }
      console.log('[AuthContext] Cleaned up listeners.');
    };
  }, []);

  const logIn = async () => {
    setIsLoading(true);
    console.log('[AuthContext] Logging in...');
    const redirectUrl = makeRedirectUri({ scheme: 'ourcityforest' });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: { hd: 'ourcityforest.org', prompt: 'select_account' },
      },
    });
    if (error || !data?.url) {
      setIsLoading(false);
      console.error('[AuthContext] Login error:', error);
      return;
    }
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
    console.log('[AuthContext] WebBrowser result:', result);
    if (result.type === 'success') {
      const url = result.url;
      if (url.includes('#access_token=')) {
        const params = new URLSearchParams(url.split('#')[1]);
        await supabase.auth.setSession({
          access_token: params.get('access_token') || '',
          refresh_token: params.get('refresh_token') || '',
        });
        console.log('[AuthContext] Set session with access token.');
      } else {
        const code = new URL(url).searchParams.get('code');
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
          console.log('[AuthContext] Exchanged code for session.');
        }
      }
      // Optional: you can also trigger a refresh after a delay here.
      setTimeout(() => {
        refreshUser();
      }, 1000);
    } else {
      setIsLoading(false);
      console.warn('[AuthContext] Login cancelled or failed.');
    }
  };

  const logOut = async () => {
    setIsLoading(true);
    console.log('[AuthContext] Logging out...');
    await supabase.auth.signOut();
    console.log('[AuthContext] Signed out.');
  };

  const contextValue: AuthState = {
    user,
    isAuthenticated,
    isLoading,
    logIn,
    logOut,
    hasLaunched,
    setHasLaunched,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');
  return context;
};
