import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { moderateScale, scale, verticalScale } from '@/utils/scaling';

// Responsive versions of typography styles
export const responsiveTypography = {
  heading1: {
    ...typography.heading1,
    fontSize: moderateScale(36),
    lineHeight: moderateScale(43.2),
  },
  heading2: {
    ...typography.heading2,
    fontSize: moderateScale(25),
    lineHeight: moderateScale(30),
  },
  heading3: {
    ...typography.heading3,
    fontSize: moderateScale(21),
    lineHeight: moderateScale(25.2),
  },
  largeBold: {
    ...typography.largeBold,
    fontSize: moderateScale(19),
    lineHeight: moderateScale(26.6),
  },
  largeRegular: {
    ...typography.largeRegular,
    fontSize: moderateScale(19),
    lineHeight: moderateScale(26.6),
  },
  mediumBold: {
    ...typography.mediumBold,
    fontSize: moderateScale(17),
    lineHeight: moderateScale(23.8),
  },
  mediumRegular: {
    ...typography.mediumRegular,
    fontSize: moderateScale(17),
    lineHeight: moderateScale(23.8),
  },
  smallBold: {
    ...typography.smallBold,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
  },
  smallRegular: {
    ...typography.smallRegular,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(21),
  },
};

// Common responsive styles
export const responsiveStyles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(16),
  },
  button: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(24),
    borderRadius: scale(10),
  },
  card: {
    padding: scale(16),
    borderRadius: scale(10),
    marginBottom: verticalScale(16),
  },
  inputField: {
    height: verticalScale(50),
    paddingHorizontal: scale(16),
    borderRadius: scale(10),
    marginBottom: verticalScale(16),
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
});
