import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

WebBrowser.maybeCompleteAuthSession();

type GoogleSignInButtonProps = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

type UserInfo = {
  email: string;
  name: string;
};

export default function GoogleSignInButton({
  navigation,
}: GoogleSignInButtonProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: 'org.calblueprint.ourcityforest' }),
  });

  console.log(request);
  console.log(userInfo);

  useEffect(() => {
    async function handleSignInWithGoogle() {
      try {
        const userJSON = await AsyncStorage.getItem('@user');
        if (userJSON) {
          setUserInfo(JSON.parse(userJSON));
        } else if (
          response?.type === 'success' &&
          response.authentication?.accessToken
        ) {
          await getUserInfo(response.authentication.accessToken);
          navigation.navigate('BottomTabs', {
            screen: 'Home',
            params: { screen: 'TreeSearch' },
          });
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    }

    handleSignInWithGoogle();
  }, [navigation, response]);

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
      onPress={() => {
        promptAsync();
        navigation.navigate('BottomTabs', {
          screen: 'Home',
          params: { screen: 'TreeSearch' },
        });
      }}
    >
      <Text style={styles.adminLoginLinkText}>Login Here</Text>
    </TouchableOpacity>
  );
}
