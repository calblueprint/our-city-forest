import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Scanner } from '@/icons';
import { getAvailableTreeSpecies } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { TreeSpecies, TreeSpeciesFoliageType } from '@/types/tree_species';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { styles } from './styles';

type TreeSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeSearch'
>;

type TreeSpeciesItem = {
  species: string;
  image_url: string;
  stock_count: number;
  max_height: string;
  tree_shape: string;
  litter_type: string;
  water_use: string;
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

export function TreeSearchScreen({ navigation }: TreeSearchScreenProps) {
  const [trees, setTrees] = useState<TreeSpeciesItem[]>([]);
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
        if (data) {
          const formattedData: TreeSpeciesItem[] = data.map(
            (item: TreeSpecies & { count: number }) => ({
              species: item.name,
              image_url:
                item.image_url || 'https://example.com/placeholder.jpg',
              stock_count: item.count,
              max_height_ft: item.max_height_ft,
              tree_shape: item.tree_shape,
              litter_type: item.litter_type,
              water_use: item.water_use,
              california_native: item.california_native,
              evergreen: item.foliage_type === TreeSpeciesFoliageType.Evergreen,
              powerline_friendly: item.utility_friendly,
              root_damage_potential: item.root_damage_potential,
            }),
          );
          setTrees(formattedData);
        }
      })();
    };
    loadTreeData();
  }, []);

  const applyFilters = (tree: TreeSpeciesItem) => {
    if (filters.height.length > 0) {
      const height_ft = parseFloat(tree.max_height);
      const matchesHeight = filters.height.some(filter => {
        if (filter === 'small') return height_ft < 40;
        if (filter === 'medium') return height_ft >= 40 && height_ft <= 60;
        if (filter === 'large') return height_ft > 60;
        return false; // If filter is null or invalid
      });
      if (!matchesHeight) return false;
    }
    if (filters.shape && filters.shape !== tree.tree_shape) {
      return false;
    }
    if (filters.fruit.length > 0 && !filters.fruit.includes(tree.litter_type)) {
      return false;
    }
    if (filters.water.length > 0 && !filters.water.includes(tree.water_use)) {
      return false;
    }
    if (filters.other.length > 0) {
      const matchesOther = filters.other.every(option => {
        if (option === 'native') return tree.california_native || false;
        if (option === 'evergreen') return tree.evergreen || false;
        if (option === 'powerline') return tree.powerline_friendly || false;
        if (option === 'lowroot') return tree.root_damage_potential === 'low';
        return false;
      });
      if (!matchesOther) return false;
    }
    return true; // Pass all filters
  };

  const filteredTrees = trees.filter(
    tree =>
      tree.species.toLowerCase().includes(searchQuery.toLowerCase()) &&
      applyFilters(tree),
  );

  const renderSpeciesCard = ({ item }: { item: TreeSpeciesItem }) => (
    <Pressable
      onPress={() =>
        navigation.push('SpeciesInfo', { speciesName: item.species })
      }
      style={styles.speciesCard}
    >
      <ImageBackground
        source={{
          uri: item.image_url || 'https://example.com/placeholder.jpg',
        }}
        style={styles.speciesImage}
      />
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.species}
      </Text>
      <Text style={styles.speciesStock}>{item.stock_count} in stock</Text>
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
