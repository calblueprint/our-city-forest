import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  outer: {
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors.gray6,
    alignSelf: 'center',
    padding: 2,
  },
  main: {
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors.gray6,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  switch: {
    fontSize: 14,
    margin: 2,
    padding: 8,
    borderRadius: 30,
    zIndex: 2,
    color: colors.primary,
    fontFamily: 'DM Sans',
  },
  selected: {
    color: colors.white,
    fontFamily: 'DM Sans Bold',
  },
});
