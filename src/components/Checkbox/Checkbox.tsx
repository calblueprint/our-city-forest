import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type CheckboxProps = {
  value: boolean;
  onValueChange: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={onValueChange}
      style={[styles.checkbox, value && styles.checkboxChecked]}
    >
      {value && <View style={styles.checkmark} />}
    </TouchableOpacity>
  );
};

export default Checkbox;
