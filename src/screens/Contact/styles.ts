import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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
    backgroundColor: '#FFFFFF',
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
    color: colors.primary_green,
    fontSize: 24,
    fontWeight: '700',
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
    color: colors.gray3,
    fontSize: 16,
    paddingBottom: 40,
    textAlign: 'center',
  },

  contactboldText: {
    color: colors.pure_black,
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: 'bold',
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
    backgroundColor: colors.primary_green,
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
    color: colors.primary_green,
    fontSize: 16,
    paddingBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  backButton: {},

  backIcon: {},
});
