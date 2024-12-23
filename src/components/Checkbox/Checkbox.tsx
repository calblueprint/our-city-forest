import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import colors from '@/styles/colors';
import { styles } from './styles';

interface CheckboxComponentProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  checked,
  label,
}) => {
  const [isChecked, setChecked] = useState(checked);
  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkboxWrapper}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!isChecked);
          }}
          color={colors.primary}
          uncheckedColor={colors.gray5}
        />
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

export default CheckboxComponent;
