import React, { useState } from 'react';
import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../screens/TreeSearch/styles';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (text: string) => {
    setFilterValue(text);
  };

  const handleApplyFilter = () => {
    onChange(filterValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search species..."
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.filterOverlay}>
          <View style={styles.filterContent}>
            <Text style={styles.filterHeading}>Filter</Text>
            <TextInput
              style={styles.searchBarInput}
              placeholder="Enter filter criteria"
              value={filterValue}
              onChangeText={handleFilterChange}
            />
            <View style={styles.filterButtons}>
              <Button title="Apply Filter" onPress={handleApplyFilter} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchBar;
