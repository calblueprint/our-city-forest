import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { ShrubSearchFilter } from '@/components/ShrubSearchFilter/ShrubSearchFilter';
import { Filter, Search } from '@/icons';
import { styles } from './styles';

type ShrubSearchBarProps = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  activeFilters: {
    max_height: string[];
    bloom: string[];
    sun_exposure: string[];
    water_use: string[];
    growth_rate: string[];    
    other: string[];
  };
  onActiveFilterChange: React.Dispatch<
    React.SetStateAction<{
      max_height: string[];
      bloom: string[];
      sun_exposure: string[];
      water_use: string[];
      growth_rate: string[];    
      other: string[];
    }>
  >;
};

export const ShrubSearchBar: React.FC<ShrubSearchBarProps> = ({
  searchText,
  onSearchTextChange,
  activeFilters,
  onActiveFilterChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openFilter = () => setIsModalVisible(true);
  const closeFilter = () => setIsModalVisible(false);

  return (
    <View style={styles.searchBar}>
      <Search />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Find a species..."
        value={searchText}
        onChangeText={onSearchTextChange}
      />
      <TouchableOpacity onPress={openFilter}>
        <View style={styles.filterIconContainer}>
          <Filter />
        </View>
      </TouchableOpacity>
      <ShrubSearchFilter
        isModalVisible={isModalVisible}
        onClose={closeFilter}
        activeFilters={activeFilters}
        onActiveFilterChange={onActiveFilterChange}
      />
    </View>
  );
};
