import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import styles from './styles';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoPage'
>;

export default function TreeInfo({ route, navigation }: TreeInfoPageProps) {
  return (
    <View style={styles.container}>
      <Text>Tree Id:</Text>
      <Text>{route.params.treeId}</Text>

      <Pressable onPress={() => navigation.push('Scanner')}>
        <Text>Back to scanner</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
