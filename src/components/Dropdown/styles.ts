import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  dropdown: {
    height: 47,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 12,
    textAlign: 'left',
    flex: 1,
    alignItems: 'center',
    borderColor: colors.gray5,
  },

  text: {
    ...typography.mediumRegular,
    color: colors.gray3,
    textTransform: 'capitalize',
    textAlign: 'left',
  },

  textContainer: {
    paddingHorizontal: 20,
  },

  dropdownContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray5,
    position: 'relative',
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  selectedBar: {
    borderLeftWidth: 8,
    borderColor: colors.primary,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
});
