import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

WebBrowser.maybeCompleteAuthSession();

type GoogleSignInButtonProps = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

export default function GoogleSignInButton({
  navigation,
}: GoogleSignInButtonProps) {
  const { setAuthenticated } = useAuth();
  const [, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'org.calblueprint.ourcityforest' }),
  });

  useEffect(() => {
    const handleSignInWithGoogle = async (token: string) => {
      try {
        const userResponse = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (userResponse.ok) {
          await setAuthenticated(true);
          navigation.navigate('BottomTabs', {
            screen: 'Home',
            params: { screen: 'TreeSearch' },
          });
        } else {
          console.error('Authentication failed');
          await setAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to sign in with Google:', error);
        await setAuthenticated(false);
      }
    };

    if (response?.type === 'success' && response.authentication?.accessToken) {
      handleSignInWithGoogle(response.authentication.accessToken);
    }
  }, [response, navigation, setAuthenticated]);

  return (
    <TouchableOpacity onPress={() => promptAsync()}>
      <Text style={styles.adminLoginLinkText}>Login Here</Text>
    </TouchableOpacity>
  );
}
