import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  searchContainer: {
    paddingTop: 32,
    paddingLeft: 27,
    paddingRight: 27,
  },

  Heading4Contact: {
    // change this later
    color: '#333',
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 30,
    textAlign: 'left',
  },

  Heading4Search: {
    // change this later
    color: '#446127',
    fontSize: 32,
    fontWeight: '700',
    paddingBottom: 10,
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

  iconColor: {
    color: '#446127',
    paddingBottom: 20,
    textAlign: 'center',
  },

  treeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },

  treeCard: {
    width: 160,
    height: 182,
    flexShrink: 0,
    borderRadius: 5,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  treeImage: {
    width: 160,
    height: 135,
    flexShrink: 0,
    borderRadius: 5,
    resizeMode: 'cover',
    backgroundColor: 'grey',
  },

  treeDetails: {
    alignItems: 'flex-start',
    overflow: 'hidden',
    flexDirection: 'row',
  },

  treeName: {
    // change this later
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },

  treeInfo: {
    // change this later
    fontSize: 14,
    fontWeight: 'medium',
  },
});
