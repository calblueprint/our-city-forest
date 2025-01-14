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
    alignItems: 'center',
  },

  funFact: {
    ...typography.largeBold,
    color: colors.primary,
  },

  funFactText: {
    ...typography.smallRegular,
    color: colors.gray3,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.gray5,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },

  propertiesContainer: {
    flexDirection: 'column',
    gap: 12,
  },

  header: {
    ...typography.largeRegular,
    color: colors.gray1,
  },

  properties: {
    paddingLeft: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    rowGap: 12,
  },

  property: {
    width: '50%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  propertyText: {
    ...typography.mediumRegular,
    color: colors.gray3,
  },

  locationsContainer: {
    flexDirection: 'column',
    gap: 12,
  },

  locations: {
    paddingLeft: 16,
    flexDirection: 'column',
    gap: 12,
  },

  locationEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
