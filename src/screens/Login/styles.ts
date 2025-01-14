import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 160,
  },

  headerText: {
    ...typography.heading1,
    color: colors.primary,
    marginBottom: 32,
  },

  logo: {
    alignSelf: 'center',
    marginBottom: 80,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonText: {
    ...typography.largeBold,
    color: colors.white,
  },

  adminContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  adminText: {
    ...typography.smallBold,
    color: colors.gray3,
  },
});
