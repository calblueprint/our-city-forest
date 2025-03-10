import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    paddingHorizontal: 40,
    paddingTop: 16,
    paddingBottom: 20,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backIcon: {
    width: 24,
    height: 24,
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },

  callIcon: {
    width: 64,
    height: 64,
    paddingVertical: 48,
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
    textAlign: 'center',
    alignItems: 'center',
  },

  content: {
    gap: 32,
  },

  detailsContainer: {
    gap: 12,
  },

  heading: {
    ...typography.largeBold,
    color: colors.black1,
  },

  subheading: {
    ...typography.smallBold,
    color: colors.gray3,
  },

  lightText: {
    ...typography.smallRegular,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  darkText: {
    ...typography.mediumBold,
    color: colors.black3,
  },
});
