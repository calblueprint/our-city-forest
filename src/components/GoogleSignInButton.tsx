import { Alert } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '@/supabase/client';

GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
});

export default function GoogleSignInButton() {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo && userInfo.data && userInfo.data.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.data.idToken,
            });
            console.log(error, data);
          } else {
            throw new Error('no ID token present!');
          }
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Alert.alert('Cancelled', 'Google sign-in was cancelled.');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            Alert.alert(
              'Sign-in in Progress',
              'Google sign-in is currently in progress.',
            );
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert(
              'Error',
              'Google Play Services not available or outdated.',
            );
          } else {
            Alert.alert('Error', 'An unknown error occurred during sign-in.');
          }
        }
      }}
    />
  );
}
