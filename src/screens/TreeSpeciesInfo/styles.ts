import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    height: 320,
    backgroundColor: colors.gray5,
  },

  topNavigation: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 64,
    marginHorizontal: 24,
    justifyContent: 'space-between',
  },

  pill: {
    backgroundColor: colors.primary,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 24,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },

  pillText: {
    ...typography.mediumBold,
    color: colors.white,
  },

  body: {
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 20,
    marginTop: -24,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  header: {
    ...typography.heading2,
    color: colors.gray1,
    marginBottom: 8,
  },

  scientificName: {
    ...typography.largeRegular,
    color: colors.gray1,
    marginBottom: 16,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
    marginBottom: 20,
  },
});
