import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList } from '@/types/navigation';
import { styles } from '../screens/styles';

type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export default function Login({ navigation, route }: LoginProps) {
  return (
    <View style={styles.loginSelectionContainer}>
      <Text style={styles.loginHeadingText}>I am a...</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminLogin')}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
