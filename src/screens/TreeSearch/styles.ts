import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';

const { width, height } = Dimensions.get('window');

const responsivePadding = width * 0.05;

export const styles = StyleSheet.create({
  headingContainer: {
    paddingLeft: responsivePadding,
    paddingRight: responsivePadding,
    paddingTop: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scannerIcon: {
    height: 53,
    width: 53,
    borderRadius: 26.5,
    backgroundColor: colors.primary_green,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },

  // Search Component

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.gray6,
    paddingTop: 5,
    paddingBottom: 20,
    paddingRight: 27,
    paddingLeft: 27,
  },

  searchBarInput: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    borderColor: colors.gray6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  inputContainer: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    borderColor: colors.gray6,
    backgroundColor: colors.gray6,
    borderRadius: 30,
    paddingHorizontal: 10,
  },

  searchHeading: {
    color: colors.primary_green,
    fontSize: 32,
    fontWeight: '700',
    paddingBottom: 10,
    textAlign: 'left',
  },

  filterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tree Cards

  treeContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 18,
    paddingLeft: 27,
    paddingRight: 27,
  },

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
    fontSize: width > 600 ? 20 : 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: width * 0.01,
    flex: 1,
    overflow: 'hidden',
  },

  treeStock: {
    fontSize: width > 600 ? 16 : 14,
    fontWeight: 'medium',
    color: colors.gray3,
    textAlign: 'left',
  },

  treeError: {
    fontSize: width > 600 ? 16 : 14,
    fontWeight: 'medium',
    padding: 0,
  },

  // Filter Modal

  filterContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  filterContent: {
    width: '100%',
    height: height * 0.8,
    backgroundColor: 'white',
    padding: 40,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    alignItems: 'flex-start',
  },

  filterHeading: {},

  filterHeadingText: {
    color: colors.primary_green,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },

  filterText: {
    fontSize: 16,
    color: colors.gray4,
  },

  resetButton: {},

  resetText: {},

  completeButton: {
    backgroundColor: colors.primary_green,
    borderRadius: 10,
    height: 53,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  checkboxContainer: {
    marginVertical: 20,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});
