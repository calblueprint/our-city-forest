import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import TreeFilterModal from '@/components/TreeFilter';
import Search from '@/icons/Search';
import Filter from '@/icons/Sort';
import { styles } from '../screens/TreeSearch/styles';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
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
          <Filter style={styles.filterIconContainer} />
        </TouchableOpacity>
        <TreeFilterModal visible={modalVisible} onClose={closeModal} />
      </View>
    </View>
  );
};

export default SearchBar;
