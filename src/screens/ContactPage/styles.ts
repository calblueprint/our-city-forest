import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  ocfLogo: {
    width: '100%',
    height: 110,
  },

  Heading4Contact: {
    // change this later
    color: '#333',
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 30,
    textAlign: 'left',
  },

  contactInfo: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 250,
    padding: 40,
  },

  contactText: {
    // change this later
    color: '#4F4F4F',
    fontSize: 16,
    paddingBottom: 40,
    textAlign: 'center',
  },

  contactboldText: {
    // change this later
    color: '#4F4F4F',
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
