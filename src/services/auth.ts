import { makeRedirectUri } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth.accessToken';
const REFRESH_TOKEN_KEY = 'auth.refreshToken';
const EXPIRATION_KEY = 'auth.expiration';
const USER_INFO_KEY = 'auth.userInfo';

export const googleConfig = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  redirectUri: makeRedirectUri({ scheme: 'ourcityforest' }),
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiration: number;
};

export type UserInfo = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

export const storeTokens = async (
  tokens: AuthTokens,
  userInfo: UserInfo,
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
    await SecureStore.setItemAsync(
      EXPIRATION_KEY,
      tokens.expiration.toString(),
    );
    await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error('Failed to store authentication tokens:', error);
    throw error;
  }
};

export const getTokens = async (): Promise<{
  tokens: AuthTokens | null;
  userInfo: UserInfo | null;
}> => {
  try {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    const expiration = await SecureStore.getItemAsync(EXPIRATION_KEY);
    const userInfoStr = await SecureStore.getItemAsync(USER_INFO_KEY);

    if (!accessToken || !refreshToken || !expiration) {
      return { tokens: null, userInfo: null };
    }

    const userInfo = userInfoStr ? (JSON.parse(userInfoStr) as UserInfo) : null;

    return {
      tokens: {
        accessToken,
        refreshToken,
        expiration: parseInt(expiration, 10),
      },
      userInfo,
    };
  } catch (error) {
    console.error('Failed to retrieve authentication tokens:', error);
    return { tokens: null, userInfo: null };
  }
};

export const isTokenExpired = (expirationTime: number): boolean => {
  const bufferTime = 5 * 60 * 1000;
  return Date.now() >= expirationTime - bufferTime;
};

export const removeTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(EXPIRATION_KEY);
    await SecureStore.deleteItemAsync(USER_INFO_KEY);
  } catch (error) {
    console.error('Failed to remove authentication tokens:', error);
    throw error;
  }
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<AuthTokens | null> => {
  try {
    // TODO: Implement token refreshing with Supabase
    console.warn('Token refresh not fully implemented - needs backend support');
    return null;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};

export const fetchGoogleUserInfo = async (
  accessToken: string,
): Promise<UserInfo | null> => {
  try {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info from Google');
    }

    const data = await response.json();

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    };
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};
