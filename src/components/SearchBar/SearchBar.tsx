import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { TreeFilterModal } from '@/components/TreeFilter/TreeFilter';
import { Filter, Search } from '@/icons';
import { styles } from './styles';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  filters: {
    height: string[];
    shape: string;
    fruit: string[];
    water: string[];
    other: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      height: string[];
      shape: string;
      fruit: string[];
      water: string[];
      other: string[];
    }>
  >;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  filters,
  setFilters,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Search />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Find a species..."
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={openModal}>
          <View style={styles.filterIconContainer}>
            <Filter />
          </View>
        </TouchableOpacity>
        <TreeFilterModal
          visible={modalVisible}
          onClose={closeModal}
          filters={filters}
          setFilters={setFilters}
        />
      </View>
    </View>
  );
};
