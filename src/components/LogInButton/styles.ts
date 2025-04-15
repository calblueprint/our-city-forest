import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  loginText: {
    ...typography.smallBold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
