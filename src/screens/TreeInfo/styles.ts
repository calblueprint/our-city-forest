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

  header: {
    ...typography.heading2,
    color: colors.gray1,
    paddingBottom: 8,
  },

  idPillFlex: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },

  scientificName: {
    ...typography.largeBold,
    color: colors.gray1,
    wordWrap: 'true',
  },

  idPill: {
    backgroundColor: colors.gray5,
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  idText: {
    ...typography.mediumRegular,
    color: colors.gray2,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginBottom: 32,
  },
});
