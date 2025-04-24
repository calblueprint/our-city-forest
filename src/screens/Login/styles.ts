import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },

  headerText: {
    ...typography.heading1,
    color: colors.primary,
    paddingBottom: 32,
    textAlign: 'center',
  },

  logo: {
    alignSelf: 'center',
    paddingBottom: 40,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    paddingBottom: 12,
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
