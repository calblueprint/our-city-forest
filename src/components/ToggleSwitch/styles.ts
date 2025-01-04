import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
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
    ...typography.smallRegular,
    margin: 2,
    padding: 8,
    borderRadius: 30,
    zIndex: 2,
    color: colors.primary,
  },

  selected: {
    ...typography.smallBold,
    color: colors.white,
  },
});
