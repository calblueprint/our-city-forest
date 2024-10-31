import React, { useEffect } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '@/screens/styles';
import { supabase } from '@/supabase/client';
import { LoginStackParamList } from '@/types/navigation';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  'AdminLogin'
>;

const redirectUri = 'https://auth.expo.io/@cwz/our-city-forest';
// const redirectUri = AuthSession.makeRedirectUri({
//   scheme: "org.calblueprint.ourcityforest",
//   preferLocalhost: false,
// });

export default function GoogleSignInButton() {
  console.log('GoogleSignInButton component rendered');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri,
    scopes: ['profile', 'email'],
  });

  console.log('Request state:', request);

  useEffect(() => {
    console.log('useEffect triggered with response:', response);
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
      if (id_token) {
        console.log('there is id token');
        supabase.auth
          .signInWithIdToken({
            provider: 'google',
            token: id_token,
          })
          .then(({ data, error }) => {
            if (error) {
              console.log('bad');
              Alert.alert('Sign-In Error', error.message);
            } else {
              console.log('yay');
              navigation.navigate('afterlogin');
            }
          });
      } else {
        console.log('no id');
        Alert.alert('Error', 'No ID token present!');
      }
    } else if (response?.type === 'error') {
      console.log('failure');
      Alert.alert('Error', 'Google sign-in failed.');
    } else if (response?.type === 'dismiss') {
      console.log('Sign-in dismissed by the user');
      Alert.alert('Sign-In Canceled', 'The sign-in process was canceled.');
    } else {
      console.log('else: Unknown response type or response is undefined');
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.button}
      disabled={!request}
      onPress={() => {
        console.log('Button pressed - triggering promptAsync');
        promptAsync();
      }}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
