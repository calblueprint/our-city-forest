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
  stockCount: number;
};

export default function TreeSearch({ navigation }: TreeSearchProps) {
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTreeData = async () => {
      try {
        setLoading(true);
        const speciesData = await getAllSpecies();

        if (!speciesData || speciesData.length === 0) {
          throw new Error('No tree data found');
        }

        const treesData: TreeItem[] = speciesData.map((species: any) => ({
          tree_id: species.id ?? -1,
          species: species.name ?? 'Unknown Species',
          image_url: species.image ?? '',
          sold: species.sold ?? false,
          stockCount: species.stockCount ?? 0,
        }));

        const remainingTrees = treesData.filter(tree => !tree.sold);
        setTrees(remainingTrees);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch tree data:', err);
        setError('Unable to load tree data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTreeData();
  }, []);

  const filteredTrees = trees.filter(tree =>
    tree.species.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedTrees = filteredTrees.reduce(
    (acc, tree) => {
      if (!tree.sold) {
        if (!acc[tree.species]) {
          acc[tree.species] = [];
        }
        acc[tree.species].push(tree);
      }
      return acc;
    },
    {} as Record<string, TreeItem[]>,
  );

  const renderTreeCard = ({ item }: { item: TreeItem }) => (
    <View style={styles.treeCard}>
      <ImageBackground
        source={{
          uri: item.image_url || 'https://example.com/placeholder.jpg',
        }}
        style={styles.treeImage}
      />
      <Text style={styles.treeName} numberOfLines={1}>
        {item.species}
      </Text>
      <Text style={styles.treeStock}>{item.stockCount} in stock</Text>
    </View>
  );

  return (
    <ScrollView style={styles.backgroundContainer}>
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchHeading}>Trees Inventory</Text>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </View>

      <FlatList
        data={Object.entries(groupedTrees)}
        keyExtractor={([species]) => species}
        renderItem={({ item: [species, treesArray] }) => (
          <View key={species}>
            <FlatList
              data={treesArray}
              renderItem={renderTreeCard}
              keyExtractor={item => item.tree_id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.treeGrid}
            />
          </View>
        )}
        contentContainerStyle={styles.backgroundContainer}
        ListEmptyComponent={
          <Text style={styles.treeError}>
            No trees found matching your search.
          </Text>
        }
      />
    </ScrollView>
  );
}
