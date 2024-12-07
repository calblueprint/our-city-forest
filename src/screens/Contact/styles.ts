import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },

  searchContainer: {
    paddingTop: 32,
    paddingLeft: 27,
    paddingRight: 27,
  },

  contactHeader: {
    color: colors.gray1,
    ...typography.heading5,
    paddingBottom: 30,
    textAlign: 'left',
  },

  imageContainer: {
    width: '100%',
    aspectRatio: 8 / 9,
    position: 'relative',
    top: 0,
    left: 0,
  },

  contactImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },

  contactOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
