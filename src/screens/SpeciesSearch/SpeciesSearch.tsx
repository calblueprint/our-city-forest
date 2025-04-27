import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShrubSearchBar } from '@/components/ShrubSearchBar/ShrubSearchBar';
import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch';
import { useAuth } from '@/context/AuthContext';
import { Scanner } from '@/icons';
import {
  getAllShrubSpecies,
  getAvailableShrubSpecies,
} from '@/supabase/queries/shrub_species';
import {
  getAllTreeSpecies,
  getAvailableTreeSpecies,
} from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { ShrubSpecies } from '@/types/shrub_species';
import { TreeSpecies, TreeSpeciesFoliageType } from '@/types/tree_species';
import { TreeSearchBar } from '../../components/TreeSearchBar/TreeSearchBar';
import { styles } from './styles';

type TreeSpeciesSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'SpeciesSearch'
>;

type treeSpeciesCard = {
  name: string;
  imageURL: string;
  availableCount: number;
  totalCount: number;
  maxHeight: string;
  treeShape: string;
  litterType: string;
  waterUse: string;
  isCaliforniaNative: boolean;
  isEvergreen: boolean;
  isPowerlineFriendly: boolean;
  rootDamagePotential: string;
};

type treeFilters = {
  height: string[];
  shape: string;
  litter: string[];
  water: string[];
  other: string[];
};

type shrubSpeciesCard = {
  name: string;
  imageURL: string;
  availableCount: number;
  totalCount: number;
  dormancy: string;
  dimension: string;
  bloomType: string;
  sunExposure: string;
  soilNeeds: string;
  growthRate: string;
  waterUse: string;
  isCaliforniaNative: boolean;
  isLowGrowing: boolean;
};

type shrubFilters = {
  bloom: string[];
  sun_exposure: string[];
  water_use: string[];
  growth_rate: string[];
  other: string[];
};

export const SpeciesSearchScreen: React.FC<TreeSpeciesSearchScreenProps> = ({
  navigation,
}) => {
  const [treeSpeciesCards, setTreeSpeciesCards] = useState<treeSpeciesCard[]>(
    [],
  );
  const [shrubSpeciesCards, setShrubSpeciesCards] = useState<
    shrubSpeciesCard[]
  >([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isTreeSpecies, setIsTreeSpecies] = useState(true);
  const [treeFilters, setTreeFilters] = useState<treeFilters>({
    height: [],
    shape: '',
    litter: [],
    water: [],
    other: [],
  });
  const [shrubFilters, setShrubFilters] = useState<shrubFilters>({
    bloom: [],
    sun_exposure: [],
    water_use: [],
    growth_rate: [],
    other: [],
  });

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadTreeSpeciesData = async () => {
      const treeSpecies = isAuthenticated
        ? await getAllTreeSpecies()
        : await getAvailableTreeSpecies();
      if (treeSpecies) {
        const cards: treeSpeciesCard[] = treeSpecies.map(
          (ts: TreeSpecies & { count: number }) => ({
            name: ts.name,
            imageURL: ts.image_url || 'https://example.com/placeholder.jpg',
            availableCount: ts.count,
            totalCount: ts.count,
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

    const loadShrubSpeciesData = async () => {
      const shrubSpecies = isAuthenticated
        ? await getAllShrubSpecies()
        : await getAvailableShrubSpecies();
      if (shrubSpecies) {
        const cards: shrubSpeciesCard[] = shrubSpecies.map(
          (ss: ShrubSpecies & { count: number }) => ({
            name: ss.name,
            imageURL: ss.image_url,
            availableCount: ss.available_stock,
            totalCount: ss.total_stock,
            dormancy: ss.dormancy,
            dimension: ss.dimensions,
            bloomType: ss.bloom,
            sunExposure: ss.sun_exposure,
            soilNeeds: ss.soil_needs,
            growthRate: ss.growth_rate,
            waterUse: ss.water_use,
            isCaliforniaNative: ss.california_native,
            isLowGrowing: ss.is_low_growing,
          }),
        );
        setShrubSpeciesCards(cards);
      }
    };

    if (isTreeSpecies) {
      loadTreeSpeciesData();
    } else {
      loadShrubSpeciesData();
    }
  }, [isAuthenticated, isTreeSpecies]);

  const applyTreeFilters = (tree: treeSpeciesCard) => {
    if (treeFilters.height.length > 0) {
      const maxHeight = parseFloat(tree.maxHeight);
      const matchesHeight = treeFilters.height.some(filter => {
        if (filter === 'small') return maxHeight < 40;
        if (filter === 'medium') return maxHeight >= 40 && maxHeight <= 60;
        if (filter === 'large') return maxHeight > 60;
        return false; // If filter is null or invalid
      });
      if (!matchesHeight) return false;
    }
    if (treeFilters.shape && treeFilters.shape !== tree.treeShape) {
      return false;
    }
    if (
      treeFilters.litter.length > 0 &&
      !treeFilters.litter.includes(tree.litterType)
    ) {
      return false;
    }
    if (
      treeFilters.water.length > 0 &&
      !treeFilters.water.includes(tree.waterUse)
    ) {
      return false;
    }
    if (treeFilters.other.length > 0) {
      const matchesOther = treeFilters.other.every(option => {
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

  const applyShrubFilters = (shrub: shrubSpeciesCard) => {
    if (
      shrubFilters.bloom.length > 0 &&
      !shrubFilters.bloom.includes(shrub.bloomType)
    ) {
      return false;
    }
    if (
      shrubFilters.sun_exposure.length > 0 &&
      !shrubFilters.sun_exposure.includes(shrub.sunExposure)
    ) {
      return false;
    }
    if (
      shrubFilters.water_use.length > 0 &&
      !shrubFilters.water_use.includes(shrub.waterUse)
    ) {
      return false;
    }
    if (
      shrubFilters.growth_rate.length > 0 &&
      !shrubFilters.growth_rate.includes(shrub.growthRate)
    ) {
      return false;
    }
    if (shrubFilters.other.length > 0) {
      const matchesOther = shrubFilters.other.every(option => {
        if (option === 'californiaNative')
          return shrub.isCaliforniaNative || false;

        if (option === 'lowGrowing') {
          if (
            typeof shrub.dimension === 'string' &&
            shrub.dimension.toLowerCase().includes('x')
          ) {
            const height = Number(shrub.dimension.split(/x/i)[0]);
            return height <= 2 || false;
          }
        }
      });
      if (!matchesOther) return false;
    }
    return true;
  };

  const filteredCards = isTreeSpecies
    ? treeSpeciesCards.filter(
        tree =>
          tree.name.toLowerCase().includes(searchText.toLowerCase()) &&
          applyTreeFilters(tree),
      )
    : shrubSpeciesCards.filter(
        shrub =>
          shrub.name.toLowerCase().includes(searchText.toLowerCase()) &&
          applyShrubFilters(shrub),
      );

  const renderSpeciesCard = ({
    item,
  }: {
    item: treeSpeciesCard | shrubSpeciesCard;
  }) => (
    <TouchableOpacity
      onPress={() =>
        isTreeSpecies
          ? navigation.push('TreeSpeciesInfo', { speciesName: item.name })
          : navigation.push('ShrubSpeciesInfo', { speciesName: item.name })
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
      <Text style={styles.speciesStock}>
        {isAuthenticated
          ? `${item.totalCount} total`
          : `${item.availableCount} in stock`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {isAuthenticated
              ? isTreeSpecies
                ? 'All Trees'
                : 'All Shrubs'
              : isTreeSpecies
                ? 'Available Trees'
                : 'Available Shrubs'}
          </Text>
          <Scanner onPress={() => navigation.navigate('QRCodeScanner')} />
        </View>

        {isTreeSpecies ? (
          <TreeSearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            activeFilters={treeFilters}
            onActiveFilterChange={setTreeFilters}
          />
        ) : (
          <ShrubSearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            activeFilters={shrubFilters}
            onActiveFilterChange={setShrubFilters}
          />
        )}
        <View style={styles.toggle}>
          <ToggleSwitch
            value={isTreeSpecies}
            onValueChange={setIsTreeSpecies}
            trueLabel="Trees"
            falseLabel="Shrubs"
          />
        </View>
      </View>

      <View style={styles.divider}></View>

      <FlatList
        data={filteredCards}
        keyExtractor={item => item.name}
        renderItem={renderSpeciesCard}
        numColumns={2}
        contentContainerStyle={styles.speciesContainer}
        columnWrapperStyle={{ gap: 16 }}
        ListEmptyComponent={
          <Text style={styles.searchError}>
            No {isTreeSpecies ? 'tree' : 'shrub'} species found matching your
            search.
          </Text>
        }
      />
    </SafeAreaView>
  );
};
