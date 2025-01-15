import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
  },

  text: {
    ...typography.mediumRegular,
    color: colors.gray3,
    textTransform: 'capitalize',
  },

  dropdownContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray5,
  },

  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    overflow: 'hidden',
  },

  selectedBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    overflow: 'hidden',
  },
});
