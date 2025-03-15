import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Scanner } from '@/icons';
import {
  getAllShrubSpecies,
} from '@/supabase/queries/shrub_species';
import { HomeStackParamList } from '@/types/navigation';
import { ShrubSpecies } from '@/types/shrub_species';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ShrubSpeciesSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'ShrubSpeciesSearch'
>;

type shrubSpeciesCard = {
  name: string;
  imageURL: string;
  availableStock: number;

  
  waterUse: string;
  isCaliforniaNative: boolean;
};

type ActiveFilters = {
  height: string[];
  shape: string;
  litter: string[];
  water: string[];
  other: string[];
};

export const ShrubSpeciesSearchScreen: React.FC<
  ShrubSpeciesSearchScreenProps
> = ({ navigation }) => {
  const [shrubSpeciesCards, setShrubSpeciesCards] = useState<shrubSpeciesCard[]>(
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
    const loadShrubSpeciesData = async () => {
      const shrubSpecies = isUserAdmin
        ? await getAllShrubSpecies()
        : await getAvailableShrubSpecies();
      if (shrubSpecies) {
        const cards: shrubSpeciesCard[] = shrubSpecies.map(
          (ts: ShrubSpecies ) => ({
            name: ts.name,
            imageURL: ts.image_url || 'https://example.com/placeholder.jpg',
            funFact: ts.fun_fact,
            waterUse: ts.water_use,
            californiaNative: ts.california_native,
            dimensions: ts.dimensions,
            stem: ts.stem,
            dormancy: ts.dormancy,
            flowerColor: ts.flower_color,
            bloom: ts.bloom,
            growthRate: ts.growth_rate,
            sunExposure: ts.sun_exposure,
            soilNeeds: ts.soil_needs,
            totalStock: ts.total_stock,
            availableStock: ts.available_stock,
          }),
        );
        setShrubSpeciesCards(cards);
      }
    };
    loadShrubSpeciesData();
  }, [isUserAdmin]);

  const applyFilters = (shrub: shrubSpeciesCard) => {
    if (activeFilters.height.length > 0) {
      const maxHeight = parseFloat(shrub.maxHeight);
      const matchesHeight = activeFilters.height.some(filter => {
        if (filter === 'small') return maxHeight < 40;
        if (filter === 'medium') return maxHeight >= 40 && maxHeight <= 60;
        if (filter === 'large') return maxHeight > 60;
        return false; // If filter is null or invalid
      });
      if (!matchesHeight) return false;
    }
    if (activeFilters.shape && activeFilters.shape !== shrub.shrubShape) {
      return false;
    }
    if (
      activeFilters.litter.length > 0 &&
      !activeFilters.litter.includes(shrub.litterType)
    ) {
      return false;
    }
    if (
      activeFilters.water.length > 0 &&
      !activeFilters.water.includes(shrub.waterUse)
    ) {
      return false;
    }
    if (activeFilters.other.length > 0) {
      const matchesOther = activeFilters.other.every(option => {
        if (option === 'californiaNative')
          return shrub.isCaliforniaNative || false;
        if (option === 'evergreen') return shrub.isEvergreen || false;
        if (option === 'powerlineFriendly')
          return shrub.isPowerlineFriendly || false;
        if (option === 'lowRootDamage')
          return shrub.rootDamagePotential === 'low';
        return false;
      });
      if (!matchesOther) return false;
    }
    return true;
  };

  const filteredShrubSpeciesCards = shrubSpeciesCards.filter(
    ts =>
      ts.name.toLowerCase().includes(searchText.toLowerCase()) &&
      applyFilters(ts),
  );

  const renderSpeciesCard = ({ item }: { item: shrubSpeciesCard }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.push('ShrubSpeciesInfo', { speciesName: item.name })
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
      <Text style={styles.speciesStock}>{item.availableStock} in stock</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {isUserAdmin ? 'All Shrubs' : 'Available Shrubs'}
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
        data={filteredShrubSpeciesCards}
        keyExtractor={item => item.name}
        renderItem={renderSpeciesCard}
        numColumns={2}
        contentContainerStyle={styles.speciesContainer}
        columnWrapperStyle={{ gap: 16 }}
        ListEmptyComponent={
          <Text style={styles.searchError}>
            No shrub species found matching your search.
          </Text>
        }
      />
    </SafeAreaView>
  );
};
