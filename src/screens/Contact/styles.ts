import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },

  linksButton: {
    width: '100%',
    height: 66,
    color: 'gray',
  },

  contactIcons: {
    width: 28,
    height: 28,
  },

  ocfLogo: {
    width: 93,
    height: 110,
  },

  contactHeader: {
    color: colors.gray1,
    ...typography.heading5,
    paddingBottom: 30,
    textAlign: 'left',
  },

  contactInfo: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 250,
    padding: 40,
  },

  contactText: {
    color: colors.gray2,
    ...typography.normalRegular,
    paddingBottom: 40,
    textAlign: 'center',
  },

  contactboldText: {
    color: colors.gray2,
    ...typography.mediumBold,
    paddingBottom: 10,
    textAlign: 'center',
  },
});
