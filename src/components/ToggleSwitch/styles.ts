import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 48,
    backgroundColor: colors.gray6,
    overflow: 'hidden',
    padding: 4,
  },

  toggle: {
    position: 'absolute',
    height: '100%',
    borderRadius: 48,
    backgroundColor: colors.primary,
  },

  // TODO: Fix styling for wide switch
  switchWide: {
    ...typography.smallRegular,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 48,
    color: colors.primary,
  },

  switch: {
    ...typography.smallRegular,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 48,
    color: colors.primary,
  },

  selectedText: {
    ...typography.smallBold,
    color: colors.white,
  },
});
