import { ImageBackground, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TreeBg from '@/assets/tree-info-bg.png';
import { RootStackParamList } from '@/types';
import styles from './styles';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoScreen'
>;

export default function TreeInfoPage({ route }: TreeInfoPageProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={TreeBg}></ImageBackground>
    </View>
  );
}
