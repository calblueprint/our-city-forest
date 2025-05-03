import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  filterContainer: {
    height: height * 0.9,
    paddingHorizontal: 40,
    paddingBottom: 20,
    borderRadius: 48,
  },

  grabber: {
    width: 128,
    height: 6,
    borderRadius: 4,
    backgroundColor: colors.gray5,
    alignSelf: 'center',
    marginVertical: 8,
  },

  filterHeading: {
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
  },

  resetButtonActive: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },

  resetButtonInactive: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: colors.gray5,
    borderRadius: 30,
  },

  resetTextActive: {
    ...typography.largeBold,
    color: colors.white,
  },

  resetTextInactive: {
    ...typography.largeBold,
    color: colors.gray3,
  },

  filterProperties: {
    marginBottom: 24,
    gap: 12,
  },

  subheaderText: {
    ...typography.largeBold,
    color: colors.gray2,
  },

  checkboxGroup: {
    flexDirection: 'column',
    gap: 16,
    borderTopColor: colors.gray5,
    borderTopWidth: 1,
    paddingTop: 12,
  },

  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  completeButtonText: {
    ...typography.largeBold,
    color: colors.white,
  },
});
