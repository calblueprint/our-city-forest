import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray6,
    borderRadius: scale(48),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(6),
  },

  searchBarInput: {
    ...typography.mediumRegular,
    color: colors.gray2,
    flex: 1,
    marginHorizontal: scale(8),
  },

  filterIconContainer: {
    width: scale(32),
    height: verticalScale(32),
    borderRadius: scale(16),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
