import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { styles } from '@/screens/styles';

export default function MemberLoginScreen() {
  return (
    <View style={styles.memberLoginContainer}>
      <Text style={styles.loginHeadingText}>Staff and Member Login</Text>
      <View style={styles.googleLoginProfileContainer}>
        <Svg height="220" width="220">
          <Circle cx="110" cy="110" r="110" fill="#D9D9D9" />
        </Svg>
      </View>
      <GoogleSignInButton />
    </View>
  );
}