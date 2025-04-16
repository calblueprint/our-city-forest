import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

type LogInButtonProps = Partial<
  CompositeScreenProps<
    NativeStackScreenProps<LoginStackParamList, 'Login'>,
    NativeStackScreenProps<RootStackParamList, 'BottomTabs'>
  >
>;

export const LogInButton: React.FC<LogInButtonProps> = ({ navigation }) => {
  const { logIn: login, isAuthenticated, setHasLaunched } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated && navigation) {
      setHasLaunched(true);
      navigation.navigate('BottomTabs', {
        screen: 'HomeTab',
        params: { screen: 'Home' },
      });
    }
  }, [isAuthenticated, setHasLaunched, navigation]);

  return (
    <TouchableOpacity onPress={login}>
      <Text style={styles.loginText}>Log in here</Text>
    </TouchableOpacity>
  );
};
