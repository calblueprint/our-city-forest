import { StyleSheet, TextStyle } from 'react-native';

type TypographyStyles = {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  largeBold: TextStyle;
  largeRegular: TextStyle;
  mediumBold: TextStyle;
  mediumRegular: TextStyle;
  smallBold: TextStyle;
  smallRegular: TextStyle;
};

export const typography: TypographyStyles = StyleSheet.create({
  heading1: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 36,
    lineHeight: 43.2,
    letterSpacing: 0.25,
  },

  heading2: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: 0,
  },

  heading3: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 21,
    lineHeight: 25.2,
    letterSpacing: 0.15,
  },

  largeBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 19,
    lineHeight: 26.6,
    letterSpacing: 0.2,
  },

  largeRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 19,
    lineHeight: 26.6,
    letterSpacing: 0.2,
  },

  mediumBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 17,
    lineHeight: 23.8,
    letterSpacing: 0.15,
  },

  mediumRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 17,
    lineHeight: 23.8,
    letterSpacing: 0.15,
  },

  smallBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.1,
  },

  smallRegular: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.1,
  },
});
