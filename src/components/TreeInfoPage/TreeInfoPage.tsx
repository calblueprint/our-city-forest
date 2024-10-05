import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Logo from '@/components/Logo';
import styles from './styles';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoPage'
>;

export default function TreeInfoPage({ route, navigation }: TreeInfoPageProps) {
  // Just placeholder text for now to show that the tree ID is being passed
  return (
    <View style={styles.container}>
      <Logo />
      <Text>i found a tree</Text>
      <Text>with an id</Text>
      <Text>{route.params.treeId}</Text>
      <Pressable onPress={() => navigation.push('Scanner')}>
        <Text>Back to scanner</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
