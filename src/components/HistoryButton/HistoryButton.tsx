import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type HistoryButtonProps = {
  label: string;
  value: number | null;
  selected?: boolean;
  onPress?: () => void;
};

export const HistoryButton = ({
  label,
  value,
  selected = false,
  onPress,
}: HistoryButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, selected ? styles.selectedButton : null]}
      onPress={onPress}
    >
      <View
        style={[
          styles.labelContainer,
          selected ? styles.selectedLabelContainer : null,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[styles.labelText, selected ? styles.selectedText : null]}
        >
          {label}
        </Text>
      </View>

      <View style={styles.valueContainer}>
        <Text numberOfLines={1} style={[styles.valueText]}>
          {value !== null ? value : '—'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
