import { Dimensions, Platform, ScaledSize } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isTablet = (): boolean => {
  const aspectRatio = height / width;
  return (
    (Platform.OS === 'ios' && aspectRatio < 1.6) ||
    (Platform.OS === 'android' && aspectRatio < 1.6)
  );
};

export const getScreenSize = (): ScaledSize => {
  return Dimensions.get('window');
};

export const getDeviceBasedStyles = <T>(phoneStyles: T, tabletStyles: T): T => {
  return isTablet() ? { ...phoneStyles, ...tabletStyles } : phoneStyles;
};
