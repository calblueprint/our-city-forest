import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 24,
  },

  text: {
    ...typography.smallRegular,
    color: colors.gray3,
  },

  funFactContainer: {
    flexDirection: 'column',
    gap: 12,
  },

  funFactHeader: {
    flexDirection: 'row',
    gap: 8,
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 12,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },

  subContainer: {
    flexDirection: 'column',
    gap: 20,
  },

  header: {
    ...typography.largeBold,
    color: colors.gray1,
  },

  production: {
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  productionPill: {
    backgroundColor: colors.gray6,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 6,
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
    rowGap: 12,
    paddingBottom: 20,
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
    gap: 12,
  },

  locationEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  bankPill: {
    backgroundColor: colors.gray4,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },

  bankText: {
    color: colors.white,
    ...typography.mediumRegular,
  },

  rowPill: {
    backgroundColor: colors.gray6,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },

  rowText: {
    color: colors.gray2,
    ...typography.mediumRegular,
  },
});
