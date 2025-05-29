import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    height: 320,
    backgroundColor: colors.gray5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  topNavigation: {
    flexDirection: 'row',
    paddingTop: 64,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },

  pill: {
    backgroundColor: colors.white,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 24,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },

  pillText: {
    ...typography.mediumBold,
    color: colors.primary,
  },

  body: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: -24,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  switch: { paddingBottom: 32 },

  nameAndId: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginBottom: 32,
  },

  nameContainer: {
    flex: 1,
  },

  commonName: {
    ...typography.heading2,
    color: colors.gray1,
  },

  scientificName: {
    ...typography.largeBold,
    color: colors.gray3,
    wordWrap: 'true',
  },

  tagIdContainer: {
    backgroundColor: colors.gray5,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  tagIdText: {
    ...typography.mediumBold,
    color: colors.gray2,
  },
});
