import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    paddingTop: 6,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
    paddingHorizontal: 12,
  },

  searchBarInput: {
    ...typography.mediumRegular,
    color: colors.gray2,
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 12,
    borderColor: colors.gray6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
