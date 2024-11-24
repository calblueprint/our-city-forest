import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors.gray6,
    alignSelf: 'center',
  },
  switch: {
    fontWeight: 700,
    fontSize: 14,
    margin: 2,
    padding: 8,
    borderRadius: 30,
    color: colors.primary_green,
  },
  selected: {
    backgroundColor: colors.primary_green,
    color: colors.white1,
  },
});
