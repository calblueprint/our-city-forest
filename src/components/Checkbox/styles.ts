import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxWrapper: {
    width: 20,
    height: 20,
    backgroundColor: colors.gray5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    ...typography.normalRegular,
    color: colors.gray3,
  },
});
