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
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(12),
    borderRadius: scale(12),
  },

  divider: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.gray5,
  },

  subContainer: {
    flexDirection: 'column',
    gap: scale(20),
  },

  header: {
    ...typography.largeBold,
    color: colors.gray1,
  },

  production: {
    flexDirection: 'row',
    columnGap: scale(20),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  productionPill: {
    backgroundColor: colors.gray6,
    borderRadius: scale(30),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(6),
  },

  productionQuantity: {
    ...typography.mediumRegular,
    color: colors.black1,
  },

  productionText: {
    ...typography.mediumRegular,
    color: colors.primary,
    textAlign: 'left',
  },

  properties: {
    flexDirection: 'column',
    alignItems: 'stretch',
    rowGap: scale(12),
    paddingBottom: scale(20),
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

  locations: {
    flexDirection: 'column',
    gap: scale(12),
  },

  locationEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
  },

  bankPill: {
    backgroundColor: colors.gray4,
    borderRadius: scale(48),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    alignSelf: 'flex-start',
  },

  bankText: {
    color: colors.white,
    ...typography.mediumRegular,
  },

  rowPill: {
    backgroundColor: colors.gray6,
    borderRadius: scale(48),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    alignSelf: 'flex-start',
  },

  rowText: {
    color: colors.gray2,
    ...typography.mediumRegular,
  },
});
