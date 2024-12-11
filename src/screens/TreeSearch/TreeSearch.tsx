import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QrCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import Scanner from '@/icons/Scanner';
import { RootStackParamList } from '@/types/navigation';
import SearchBar from '../../components/searchBar';
import { supabase } from '../../supabase/client';
import { styles } from './styles';

type TreeSearchProps = NativeStackScreenProps<RootStackParamList, 'TreeSearch'>;

type TreeItem = {
  tree_id: number;
  species: string;
  image_link: string;
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
        const { data, error } = await supabase
          .from('trees')
          .select('tree_id, species, sold, species (name, image_link)');

        if (error) {
          throw new Error(`Error fetching tree data: ${error.message}`);
        }

        const treeCounts: Record<string, number> = data.reduce(
          (acc, tree) => {
            if (!tree.sold) {
              acc[tree.species.name] = (acc[tree.species.name] || 0) + 1;
            }
            return acc;
          },
          {} as Record<string, number>,
        );

        const treesData: TreeItem[] = Object.keys(treeCounts).map(
          speciesName => {
            const treeSample = data.find(
              tree => tree.species.name === speciesName,
            );

            return {
              tree_id: treeSample?.tree_id || 0,
              species: speciesName,
              image_link: treeSample?.species?.image_link || '',
              sold: false,
              stockCount: treeCounts[speciesName],
            };
          },
        );

        setTrees(treesData);
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

  const renderTreeCard = ({ item }: { item: TreeItem }) => (
    <View style={styles.treeCard}>
      <ImageBackground
        source={{
          uri: item.image_link || 'https://example.com/placeholder.jpg',
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
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.searchHeading}>Trees Inventory</Text>
        <Scanner
          style={styles.scannerIcon}
          onPress={() => navigation.navigate('QRCodeScanner')}
        />
      </View>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <FlatList
        data={filteredTrees}
        keyExtractor={item => item.tree_id.toString()}
        renderItem={renderTreeCard}
        numColumns={2}
        contentContainerStyle={styles.treeContainer}
        ListEmptyComponent={
          <Text style={styles.treeError}>
            No trees found matching your search.
          </Text>
        }
      />
    </>
  );
}
