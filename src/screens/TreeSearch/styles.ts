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

  searchHeading: {
    color: colors.primary,
    ...typography.heading4,
    paddingBottom: 10,
    textAlign: 'left',
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
    backgroundColor: colors.gray3,
  },

  treeDetails: {
    alignItems: 'flex-start',
    overflow: 'hidden',
    flexDirection: 'row',
  },

  treeName: {
    flexShrink: 1,
    ...typography.mediumBold,
  },

  treeInfo: {
    ...typography.smallRegular,
  },
});
