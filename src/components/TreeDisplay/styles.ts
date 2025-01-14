import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 24,
    gap: 24,
    paddingBottom: 24,
  },

  text: {
    ...typography.smallRegular,
    color: colors.gray3,
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

  textInput: {
    ...typography.smallRegular,
    flex: 1,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },

  header: {
    ...typography.largeRegular,
    color: colors.gray1,
  },

  locations: {
    flexDirection: 'column',
  },

  locationEntry: {
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  subtext: {
    ...typography.mediumRegular,
    color: colors.gray3,
  },

  properties: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },

  property: {
    marginTop: 16,
    width: '50%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
