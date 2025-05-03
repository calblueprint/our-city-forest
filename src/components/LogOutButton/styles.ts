import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(110),
    borderRadius: scale(30),
    backgroundColor: colors.gray6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    ...typography.mediumRegular,
    color: colors.primary,
    paddingLeft: scale(10),
  },
});
