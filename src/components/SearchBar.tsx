import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from '../screens/TreeSearch/styles';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View>
      <TextInput
        style={styles.searchBarInput}
        placeholder="Search for trees..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchBar;
