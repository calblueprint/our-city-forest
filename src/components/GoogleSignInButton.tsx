import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from '@/screens/login/styles';
import { LoginStackParamList } from '@/types/navigation';

WebBrowser.maybeCompleteAuthSession();

type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export default function GoogleSignInButton({ navigation, route }: LoginProps) {
=======
import { styles } from '@/screens/styles';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
>>>>>>> 2fb4108 (feat: login with google (#9))
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'org.calblueprint.ourcityforest' }),
  });

  console.log(request);
  console.log(userInfo);

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    try {
      const userJSON = await AsyncStorage.getItem('@user');
      if (userJSON) {
        setUserInfo(JSON.parse(userJSON));
      } else if (
        response?.type === 'success' &&
        response.authentication?.accessToken
      ) {
        getUserInfo(response.authentication.accessToken);
      }
    } catch (error) {
      console.error('Error retrieving user data from AsyncStorage:', error);
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const userResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = await userResponse.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  return (
    <TouchableOpacity
<<<<<<< HEAD
      onPress={() => {
        promptAsync();
        navigation.navigate('AllTrees');
      }}
    >
      <Text style={styles.adminLoginLinkText}>Login Here</Text>
=======
      style={styles.button}
      onPress={() => {
        promptAsync();
      }}
    >
      <Text style={styles.buttonText}>Sign in with Google</Text>
>>>>>>> 2fb4108 (feat: login with google (#9))
    </TouchableOpacity>
  );
}
