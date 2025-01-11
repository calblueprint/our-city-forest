import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SearchFilter } from '@/components/SearchFilter/SearchFilter';
import { Filter, Search } from '@/icons';
import { styles } from './styles';

type SearchBarProps = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  activeFilters: {
    height: string[];
    shape: string;
    litter: string[];
    water: string[];
    other: string[];
  };
  onActiveFilterChange: React.Dispatch<
    React.SetStateAction<{
      height: string[];
      shape: string;
      litter: string[];
      water: string[];
      other: string[];
    }>
  >;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchTextChange,
  activeFilters,
  onActiveFilterChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openFilter = () => setIsModalVisible(true);
  const closeFilter = () => setIsModalVisible(false);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
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
        <SearchFilter
          isModalVisible={isModalVisible}
          onClose={closeFilter}
          activeFilters={activeFilters}
          onActiveFilterChange={onActiveFilterChange}
        />
      </View>
    </View>
  );
};
