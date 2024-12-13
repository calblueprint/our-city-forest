import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export const styles = StyleSheet.create({
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
    ...typography.normalRegular,
    color: colors.gray3,
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

  filterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: colors.white,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
