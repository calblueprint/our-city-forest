import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { ContactStackParamList } from '@/types/navigation';
import { styles } from './styles';

type GoogleSignOutButtonProps = NativeStackScreenProps<
  ContactStackParamList,
  'Contact'
>;

export const GoogleSignOutButton: React.FC<GoogleSignOutButtonProps> = ({
  navigation,
}) => {
  const { setIsAuthenticated: setAuthenticated } = useAuth();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.setItem('authenticated', 'false');
      await setAuthenticated(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginStack' }],
        }),
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  );
};
