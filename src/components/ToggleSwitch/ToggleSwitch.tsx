import { createRef, useEffect, useRef } from 'react';
import {
  Animated,
  LayoutAnimation,
  LayoutRectangle,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
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
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const trueLabelRef = useRef<LayoutRectangle>();
  const falseLabelRef = useRef<LayoutRectangle>();
  const animation = useRef(new Animated.Value(0)).current;

  const handleAnimation = (value: boolean) => {
    onValueChange(value);
  };

  return (
    <View style={styles.main}>
      <Animated.View
        style={{
          transform: [{ translateX: animation }],
        }}
      />
      <TouchableOpacity
        onLayout={event => (trueLabelRef.current = event.nativeEvent.layout)}
        onPress={() => handleAnimation(true)}
      >
        <Text style={[styles.switch, value && styles.selected]}>
          {trueLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onLayout={event => (falseLabelRef.current = event.nativeEvent.layout)}
        onPress={() => handleAnimation(false)}
      >
        <Text style={[styles.switch, !value && styles.selected]}>
          {falseLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
