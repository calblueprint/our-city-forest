import { Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/screens/login/styles';

export default function GoogleSignOutButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        AsyncStorage.removeItem('@user');
      }}
    >
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  );
}
