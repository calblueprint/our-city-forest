import { StyleSheet, TextStyle } from 'react-native';

type TypographyStyles = {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  heading4: TextStyle;
  heading5: TextStyle;
  heading6: TextStyle;
  largeBold: TextStyle;
  largeRegular: TextStyle;
  mediumBold: TextStyle;
  mediumRegular: TextStyle;
  normalBold: TextStyle;
  normalRegular: TextStyle;
  smallBold: TextStyle;
  smallRegular: TextStyle;
};

export const typography: TypographyStyles = StyleSheet.create({
  heading1: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 56,
    lineHeight: 61.6,
  },
  heading2: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 48,
    lineHeight: 52.8,
  },
  heading3: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 40,
    lineHeight: 44,
  },
  heading4: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 32,
    lineHeight: 35.2,
  },
  heading5: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 24,
    lineHeight: 26.4,
  },
  heading6: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    lineHeight: 22,
  },
  largeBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    lineHeight: 28,
  },
  largeRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 20,
    lineHeight: 28,
  },
  mediumBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
    lineHeight: 25.2,
  },
  mediumRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 18,
    lineHeight: 25.2,
  },
  normalBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    lineHeight: 22.4,
  },
  normalRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 22.4,
  },
  smallBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    lineHeight: 19.6,
  },
  smallRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    lineHeight: 19.6,
  },
});
