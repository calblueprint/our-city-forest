import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: height * 0.1,
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
    gap: 12,
  },

  speciesCard: {
    flex: 1,
    width: width > 600 ? '30%' : '48%',
    marginBottom: width * 0.02,
    marginHorizontal: width * 0.01,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
  },

  speciesImage: {
    width: '100%',
    height: 150,
    flexShrink: 0,
    borderRadius: 5,
    resizeMode: 'cover',
    backgroundColor: colors.gray4,
    marginBottom: 0,
  },

  speciesName: {
    ...typography.mediumBold,
    fontSize: width > 600 ? 20 : 18,
    textAlign: 'left',
    marginTop: width * 0.01,
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
    fontSize: width > 600 ? 16 : 14,
    padding: 0,
  },
});
