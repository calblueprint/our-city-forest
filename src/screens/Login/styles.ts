import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  loginContainer: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
  },

  loginText: {
    ...typography.heading1,
    color: colors.primary,
  },

  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 70,
  },

  logo: {
    height: 200,
    marginTop: 20,
    marginBottom: 70,
  },

  button: {
    backgroundColor: '#446127',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    ...typography.largeBold,
    color: colors.white,
  },

  adminLoginContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },

  adminLoginText: {
    ...typography.smallBold,
    color: colors.gray3,
  },
});
