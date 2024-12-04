import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import styles from './styles';

type TreeInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoScreen'
>;

export default function TreeInfoScreen({
  route,
  navigation,
}: TreeInfoScreenProps) {
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
