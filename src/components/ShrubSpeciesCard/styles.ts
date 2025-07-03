import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  speciesCard: {
    width: '48%',
    overflow: 'hidden',
  },

  speciesCardFull: {
    width: '100%',
    overflow: 'hidden',
  },

  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },

  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  speciesImage: {
    backgroundColor: colors.gray5,
    width: '100%',
    aspectRatio: 1.25,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 6,
  },

  speciesName: {
    ...typography.largeBold,
    color: colors.gray1,
    marginBottom: 2,
  },

  speciesStock: {
    ...typography.smallRegular,
    color: colors.gray3,
  },
});
