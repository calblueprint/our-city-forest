import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

type CheckboxProps = {
  label: string;
  isChecked: boolean;
  onChange: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  return (
    <Pressable onPress={onChange} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
};
