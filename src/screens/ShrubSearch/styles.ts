import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    marginBottom: 20,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
    textAlign: 'left',
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
  },

  speciesContainer: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    rowGap: 16,
  },

  speciesCard: {
    width: '48%',
    overflow: 'hidden',
  },

  speciesImage: {
    backgroundColor: colors.gray5,
    width: '100%',
    aspectRatio: 1.25,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 6,
  },

  speciesName: {
    ...typography.largeBold,
    color: colors.gray1,
    marginBottom: 2,
  },

  speciesStock: {
    ...typography.smallRegular,
    color: colors.gray3,
  },

  searchError: {
    ...typography.mediumRegular,
    color: colors.gray2,
  },

  treeShrubToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
