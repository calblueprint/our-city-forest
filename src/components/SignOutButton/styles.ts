import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  buttonText: {
    ...typography.normalBold,
    color: colors.primary,
    paddingBottom: 40,
    textAlign: 'center',
  },
});
