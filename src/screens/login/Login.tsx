import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { styles } from '@/screens/login/styles';
import { RootStackParamList } from '@/types/navigation';

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginStack'
>;

export default function LoginScreen({ navigation, route }: LoginScreenProps) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>I am a...</Text>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('~/assets/ocf_logo.png')} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Home',
            params: { screen: 'TreeSearch' },
          })
        }
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
