import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Scanner from '@/icons/Scanner';
import { getAvailableTreeSpecies } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { Species } from '@/types/species';
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
  height: string;
  shape: string;
  litter: string;
  water: string;
  california_native: boolean;
  evergreen: boolean;
  powerline_friendly: boolean;
  root_damage_potential: string;
};

type FilterState = {
  height: string[];
  shape: string;
  fruit: string[];
  water: string[];
  other: string[];
};

export default function TreeSearch({ navigation }: TreeSearchScreenProps) {
  const [trees, setTrees] = useState<TreeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    height: [],
    shape: '',
    fruit: [],
    water: [],
    other: [],
  });

  useEffect(() => {
    const loadTreeData = async () => {
      (async () => {
        const data = await getAvailableTreeSpecies();
        console.log('Raw Supabase data:', data);
        console.log('Fetched data:', data);
        if (data) {
          const formattedData: TreeItem[] = data.map(
            (item: Species & { count: number }) => ({
              species: item.name,
              image_link:
                item.image_link || 'https://example.com/placeholder.jpg',
              stockCount: item.count,
              height: item.height_ft,
              shape: item.tree_shape,
              litter: item.fruit_type,
              water: item.water_amount,
              california_native: item.ca_native,
              evergreen: item.evergreen,
              powerline_friendly: item.powerline_friendly,
              root_damage_potential: item.root_damage_potential,
            }),
          );
          setTrees(formattedData);
        }
      })();
    };
    loadTreeData();
  }, []);

  const applyFilters = (tree: TreeItem) => {
    console.log('Checking tree:', tree);
    console.log('With filters:', filters);
    if (filters.height.length > 0) {
      const height_ft = parseFloat(tree.height);
      console.log(
        'Tree height (parsed):',
        height_ft,
        'Height filter:',
        filters.height,
      );
      const matchesHeight = filters.height.some(filter => {
        console.log('Checking height filter:', filter);
        if (filter === 'small') return height_ft < 40;
        if (filter === 'medium') return height_ft >= 40 && height_ft <= 60;
        if (filter === 'large') return height_ft > 60;
        return false; // If filter is null or invalid
      });
      console.log('Matches height:', matchesHeight);
      if (!matchesHeight) return false;
    }
    if (filters.shape && filters.shape !== tree.shape) {
      console.log('Tree shape:', tree.shape, 'Shape filter:', filters.shape);
      return false;
    }
    if (filters.fruit.length > 0 && !filters.fruit.includes(tree.litter)) {
      console.log('Tree litter:', tree.litter, 'Fruit filter:', filters.fruit);
      return false;
    }
    if (filters.water.length > 0 && !filters.water.includes(tree.water)) {
      console.log('Tree water:', tree.water, 'Water filter:', filters.water);
      return false;
    }
    if (filters.other.length > 0) {
      console.log('Tree other properties:', {
        native: tree.california_native,
        evergreen: tree.evergreen,
        powerline: tree.powerline_friendly,
        lowroot: tree.root_damage_potential,
      });
      console.log('Other filters:', filters.other);
      const matchesOther = filters.other.every(option => {
        if (option === 'native') return tree.california_native || false;
        if (option === 'evergreen') return tree.evergreen || false;
        if (option === 'powerline') return tree.powerline_friendly || false;
        if (option === 'lowroot') return tree.root_damage_potential === 'low';
        return false;
      });
      console.log('Matches other filters:', matchesOther);
      if (!matchesOther) return false;
    }
    console.log('Tree passes all filters:', tree.species);
    return true; // Pass all filters
  };

  const filteredTrees = trees.filter(
    tree =>
      tree.species.toLowerCase().includes(searchQuery.toLowerCase()) &&
      applyFilters(tree),
  );
  console.log('Filtered trees:', filteredTrees);

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Available Trees</Text>
        <Scanner onPress={() => navigation.navigate('QRCodeScanner')} />
      </View>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />

      <FlatList
        data={filteredTrees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSpeciesCard}
        numColumns={2}
        contentContainerStyle={styles.speciesContainer}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
        ListEmptyComponent={
          <Text style={styles.searchError}>
            No trees found matching your search.
          </Text>
        }
      />
    </>
  );
}
