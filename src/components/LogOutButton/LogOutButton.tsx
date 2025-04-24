import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from '@/icons';
import { RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

export const LogOutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogOut = async () => {
    await logout();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginStack' }],
      }),
    );
  };

  return (
    <TouchableOpacity onPress={handleLogOut} style={styles.button}>
      <LogOut />
      <Text style={styles.buttonText}>Log out</Text>
    </TouchableOpacity>
  );
};
