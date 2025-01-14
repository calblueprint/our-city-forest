import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors.gray6,
    alignSelf: 'center',
    padding: 2,
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
