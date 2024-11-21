import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from '../screens/SearchScreen/styles';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
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
      </View>
    </View>
  );
};

export default SearchBar;
