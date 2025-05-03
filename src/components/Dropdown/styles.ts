import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderWidth: scale(1),
    borderRadius: scale(10),
    borderColor: colors.gray5,
  },

  text: {
    ...typography.mediumRegular,
    color: colors.gray3,
    textTransform: 'capitalize',
  },

  dropdownContainer: {
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: colors.gray5,
  },

  itemContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    overflow: 'hidden',
  },

  selectedBar: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    overflow: 'hidden',
  },
});
