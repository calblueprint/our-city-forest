import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 10,
  },

  headerText: {
    ...typography.heading5,
    color: colors.primary,
    textAlign: 'left',
  },

  speciesContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 8,
  },

  speciesCard: {
    width: width > 600 ? '30%' : '46%',
    marginBottom: width * 0.02,
    marginHorizontal: width * 0.01,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },

  speciesImage: {
    width: '100%',
    height: 152,
    flexShrink: 0,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: colors.gray4,
    marginBottom: width * 0.01,
  },

  speciesName: {
    ...typography.mediumBold,
    fontSize: width > 600 ? 20 : 18,
    textAlign: 'left',
    flex: 1,
    overflow: 'hidden',
  },

  speciesStock: {
    ...typography.smallRegular,
    fontSize: width > 600 ? 16 : 14,
    color: colors.gray3,
    textAlign: 'left',
  },

  searchError: {
    ...typography.normalRegular,
    color: colors.gray2,
  },
});
