import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  gray4: {
    color: colors.gray4,
  },
  black3: {
    color: colors.gray3,
  },
  text: {
    color: colors.gray4,
    fontSize: 14,
    textAlign: 'center',
  },
  outer: {
    position: 'relative',
    zIndex: 1,
  },
  label: {
    marginBottom: 8,
  },
  dropdown: {
    height: 44,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: colors.gray4,
  },
  dropdownContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    position: 'relative',
    // top: -6,
  },
  itemContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
