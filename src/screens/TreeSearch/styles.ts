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

  searchBarContainer: {
    margin: 10,
  },

  searchBarInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  Heading4Search: {
    // change this later
    color: '#446127',
    fontSize: 32,
    fontWeight: '700',
    paddingBottom: 10,
    textAlign: 'left',
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

  treeGrid: {
    padding: 20,
    justifyContent: 'space-between',
  },
});
