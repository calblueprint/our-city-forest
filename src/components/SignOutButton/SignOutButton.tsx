import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

export const SignOutButton: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const signOut = async () => {
    try {
      await AsyncStorage.setItem('authStatus', 'false');
      setIsAuthenticated(false);

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
    <TouchableOpacity onPress={signOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};
