import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.07,
    paddingLeft: 42,
    paddingRight: 42,
    paddingBottom: 42,
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },

  headerText: {
    ...typography.heading5,
    color: colors.primary,
    paddingBottom: 30,
    textAlign: 'center',
    alignItems: 'center',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backIcon: {
    width: 24,
    height: 24,
  },

  callIcon: {
    width: 64,
    height: 64,
    paddingTop: 45,
    paddingBottom: 45,
  },

  content: {
    gap: 29,
  },

  detailsContainer: {
    gap: 10,
  },

  heading: {
    ...typography.mediumBold,
    color: colors.black1,
  },

  subheading: {
    ...typography.smallBold,
    color: colors.gray2,
  },

  darkText: {
    ...typography.smallRegular,
    color: colors.black1,
  },

  lightText: {
    ...typography.smallRegular,
    color: colors.gray3,
  },
});
