import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogInButton } from '@/components/LogInButton/LogInButton';
import { useAuth } from '@/context/AuthContext';
import { LogoBig } from '@/icons';
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
  const { setHasLaunched } = useAuth();

  const handleGuestPress = () => {
    setHasLaunched(true);
    navigation.navigate('BottomTabs', {
      screen: 'HomeTab',
      params: { screen: 'TreeSpeciesSearch' },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Our City Forest</Text>

      <View style={styles.logo}>
        <LogoBig />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGuestPress}>
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>

      <View style={styles.adminContainer}>
        <Text style={styles.adminText}>Are you an admin? </Text>
        <LogInButton navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};
