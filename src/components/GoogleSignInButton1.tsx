import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/screens/styles';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = 'https://auth.expo.io/@ocfdev/our-city-forest';
export default function GoogleSignInButton() {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri,
  });

  console.log(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);

  console.log('Request URI:', request?.url);

<<<<<<< HEAD
  React.useEffect(() => {
    console.log('Response received:', response);
=======
  useEffect(() => {
>>>>>>> 2efb378 (draft)
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    console.log('Retrieved user from AsyncStorage:', user);
    if (!user) {
      if (
        response?.type === 'success' &&
        response.authentication?.accessToken
      ) {
        console.log('Response is successful, fetching user info...');
        await getUserInfo(response.authentication.accessToken);
      } else {
        console.log('Response is not successful or missing accessToken.');
      }
    } else {
      console.log('User already exists in AsyncStorage, setting user info...');
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) {
      console.log('No token provided, aborting getUserInfo.');
      return;
    }
    console.log('Fetching user info with token:', token);
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = await response.json();
      console.log('Fetched user data:', user);
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  console.log('Current userInfo state:', userInfo);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (request) {
          console.log('Prompting for Google sign-in...');
          promptAsync();
        } else {
          console.log('Request is not ready.');
        }
      }}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
