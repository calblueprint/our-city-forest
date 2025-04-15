import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
// import { Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthTokens,
  fetchGoogleUserInfo,
  getTokens,
  googleConfig,
  isTokenExpired,
  refreshAccessToken,
  removeTokens,
  storeTokens,
  UserInfo,
} from '../services/auth';

WebBrowser.maybeCompleteAuthSession();

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: UserInfo | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  hasLaunched: boolean;
  setHasLaunched: (val: boolean) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [hasLaunched, _setHasLaunched] = useState(false);

  const setHasLaunched = async (val: boolean) => {
    _setHasLaunched(val);
    await AsyncStorage.setItem('hasLaunched', val.toString());
  };

  const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const { tokens, userInfo: storedUserInfo } = await getTokens();

        if (tokens) {
          if (isTokenExpired(tokens.expiration)) {
            const refreshedTokens = await refreshAccessToken(
              tokens.refreshToken,
            );

            if (refreshedTokens) {
              await storeTokens(refreshedTokens, storedUserInfo!);
              setIsAuthenticated(true);
              setUserInfo(storedUserInfo);
            } else {
              await removeTokens();
              setIsAuthenticated(false);
              setUserInfo(null);
            }
          } else {
            setIsAuthenticated(true);
            setUserInfo(storedUserInfo);
          }
        } else {
          setIsAuthenticated(false);
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const loadLaunchState = async () => {
      const stored = await AsyncStorage.getItem('hasLaunched');
      if (stored === 'true') {
        _setHasLaunched(true);
      }
    };
    loadLaunchState();
  }, []);

  useEffect(() => {
    const handleAuthResponse = async () => {
      if (
        response?.type === 'success' &&
        response.authentication?.accessToken
      ) {
        try {
          setIsLoading(true);

          const accessToken = response.authentication.accessToken;

          const fetchedUserInfo = await fetchGoogleUserInfo(accessToken);

          if (fetchedUserInfo) {
            // if (!fetchedUserInfo.email?.endsWith('@ourcityforest.org')) {
            //   Alert.alert(
            //     'Unauthorized Email',
            //     'You must use an @ourcityforest.org email address to log in.',
            //     [{ text: 'OK' }],
            //   );
            //   setIsLoading(false);
            //   return;
            // }

            const expiration = Date.now() + 3600 * 1000;

            const tokens: AuthTokens = {
              accessToken,
              refreshToken: response.authentication.refreshToken || '',
              expiration,
            };

            await storeTokens(tokens, fetchedUserInfo);

            setIsAuthenticated(true);
            setUserInfo(fetchedUserInfo);
          } else {
            throw new Error('Failed to get user info');
          }
        } catch (error) {
          console.error('Failed to handle auth response:', error);
          setIsAuthenticated(false);
          setUserInfo(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (response) {
      handleAuthResponse();
    }
  }, [response]);

  const login = async () => {
    if (!request) {
      console.error('Auth request not ready');
      return;
    }

    try {
      await promptAsync();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await removeTokens();
      setIsAuthenticated(false);
      setUserInfo(null);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthState = {
    isAuthenticated,
    isLoading,
    userInfo,
    login,
    logout,
    hasLaunched,
    setHasLaunched,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
