import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { TreeSearchFilter } from '@/components/TreeSearchFilter/TreeSearchFilter';
import { Filter, Search } from '@/icons';
import { styles } from './styles';

type TreeSearchBarProps = {
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

export const TreeSearchBar: React.FC<TreeSearchBarProps> = ({
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
      <TreeSearchFilter
        isModalVisible={isModalVisible}
        onClose={closeFilter}
        activeFilters={activeFilters}
        onActiveFilterChange={onActiveFilterChange}
      />
    </View>
  );
};
