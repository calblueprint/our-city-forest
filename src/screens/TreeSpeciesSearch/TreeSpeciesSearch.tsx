import React, { useEffect, useState } from 'react';
import {
  FlatList,
<<<<<<< HEAD
=======
  Image,
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
<<<<<<< HEAD
import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookmarkModal } from '@/components/BoomarkModal/BookmarkModal';
import { CreateFolderModal } from '@/components/CreateFolderModal/CreateFolderModal';
import {
  TreeSpeciesCard,
  TreeSpeciesCardItem,
} from '@/components/TreeSpeciesCard/TreeSpeciesCard';
import { useAuth } from '@/context/AuthContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { Scanner } from '@/icons';
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Scanner, Bookmark } from '@/icons';
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
import {
  getAllTreeSpecies,
  getAvailableTreeSpecies,
} from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { TreeSpecies, TreeSpeciesFoliageType } from '@/types/tree_species';
<<<<<<< HEAD
import { TreeSearchBar } from '../../components/TreeSearchBar/TreeSearchBar';
=======
import { SearchBar } from '../../components/SearchBar/SearchBar';
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
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

<<<<<<< HEAD
type ModalState = 'none' | 'bookmark' | 'createFolder';

export const TreeSpeciesSearchScreen: React.FC<
  TreeSpeciesSearchScreenProps
> = ({ navigation }) => {
  const { addFolder } = useBookmarks();
=======
export const TreeSpeciesSearchScreen: React.FC<
  TreeSpeciesSearchScreenProps
> = ({ navigation }) => {
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
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

<<<<<<< HEAD
  const [modalState, setModalState] = useState<ModalState>('none');
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [selectedTreeItem, setSelectedTreeItem] =
    useState<TreeSpeciesCardItem | null>(null);

  const [isTreeSpecies, setIsTreeSpecies] = useState(true);
=======
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)

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
<<<<<<< HEAD

=======
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
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
<<<<<<< HEAD
            isCaliforniaNative: ts.california_native,
=======
            californiaNative: ts.california_native,
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
            isEvergreen: ts.foliage_type === TreeSpeciesFoliageType.Evergreen,
            isPowerlineFriendly: ts.utility_friendly,
            rootDamagePotential: ts.root_damage_potential,
          }),
        );
        setTreeSpeciesCards(cards);
      }
    };
<<<<<<< HEAD

=======
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
    loadTreeSpeciesData();
  }, [isUserAdmin]);

  const applyFilters = (tree: treeSpeciesCard) => {
    if (activeFilters.height.length > 0) {
      const maxHeight = parseFloat(tree.maxHeight);
      const matchesHeight = activeFilters.height.some(filter => {
        if (filter === 'small') return maxHeight < 40;
        if (filter === 'medium') return maxHeight >= 40 && maxHeight <= 60;
        if (filter === 'large') return maxHeight > 60;
<<<<<<< HEAD
        return false;
      });
      if (!matchesHeight) return false;
    }

    if (activeFilters.shape && activeFilters.shape !== tree.treeShape) {
      return false;
    }

=======
        return false; // If filter is null or invalid
      });
      if (!matchesHeight) return false;
    }
    if (activeFilters.shape && activeFilters.shape !== tree.treeShape) {
      return false;
    }
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
    if (
      activeFilters.litter.length > 0 &&
      !activeFilters.litter.includes(tree.litterType)
    ) {
      return false;
    }
<<<<<<< HEAD

=======
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
    if (
      activeFilters.water.length > 0 &&
      !activeFilters.water.includes(tree.waterUse)
    ) {
      return false;
    }
<<<<<<< HEAD

    if (activeFilters.other.length > 0) {
      const matchesOther = activeFilters.other.every(option => {
        if (option === 'californiaNative') return tree.isCaliforniaNative;
        if (option === 'evergreen') return tree.isEvergreen;
        if (option === 'powerlineFriendly') return tree.isPowerlineFriendly;
=======
    if (activeFilters.other.length > 0) {
      const matchesOther = activeFilters.other.every(option => {
        if (option === 'californiaNative')
          return tree.isCaliforniaNative || false;
        if (option === 'evergreen') return tree.isEvergreen || false;
        if (option === 'powerlineFriendly')
          return tree.isPowerlineFriendly || false;
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
        if (option === 'lowRootDamage')
          return tree.rootDamagePotential === 'low';
        return false;
      });
      if (!matchesOther) return false;
    }
<<<<<<< HEAD

=======
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
    return true;
  };

  const filteredTreeSpeciesCards = treeSpeciesCards.filter(
    ts =>
      ts.name.toLowerCase().includes(searchText.toLowerCase()) &&
      applyFilters(ts),
  );

<<<<<<< HEAD
  const handleTreePress = (speciesName: string) => {
    navigation.push('TreeSpeciesInfo', { speciesName });
  };

  const handleBookmarkPress = (item: TreeSpeciesCardItem) => {
    setSelectedTreeItem(item);
    setModalState('bookmark');
  };

  const handleCreateFolder = () => {
    setModalState('createFolder');
  };

  const handleCreateFolderComplete = (folderName: string) => {
    addFolder(folderName);
    setModalState('none');
  };

  const handleCloseModal = () => {
    setModalState('none');
  };
=======
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
          <Bookmark width={30} height={30}/>
        </View>
      </View>
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.speciesStock}>{item.stockCount} in stock</Text>
    </TouchableOpacity>
  );
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {isUserAdmin ? 'All Trees' : 'Available Trees'}
          </Text>
          <Scanner onPress={() => navigation.navigate('QRCodeScanner')} />
        </View>
<<<<<<< HEAD
        <TreeSearchBar
=======
        <SearchBar
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
          searchText={searchText}
          onSearchTextChange={setSearchText}
          activeFilters={activeFilters}
          onActiveFilterChange={setActiveFilters}
        />
      </View>
<<<<<<< HEAD

=======
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
      <View style={styles.divider}></View>

      <FlatList
        data={filteredTreeSpeciesCards}
        keyExtractor={item => item.name}
<<<<<<< HEAD
        renderItem={({ item }) => (
          <TreeSpeciesCard
            item={item}
            onPress={handleTreePress}
            onBookmarkPress={handleBookmarkPress}
          />
        )}
=======
        renderItem={renderSpeciesCard}
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
        numColumns={2}
        contentContainerStyle={styles.speciesContainer}
        columnWrapperStyle={{ gap: 16 }}
        ListEmptyComponent={
          <Text style={styles.searchError}>
            No tree species found matching your search.
          </Text>
        }
      />
<<<<<<< HEAD

      {modalState === 'bookmark' && selectedTreeItem && (
        <BookmarkModal
          visible={true}
          onClose={handleCloseModal}
          treeItem={selectedTreeItem}
          onCreateFolder={handleCreateFolder}
        />
      )}

      {modalState === 'createFolder' && (
        <CreateFolderModal
          visible={true}
          onClose={handleCloseModal}
          onCreate={handleCreateFolderComplete}
        />
      )}
=======
>>>>>>> 1593cf3 (add bookmark icons on images and make skeleton for bookmark screen)
    </SafeAreaView>
  );
};
