import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleSignInButton from '@/screens/login/GoogleSignInButton';
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AvailableTrees')}
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