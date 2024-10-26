import React, { useEffect } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { styles } from '@/screens/styles';
import { supabase } from '@/supabase/client';

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'org.calblueprint.ourcityforest',
  preferLocalhost: Constants.appOwnership !== 'expo',
});

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        supabase.auth
          .signInWithIdToken({
            provider: 'google',
            token: id_token,
          })
          .then(({ data, error }) => {
            if (error) {
              Alert.alert('Sign-In Error', error.message);
            } else {
              console.log(data);
            }
          });
      } else {
        Alert.alert('Error', 'No ID token present!');
      }
    } else if (response?.type === 'error') {
      Alert.alert('Error', 'Google sign-in failed.');
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.button}
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
