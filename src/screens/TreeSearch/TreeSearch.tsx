import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Scanner from '@/icons/Scanner';
import { getAvailableTreeSpecies } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import SearchBar from '../../components/SearchBar/SearchBar';
import { styles } from './styles';

type TreeSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeSearch'
>;

type TreeItem = {
  species: string;
  image_link: string;
  stockCount: number;
};

export default function TreeSearch({ navigation }: TreeSearchScreenProps) {
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadTreeData = async () => {
      (async () => {
        const data = await getAvailableTreeSpecies();
        if (data) {
          const formattedData: TreeItem[] = data.map((item: any) => ({
            species: item.species_name,
            image_link:
              item.image_link || 'https://example.com/placeholder.jpg',
            stockCount: item.count,
          }));
          setTrees(formattedData);
        }
      })();
    };
    loadTreeData();
  }, []);

  const filteredTrees = trees.filter(tree =>
    tree.species.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderSpeciesCard = ({ item }: { item: TreeItem }) => (
    <Pressable
      onPress={() =>
        navigation.push('SpeciesInfo', { speciesName: item.species })
      }
      style={styles.speciesCard}
    >
      <ImageBackground
        source={{
          uri: item.image_link || 'https://example.com/placeholder.jpg',
        }}
        style={styles.speciesImage}
      />
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.species}
      </Text>
      <Text style={styles.speciesStock}>{item.stockCount} in stock</Text>
    </Pressable>
  );

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.searchHeading}>Available Trees</Text>
        <Scanner onPress={() => navigation.navigate('QRCodeScanner')} />
      </View>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <FlatList
        data={filteredTrees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSpeciesCard}
        numColumns={2}
        contentContainerStyle={styles.treeContainer}
        ListEmptyComponent={
          <Text style={styles.searchError}>
            No trees found matching your search.
          </Text>
        }
      />
    </>
  );
}
