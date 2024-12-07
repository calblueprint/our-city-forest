import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutRectangle,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import colors from '@/styles/colors';
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

  const [trueLabelLayout, setTrueLabelLayout] =
    useState<LayoutRectangle | null>(null);
  const [falseLabelLayout, setFalseLabelLayout] =
    useState<LayoutRectangle | null>(null);
  const translateAnimation = useRef(new Animated.Value(40)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  const runAnimations = (value: boolean) => {
    if (!trueLabelLayout || !falseLabelLayout) return;

    Animated.timing(translateAnimation, {
      duration: 150,
      toValue: value
        ? trueLabelLayout.x + trueLabelLayout.width / 2 - 2
        : falseLabelLayout.x + falseLabelLayout.width / 2 + 2,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnimation, {
      duration: 150,
      toValue: (value ? trueLabelLayout.width : falseLabelLayout.width) ?? 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    runAnimations(value);
  }, [trueLabelLayout, falseLabelLayout]);

  const handlePress = (newValue: boolean) => {
    runAnimations(newValue);
    onValueChange(newValue);
  };

  return (
    <View style={styles.outer}>
      <View style={styles.main}>
        <Animated.View
          style={[
            {
              transform: [
                { translateX: translateAnimation },
                { scaleX: scaleAnimation },
              ],
              backgroundColor: colors.primary,
              width: 1,
            },
          ]}
        />
        <TouchableOpacity
          onLayout={event => setTrueLabelLayout(event.nativeEvent.layout)}
          onPress={() => handlePress(true)}
        >
          <Text style={[styles.switch, value && styles.selected]}>
            {trueLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onLayout={event => setFalseLabelLayout(event.nativeEvent.layout)}
          onPress={() => handlePress(false)}
        >
          <Text style={[styles.switch, !value && styles.selected]}>
            {falseLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
