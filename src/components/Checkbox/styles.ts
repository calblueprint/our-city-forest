import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(16),
  },

  checkbox: {
    width: scale(20),
    height: verticalScale(20),
    backgroundColor: colors.gray5,
    borderRadius: scale(5),
    borderWidth: scale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderWidth: 1,
  },

  checkmark: {
    width: scale(12),
    height: verticalScale(6),
    borderLeftWidth: scale(2),
    borderBottomWidth: verticalScale(2),
    borderColor: colors.primary,
    transform: [{ rotate: '315deg' }],
  },

  checkboxLabel: {
    ...typography.mediumRegular,
    color: colors.gray3,
  },
});
