import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const { width, height } = Dimensions.get('window');

const responsivePadding = width * 0.05;

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 18,
    paddingLeft: 27,
    paddingRight: 27,
  },

  // Search Component

  searchContainer: {
    paddingLeft: responsivePadding,
    paddingRight: responsivePadding,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.02,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray6,
  },

  searchBarInput: {
    height: 42,
    borderColor: colors.gray6,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: colors.gray6,
  },

  searchHeading: {
    color: colors.primary_green,
    fontSize: 32,
    fontWeight: '700',
    paddingBottom: 10,
    textAlign: 'left',
  },

  // Tree Cards

  treeGrid: {
    width: '100%',
    gap: 16,
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  treeCard: {
    width: '48%',
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    overflow: 'hidden',
  },

  treeImage: {
    width: '100%',
    height: 150,
    flexShrink: 0,
    borderRadius: 5,
    resizeMode: 'cover',
    backgroundColor: colors.gray4,
    marginBottom: 0,
  },

  treeInfoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },

  treeName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
    flex: 1,
    overflow: 'hidden',
  },

  treeStock: {
    fontSize: 14,
    fontWeight: 'medium',
    color: colors.gray3,
    textAlign: 'left',
  },

  treeError: {
    fontSize: 14,
    fontWeight: 'medium',
    padding: 0,
  },
});
