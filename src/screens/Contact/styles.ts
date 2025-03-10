import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },

  imageContainer: {
    marginBottom: 16,
  },

  contactHeader: {
    ...typography.heading2,
    color: colors.primary,
    marginBottom: 40,
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
    marginBottom: 64,
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

  signOutContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
});
