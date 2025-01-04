import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    alignItems: 'center',
  },

  headerContainer: {
    paddingTop: height * 0.1,
    height: height / 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  linksButton: {
    padding: 20,
    width: '100%',
    height: 66,
    backgroundColor: colors.white,
    borderColor: colors.gray5,
    borderBottomWidth: 0.8,
    borderTopWidth: 0.8,
  },

  linksButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  contactIcons: {
    width: 28,
    height: 28,
  },

  contactHeading: {
    ...typography.heading5,
    color: colors.primary,
    paddingBottom: 30,
    textAlign: 'center',
    alignItems: 'center',
  },

  contactInfo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 250,
    padding: 40,
  },

  contactText: {
    ...typography.normalRegular,
    color: colors.gray3,
    paddingBottom: 40,
    textAlign: 'center',
  },

  contactboldText: {
    ...typography.mediumBold,
    color: colors.black1,
    paddingBottom: 10,
    textAlign: 'center',
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 61,
  },

  socialButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    marginHorizontal: 10,
  },

  socialButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIcons: {
    width: 30,
    height: 30,
  },

  logoutContainer: {
    height: height / 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    ...typography.normalBold,
    color: colors.primary,
    paddingBottom: 40,
    textAlign: 'center',
  },
});
