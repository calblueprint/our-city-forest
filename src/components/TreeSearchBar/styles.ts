import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray6,
    borderRadius: 48,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  searchBarInput: {
    ...typography.mediumRegular,
    color: colors.gray2,
    flex: 1,
    marginHorizontal: 8,
  },

  filterIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
