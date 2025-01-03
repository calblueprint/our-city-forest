import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export default StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
  },

  selectedBar: {
    borderLeftWidth: 8,
    borderColor: colors.primary,
    overflow: 'hidden',
    paddingHorizontal: 20 - 8,
    margin: 0,
  },

  text: {
    ...typography.normalRegular,
    color: colors.gray3,
    textTransform: 'capitalize',
    textAlign: 'left',
  },

  outer: {
    position: 'relative',
    zIndex: 1,
  },

  label: {
    marginBottom: 8,
  },

  dropdown: {
    height: 47,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
    textAlign: 'left',
    flex: 1,
    alignItems: 'center',
    borderColor: colors.gray5,
  },

  dropdownContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray5,
    position: 'relative',
  },

  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  icon: {
    marginRight: 5,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});
