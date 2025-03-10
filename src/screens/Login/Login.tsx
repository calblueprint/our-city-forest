import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignInButton } from '@/components/SignInButton/SignInButton';
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>I am a...</Text>

      <Image
        style={styles.logo}
        source={require('~/assets/ocf-logo-big.png')}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('BottomTabs', {
            screen: 'HomeTab',
            params: { screen: 'TreeSpeciesSearch' },
          })
        }
      >
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>

      <View style={styles.adminContainer}>
        <Text style={styles.adminText}>Are you an admin? </Text>
        <SignInButton navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};
