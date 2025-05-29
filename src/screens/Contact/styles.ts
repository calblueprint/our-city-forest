import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 50,
    position: 'relative',
  },

  logo: {
    paddingBottom: 16,
  },

  contactHeader: {
    ...typography.heading2,
    color: colors.primary,
    paddingBottom: 40,
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
    paddingBottom: 64,
  },

  socialButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },

  socialButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
  },

  linksButton: {
    width: '100%',
    height: 64,
    justifyContent: 'center',
  },

  linksButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },

  contactIcons: {
    width: 28,
    height: 28,
  },

  contactText: {
    ...typography.mediumRegular,
    color: colors.gray3,
    textAlign: 'center',
  },

  authContainer: {
    paddingTop: 25,
    width: '100%',
    alignItems: 'center',
  },

  adminContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  adminText: {
    ...typography.smallBold,
    color: colors.gray3,
  },

  userInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },

  userInfoText: {
    ...typography.smallRegular,
  },

  logOutButton: {
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 30,
    backgroundColor: colors.gray6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  logInButton: {
    paddingVertical: 15,
    paddingHorizontal: 110,
    borderRadius: 30,
    backgroundColor: colors.gray6,
    alignItems: 'center',
  },

  buttonText: {
    ...typography.mediumRegular,
    color: colors.primary,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
