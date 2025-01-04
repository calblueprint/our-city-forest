import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  filterBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
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

  grabber: {
    width: 128,
    height: 6, // Height of the grabber
    borderRadius: 4, // Rounded edges
    backgroundColor: colors.gray5,
    alignSelf: 'center', // Center horizontally
    marginVertical: 8,
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
    alignItems: 'center',
  },

  headerText: {
    ...typography.heading5,
    color: colors.primary,
  },

  subheaderText: {
    ...typography.mediumBold,
    color: colors.gray2,
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

  checkboxGroup: {
    flexDirection: 'column',
    gap: 16,
    borderTopColor: colors.gray5,
    borderTopWidth: 1,
    paddingTop: 12,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  checkboxLabel: {
    ...typography.normalRegular,
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
