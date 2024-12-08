import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  Heading4: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    paddingLeft: 29,
    paddingBottom: 10,
    textAlign: 'left',
  },

  imageContainer: {
    width: '100%',
    height: width * (8 / 9),
    position: 'relative',
  },

  responsiveImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 30,
  },

  contactInfo: {
    position: 'absolute',
    top: 360,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },

  contactText: {
    color: '#4F4F4F',
    fontSize: 14,
    marginBottom: 50,
  },

  managerText: {
    color: '#4F4F4F',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  iconColor: {
    color: '#446127',
    marginBottom: 20,
  },
});
