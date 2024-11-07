import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
<<<<<<< HEAD
import GoogleSignInButton from '@/components/GoogleSignInButton';
=======
import GoogleSignIn from '@/components/GoogleSignIn';
>>>>>>> d83525b (created login screen)
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

<<<<<<< HEAD
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AvailableTrees')}
      >
        <Text style={styles.buttonText}>Guest</Text>
=======
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate('TreeAvailability')}
        >
          Guest
        </Text>
>>>>>>> d83525b (created login screen)
      </TouchableOpacity>

      <View style={styles.adminLoginContainer}>
        <Text style={styles.adminLoginText}>Are you an admin? </Text>
<<<<<<< HEAD
        <GoogleSignInButton navigation={navigation} route={route} />
=======
        <TouchableOpacity onPress={() => GoogleSignIn()}>
          <Text style={styles.adminLoginLinkText}>Login Here</Text>
        </TouchableOpacity>
>>>>>>> d83525b (created login screen)
      </View>
    </View>
  );
}
