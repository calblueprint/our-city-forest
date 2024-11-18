import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Login from '@/components/Login';
import { styles } from '@/screens/login/styles';
import { LoginStackParamList } from '@/types/navigation';

type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export default function LoginScreen({ navigation, route }: LoginProps) {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.profileContainer}>
        <Svg height="220" width="220">
          <Circle cx="110" cy="110" r="110" fill="#D9D9D9" />
        </Svg>
      </View>
      <Login navigation={navigation} route={route} />
    </View>
  );
}
