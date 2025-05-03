import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: scale(24),
  },

  text: {
    ...typography.smallRegular,
    color: colors.gray3,
  },

  funFactContainer: {
    flexDirection: 'column',
    gap: scale(12),
  },

  funFactHeader: {
    flexDirection: 'row',
    gap: scale(8),
  },

  funFact: {
    ...typography.largeBold,
    color: colors.primary,
  },

  funFactText: {
    backgroundColor: colors.gray6,
    ...typography.smallRegular,
    color: colors.gray3,
    textAlign: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(12),
    borderRadius: scale(12),
  },

  divider: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.gray5,
  },

  propertiesContainer: {
    flexDirection: 'column',
    gap: scale(12),
  },

  header: {
    ...typography.largeBold,
    color: colors.gray1,
  },

  properties: {
    flexDirection: 'column',
    alignItems: 'stretch',
    rowGap: scale(12),
  },

  property: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  propertyName: {
    ...typography.mediumRegular,
    color: colors.gray3,
  },

  propertyText: {
    ...typography.mediumRegular,
    color: colors.black1,
  },
});
