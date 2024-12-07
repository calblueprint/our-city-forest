import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigation';
import styles from './styles';

type TreeInfoScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeInfo'
>;

export default function TreeInfoScreen({
  route,
  navigation,
}: TreeInfoScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Tree Id:</Text>
      <Text>{route.params.treeId}</Text>

      <Pressable onPress={() => navigation.push('QRCodeScanner')}>
        <Text>Back to scanner</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
