import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  buttonText: {
    ...typography.mediumBold,
    color: colors.primary,
  },
});
