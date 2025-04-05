import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookmarkModal from '@/components/BoomarkModal/BookmarkModal';
import { Bookmark, Scanner } from '@/icons';
import {
  getAllTreeSpecies,
  getAvailableTreeSpecies,
} from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { TreeSpecies, TreeSpeciesFoliageType } from '@/types/tree_species';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { styles } from './styles';

type TreeSpeciesSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeSpeciesSearch'
>;

type treeSpeciesCard = {
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

type ActiveFilters = {
  height: string[];
  shape: string;
  litter: string[];
  water: string[];
  other: string[];
};

export const TreeSpeciesSearchScreen: React.FC<
  TreeSpeciesSearchScreenProps
> = ({ navigation }) => {
  const [treeSpeciesCards, setTreeSpeciesCards] = useState<treeSpeciesCard[]>(
    [],
  );
  const [searchText, setSearchText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    height: [],
    shape: '',
    litter: [],
    water: [],
    other: [],
  });

  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('authStatus');
        setIsUserAdmin(status === 'true');
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    fetchAuthStatus();
  }, []);

  useEffect(() => {
    const loadTreeSpeciesData = async () => {
      const treeSpecies = isUserAdmin
        ? await getAllTreeSpecies()
        : await getAvailableTreeSpecies();
      if (treeSpecies) {
        const cards: treeSpeciesCard[] = treeSpecies.map(
          (ts: TreeSpecies & { count: number }) => ({
            name: ts.name,
            imageURL: ts.image_url || 'https://example.com/placeholder.jpg',
            stockCount: ts.count,
            maxHeight: ts.max_height_ft,
            treeShape: ts.tree_shape,
            litterType: ts.litter_type,
            waterUse: ts.water_use,
            californiaNative: ts.california_native,
            isEvergreen: ts.foliage_type === TreeSpeciesFoliageType.Evergreen,
            isPowerlineFriendly: ts.utility_friendly,
            rootDamagePotential: ts.root_damage_potential,
          }),
        );
        setTreeSpeciesCards(cards);
      }
    };
    loadTreeSpeciesData();
  }, [isUserAdmin]);

  const applyFilters = (tree: treeSpeciesCard) => {
    if (activeFilters.height.length > 0) {
      const maxHeight = parseFloat(tree.maxHeight);
      const matchesHeight = activeFilters.height.some(filter => {
        if (filter === 'small') return maxHeight < 40;
        if (filter === 'medium') return maxHeight >= 40 && maxHeight <= 60;
        if (filter === 'large') return maxHeight > 60;
        return false; // If filter is null or invalid
      });
      if (!matchesHeight) return false;
    }
    if (activeFilters.shape && activeFilters.shape !== tree.treeShape) {
      return false;
    }
    if (
      activeFilters.litter.length > 0 &&
      !activeFilters.litter.includes(tree.litterType)
    ) {
      return false;
    }
    if (
      activeFilters.water.length > 0 &&
      !activeFilters.water.includes(tree.waterUse)
    ) {
      return false;
    }
    if (activeFilters.other.length > 0) {
      const matchesOther = activeFilters.other.every(option => {
        if (option === 'californiaNative')
          return tree.isCaliforniaNative || false;
        if (option === 'evergreen') return tree.isEvergreen || false;
        if (option === 'powerlineFriendly')
          return tree.isPowerlineFriendly || false;
        if (option === 'lowRootDamage')
          return tree.rootDamagePotential === 'low';
        return false;
      });
      if (!matchesOther) return false;
    }
    return true;
  };

  const filteredTreeSpeciesCards = treeSpeciesCards.filter(
    ts =>
      ts.name.toLowerCase().includes(searchText.toLowerCase()) &&
      applyFilters(ts),
  );

  const renderSpeciesCard = ({ item }: { item: treeSpeciesCard }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push('TreeSpeciesInfo', { speciesName: item.name })
      }
      style={styles.speciesCard}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.imageURL,
          }}
          style={styles.speciesImage}
        />
        <View style={styles.overlaySvg}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Bookmark width={30} height={30} />
          </TouchableOpacity>

          <BookmarkModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </View>
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.speciesStock}>{item.stockCount} in stock</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {isUserAdmin ? 'All Trees' : 'Available Trees'}
          </Text>
          <Scanner onPress={() => navigation.navigate('QRCodeScanner')} />
        </View>
        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          activeFilters={activeFilters}
          onActiveFilterChange={setActiveFilters}
        />
      </View>
      <View style={styles.divider}></View>

      <FlatList
        data={filteredTreeSpeciesCards}
        keyExtractor={item => item.name}
        renderItem={renderSpeciesCard}
        numColumns={2}
        contentContainerStyle={styles.speciesContainer}
        columnWrapperStyle={{ gap: 16 }}
        ListEmptyComponent={
          <Text style={styles.searchError}>
            No tree species found matching your search.
          </Text>
        }
      />
    </SafeAreaView>
  );
};
