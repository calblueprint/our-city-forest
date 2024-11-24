import { View } from 'react-native';
import styles from './styles';

type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  trueLabel: string;
  falseLabel: string;
};

export default function ToggleSwitch({
  value,
  onValueChange,
  trueLabel,
  falseLabel,
}: ToggleSwitchProps) {
  return (
    <View style={styles.main}>
      <View></View>
    </View>
  );
}
