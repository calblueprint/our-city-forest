import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import SearchBar from '../../components/searchBar';
import { getAllSpecies } from '../../supabase/queries/species';
import { styles } from './styles';

type TreeSearchProps = NativeStackScreenProps<RootStackParamList, 'TreeSearch'>;

type TreeItem = {
  tree_id: number;
  species: string;
  image_url: string;
  sold: boolean;
};

export default function TreeSearch({ navigation }: TreeSearchProps) {
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadTreeData = async () => {
      const speciesData = await getAllSpecies();

      if (!speciesData || speciesData.length === 0) {
        console.error('Failed to fetch tree data');
        return;
      }

      const treesData: TreeItem[] = speciesData.map((species: any) => ({
        tree_id: species.id,
        species: species.name,
        image_url: species.image,
        sold: species.sold ?? false,
      }));

      const remainingTrees = treesData.filter(tree => !tree.sold);

      setTrees(remainingTrees);
    };

    loadTreeData();
  }, []);

  const filteredTrees = trees.filter(tree =>
    tree.species.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const remainingCount = filteredTrees.length;

  const renderTreeCard = ({ item }: { item: TreeItem }) => (
    <View style={styles.treeCard}>
      <ImageBackground
        source={{ uri: item.image_url }}
        style={styles.treeImage}
      />
      <View>
        <Text style={styles.treeName}>{item.species}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.backgroundContainer}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchHeading}>Trees Availability</Text>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FlatList
          data={filteredTrees}
          renderItem={renderTreeCard}
          keyExtractor={item => item.tree_id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.treeGrid}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}
