import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

const { width, height } = Dimensions.get('window');

const responsivePadding = width * 0.05;

export const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
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
    ...typography.heading4,
    paddingBottom: 10,
    textAlign: 'left',
  },

  // Tree Cards

  treeGrid: {
    width: '100%',
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  treeCard: {
    width: width > 600 ? '30%' : '48%',
    marginBottom: width * 0.02,
    marginHorizontal: width * 0.01,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
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
    marginTop: width * 0.01,
  },

  treeName: {
    ...typography.mediumBold,
    fontSize: width > 600 ? 20 : 18,
    textAlign: 'left',
    marginTop: width * 0.01,
    flex: 1,
    overflow: 'hidden',
  },

  treeStock: {
    ...typography.smallRegular,
    fontSize: width > 600 ? 16 : 14,
    color: colors.gray3,
    textAlign: 'left',
  },

  treeError: {
    ...typography.smallRegular,
    fontSize: width > 600 ? 16 : 14,
    padding: 0,
  },
});
