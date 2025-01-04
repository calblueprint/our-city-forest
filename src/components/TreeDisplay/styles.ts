import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    marginTop: 25,
    gap: 25,
    paddingBottom: 25,
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
    gap: 9,
  },
  properties: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  property: {
    marginTop: 15,
    width: '50%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
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
