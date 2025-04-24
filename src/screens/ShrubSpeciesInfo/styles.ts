import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    // paddingBottom: 750,
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
    backgroundColor: colors.white,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 24,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },

  pillText: {
    ...typography.mediumBold,
    color: colors.primary,
  },

  body: {
    marginTop: -24,
    paddingHorizontal: 32,
    paddingTop: 50,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  header: {
    ...typography.heading2,
    color: colors.gray1,
    paddingBottom: 8,
  },

  scientificName: {
    ...typography.largeBold,
    color: colors.gray1,
    paddingBottom: 30,
  },
});
