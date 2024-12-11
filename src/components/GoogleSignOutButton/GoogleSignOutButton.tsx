import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { ContactStackParamList } from '@/types/navigation';
import { styles } from './styles';

type GoogleSignOutButtonProps = NativeStackScreenProps<ContactStackParamList, 'Contact'>;

export default function GoogleSignOutButton({ navigation }: GoogleSignOutButtonProps) {
  const { setAuthenticated } = useAuth(); 

  const handleSignOut = async () => {
    try {
      await AsyncStorage.setItem('authenticated', 'false');
      await setAuthenticated(false); 
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginStack' }],
        })
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleSignOut}
    >
      <Text style={styles.buttonText}>
        Sign out
      </Text>
    </TouchableOpacity>
  );
}
