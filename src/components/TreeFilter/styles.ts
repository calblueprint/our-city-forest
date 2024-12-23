import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  filterBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  filterContainer: {
    width: '100%',
    height: height * 0.8,
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    paddingBottom: 20,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },

  filterProperties: {
    marginBottom: 23,
    gap: 10,
  },

  filterHeading: {
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  filterHeadingText: {
    ...typography.heading5,
    color: colors.primary,
  },

  filterSubHeadingText: {
    ...typography.mediumBold,
    color: colors.gray2,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    paddingBottom: 5,
  },

  resetButton: {
    width: 86,
    height: 34,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.gray5,
    borderRadius: 5,
    alignItems: 'center',
  },

  resetText: {
    ...typography.mediumBold,
    color: colors.gray3,
  },

  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 53,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingBottom: 10,
  },

  completeButtonText: {
    ...typography.mediumBold,
    color: colors.white,
  },
});
