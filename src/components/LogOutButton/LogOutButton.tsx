import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

export const LogOutButton: React.FC = () => {
  const { logOut: logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogOut = async () => {
    try {
      await logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'BottomTabs',
              params: {
                screen: 'HomeTab',
                params: { screen: 'TreeSpeciesSearch' },
              },
            },
          ],
        }),
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogOut}>
      <Text style={styles.buttonText}>Log out</Text>
    </TouchableOpacity>
  );
};
