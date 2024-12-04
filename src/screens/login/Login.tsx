import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { LoginStackParamList } from '@/types/navigation';
import { styles } from './styles';

type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export default function LoginScreen({ navigation, route }: LoginScreenProps) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>I am a...</Text>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('~/assets/ocf_logo.png')} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TreeSearch')}
      >
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>

      <View style={styles.adminLoginContainer}>
        <Text style={styles.adminLoginText}>Are you an admin? </Text>
        <GoogleSignInButton navigation={navigation} route={route} />
      </View>
    </View>
  );
}
