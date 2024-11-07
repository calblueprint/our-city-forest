import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/screens/styles';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'org.calblueprint.ourcityforest' }),
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (
        response?.type === 'success' &&
        response.authentication?.accessToken
      ) {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) {
      return;
    }
    try {
      const resp = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await resp.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (response) {
      console.error('Failed to fetch user data');
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        promptAsync();
      }}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
