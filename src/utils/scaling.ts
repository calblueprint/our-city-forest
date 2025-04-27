import { Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Base dimensions (iPhone 8 as baseline)
const baseWidth = 375;
const baseHeight = 667;

// Calculate scale factors
const widthScale = width / baseWidth;
const heightScale = height / baseHeight;

// Utility functions for responsive dimensions
export const scale = (size: number): number => Math.round(size * widthScale);
export const verticalScale = (size: number): number =>
  Math.round(size * heightScale);

// For text and elements that shouldn't be too large on tablets
export const moderateScale = (size: number, factor = 0.5): number =>
  Math.round(size + (scale(size) - size) * factor);

// For handling device orientation changes
export const listenToOrientationChanges = (callback: () => void): void => {
  Dimensions.addEventListener('change', callback);
};
