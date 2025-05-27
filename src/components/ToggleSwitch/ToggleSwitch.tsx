import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutRectangle,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { styles } from './styles';

type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  leftLabel: string;
  rightLabel: string;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onValueChange,
  leftLabel,
  rightLabel,
}) => {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [containerLayout, setContainerLayout] =
    useState<LayoutRectangle | null>(null);
  const [trueLabelLayout, setTrueLabelLayout] =
    useState<LayoutRectangle | null>(null);
  const [falseLabelLayout, setFalseLabelLayout] =
    useState<LayoutRectangle | null>(null);
  const translateAnimation = useRef(new Animated.Value(0)).current;
  const toggleWidth = useRef(new Animated.Value(0)).current;

  const runAnimations = useCallback(
    (newValue: boolean) => {
      if (!containerLayout || !trueLabelLayout || !falseLabelLayout) return;

      const containerPadding = 4; // From the container's padding in styles
      const targetX = newValue
        ? containerPadding
        : containerLayout.width - falseLabelLayout.width - containerPadding;

      const targetWidth = newValue
        ? trueLabelLayout.width
        : falseLabelLayout.width;

      Animated.timing(translateAnimation, {
        duration: 100,
        toValue: targetX,
        useNativeDriver: false,
      }).start();

      Animated.timing(toggleWidth, {
        duration: 100,
        toValue: targetWidth,
        useNativeDriver: false,
      }).start();
    },
    [
      containerLayout,
      trueLabelLayout,
      falseLabelLayout,
      translateAnimation,
      toggleWidth,
    ],
  );

  useEffect(() => {
    runAnimations(value);
  }, [value, runAnimations]);

  const handlePress = (newValue: boolean) => {
    runAnimations(newValue);
    onValueChange(newValue);
  };

  return (
    <View
      style={styles.container}
      onLayout={event => setContainerLayout(event.nativeEvent.layout)}
    >
      {/** Green toggle */}
      {containerLayout && (
        <Animated.View
          style={[
            styles.toggle,
            {
              transform: [{ translateX: translateAnimation }],
              width: toggleWidth,
              top: 4,
              height: containerLayout.height - 8,
            },
          ]}
        />
      )}

      {/** Left Label */}
      <TouchableOpacity
        onLayout={event => setTrueLabelLayout(event.nativeEvent.layout)}
        onPress={() => handlePress(true)}
      >
        <Text style={[styles.switch, value && styles.selectedText]}>
          {leftLabel}
        </Text>
      </TouchableOpacity>

      {/** Right Label */}
      <TouchableOpacity
        onLayout={event => setFalseLabelLayout(event.nativeEvent.layout)}
        onPress={() => handlePress(false)}
      >
        <Text style={[styles.switch, !value && styles.selectedText]}>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
