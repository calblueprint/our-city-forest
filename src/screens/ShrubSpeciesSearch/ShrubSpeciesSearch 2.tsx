import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Scanner } from '@/icons';
import {
  getAllShrubSpecies,
  getAvailableShrubSpecies,
} from '@/supabase/queries/shrub_species';
import { HomeStackParamList } from '@/types/navigation';
import { ShrubSpecies } from '@/types/shrub_species';
import { ShrubSearchBar } from '../../components/ShrubSearchBar/ShrubSearchBar';
import { styles } from './styles';

type ShrubSpeciesSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'ShrubSpeciesSearch'
>;

type shrubSpeciesCard = {
  name: string;
  imageURL: string;
  availableStock: number;
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

type ActiveFilters = {
  bloom: string[];
  sun_exposure: string[];
  water_use: string[];
  growth_rate: string[];
  other: string[];
};

export const ShrubSpeciesSearchScreen: React.FC<
  ShrubSpeciesSearchScreenProps
> = ({ navigation }) => {
  const [shrubSpeciesCards, setShrubSpeciesCards] = useState<
    shrubSpeciesCard[]
  >([]);
  const [searchText, setSearchText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    bloom: [],
    sun_exposure: [],
    water_use: [],
    growth_rate: [],
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
          (ts: ShrubSpecies) => ({
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
    if (
      activeFilters.bloom.length > 0 &&
      !activeFilters.bloom.includes(shrub.bloomType)
    ) {
      return false;
    }
    if (
      activeFilters.sun_exposure.length > 0 &&
      !activeFilters.sun_exposure.includes(shrub.sunExposure)
    ) {
      return false;
    }
    if (
      activeFilters.water_use.length > 0 &&
      !activeFilters.water_use.includes(shrub.waterUse)
    ) {
      return false;
    }
    if (
      activeFilters.growth_rate.length > 0 &&
      !activeFilters.growth_rate.includes(shrub.growthRate)
    ) {
      return false;
    }
    if (activeFilters.other.length > 0) {
      const matchesOther = activeFilters.other.every(option => {
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
        <ShrubSearchBar
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
