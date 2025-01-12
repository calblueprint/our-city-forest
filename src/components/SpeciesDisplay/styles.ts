import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { space } from '@/styles/space';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    gap: space[300],
    paddingBottom: space[300],
  },

  text: {
    ...typography.smallRegular,
    color: colors.gray3,
  },

  funFact: {
    ...typography.mediumBold,
    color: colors.primary,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },

  header: {
    ...typography.mediumRegular,
    color: colors.gray1,
  },

  textInput: {
    ...typography.smallRegular,
    flex: 1,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingVertical: 11,
    paddingHorizontal: 20,
  },

  locations: {
    flexDirection: 'column',
  },

  locationEntry: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[100],
  },

  properties: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },

  property: {
    width: '50%',
    flexDirection: 'row',
    gap: space[150],
    alignItems: 'center',
    marginBottom: 15,
  },

  propertyText: {
    ...typography.normalRegular,
    color: colors.gray3,
  },

  funFactHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
