import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type CheckboxProps = {
  isChecked: boolean;
  onChange: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <TouchableOpacity
      onPress={onChange}
      style={[styles.checkbox, isChecked && styles.checkboxChecked]}
    >
      {isChecked && <View style={styles.checkmark} />}
    </TouchableOpacity>
  );
};
