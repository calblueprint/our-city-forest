import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: scale(48),
    backgroundColor: colors.gray6,
    alignSelf: 'center',
    overflow: 'hidden',
    padding: scale(4),
  },

  toggle: {
    position: 'absolute',
    height: '100%',
    borderRadius: scale(48),
    backgroundColor: colors.primary,
  },

  switch: {
    ...typography.smallRegular,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: scale(48),
    color: colors.primary,
  },

  selectedText: {
    ...typography.smallBold,
    color: colors.white,
  },
});
