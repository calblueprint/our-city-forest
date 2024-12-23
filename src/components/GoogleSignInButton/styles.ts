import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export const styles = StyleSheet.create({
  adminLoginLinkText: {
    ...typography.smallBold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
