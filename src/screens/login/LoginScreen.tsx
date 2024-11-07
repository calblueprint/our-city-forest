import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleSignIn from '@/components/GoogleSignIn';
import { LoginStackParamList } from '@/types/navigation';
import { styles } from './styles';

type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export default function LoginScreen({ navigation, route }: LoginProps) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>I am a...</Text>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('~/assets/ocf_logo.png')} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate('TreeAvailability')}
        >
          Guest
        </Text>
      </TouchableOpacity>

      <View style={styles.adminLoginContainer}>
        <Text style={styles.adminLoginText}>Are you an admin? </Text>
        <TouchableOpacity onPress={() => GoogleSignIn()}>
          <Text style={styles.adminLoginLinkText}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
