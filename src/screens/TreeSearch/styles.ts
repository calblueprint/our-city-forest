import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

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

  // scannerIcon: {
  //   height: 53,
  //   width: 53,
  //   borderRadius: 26.5,
  //   backgroundColor: colors.primary,
  //   justifyContent: 'center',
  //   padding: 10,
  //   alignItems: 'center',
  // },

  searchHeading: {
    ...typography.heading5,
    color: colors.primary,
    paddingBottom: 10,
    textAlign: 'left',
  },

  treeContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
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

  speciesCard: {
    width: width > 600 ? '30%' : '48%',
    marginBottom: width * 0.02,
    marginHorizontal: width * 0.01,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
  },

  speciesImage: {
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

  speciesName: {
    ...typography.mediumBold,
    fontSize: width > 600 ? 20 : 18,
    textAlign: 'left',
    marginTop: width * 0.01,
    flex: 1,
    overflow: 'hidden',
  },

  speciesStock: {
    ...typography.smallRegular,
    fontSize: width > 600 ? 16 : 14,
    color: colors.gray3,
    textAlign: 'left',
  },

  searchError: {
    ...typography.normalRegular,
    fontSize: width > 600 ? 16 : 14,
    padding: 0,
  },
});
