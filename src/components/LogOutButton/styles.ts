import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 30,
    backgroundColor: colors.gray6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    ...typography.mediumRegular,
    color: colors.primary,
    paddingLeft: 10,
  },
});
