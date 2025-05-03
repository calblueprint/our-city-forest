import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  filterContainer: {
    height: verticalScale(height * 0.9),
    paddingHorizontal: scale(40),
    paddingBottom: scale(20),
    borderRadius: scale(48),
  },

  grabber: {
    width: scale(128),
    height: verticalScale(6),
    borderRadius: scale(4),
    backgroundColor: colors.gray5,
    alignSelf: 'center',
    marginVertical: verticalScale(8),
  },

  filterHeading: {
    paddingTop: scale(40),
    paddingBottom: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
  },

  resetButtonActive: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    backgroundColor: colors.primary,
    borderRadius: scale(30),
  },

  resetButtonInactive: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    backgroundColor: colors.gray5,
    borderRadius: scale(30),
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
    marginBottom: scale(24),
    gap: scale(12),
  },

  subheaderText: {
    ...typography.largeBold,
    color: colors.gray2,
  },

  checkboxGroup: {
    flexDirection: 'column',
    gap: scale(16),
    borderTopColor: colors.gray5,
    borderTopWidth: scale(1),
    paddingTop: scale(12),
  },

  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: scale(10),
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(12),
  },

  completeButtonText: {
    ...typography.largeBold,
    color: colors.white,
  },
});
