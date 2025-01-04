import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoogleSignInButton } from '@/components/GoogleSignInButton/GoogleSignInButton';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
>;

export const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>I am a...</Text>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('~/assets/ocf_logo.png')} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('BottomTabs', {
            screen: 'Home',
            params: { screen: 'TreeSearch' },
          })
        }
      >
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>

      <View style={styles.adminLoginContainer}>
        <Text style={styles.adminLoginText}>Are you an admin? </Text>
        <GoogleSignInButton navigation={navigation} route={route} />
      </View>
    </View>
  );
};
