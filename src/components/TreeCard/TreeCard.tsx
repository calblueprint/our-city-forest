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
import { Scanner } from '@/icons';
import {
  getAllShrubSpecies,
  getAvailableShrubSpecies,
} from '@/supabase/queries/shrub_species';
import { HomeStackParamList } from '@/types/navigation';
import { ShrubSpecies } from '@/types/shrub_species';
import { ShrubSearchBar } from '../../components/ShrubSearchBar/ShrubSearchBar';
//import { navigation } from 'react-navigation';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList,'Home'>;


export type treeSpeciesCard = {
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


export function TreeCard({ item }: { item: treeSpeciesCard }) { 
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('TreeSpeciesInfo', { speciesName: item.name })
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
      <Text style={styles.speciesStock}>{item.stockCount} in stock</Text>
    </TouchableOpacity>
  )

  ;
} 