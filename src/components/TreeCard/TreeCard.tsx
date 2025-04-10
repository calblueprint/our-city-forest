import { Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigation';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export type treeSpeciesCard = {
  name: string;
  imageURL: string;
  stockCount: number;
  maxHeight: string;
  treeShape: string;
  litterType: string;
  waterUse: string;
  isCaliforniaNative: boolean;
  isEvergreen: boolean;
  isPowerlineFriendly: boolean;
  rootDamagePotential: string;
};

export function TreeCard({ item }: { item: treeSpeciesCard }) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('TreeSpeciesInfo', { speciesName: item.name })
      }
      style={styles.speciesCard}
    >
      <Image
        source={{
          uri: item.imageURL,
        }}
        style={styles.speciesImage}
      />
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.speciesStock}>{item.stockCount} in stock</Text>
    </TouchableOpacity>
  );
}
