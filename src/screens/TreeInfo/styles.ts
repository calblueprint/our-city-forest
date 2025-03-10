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
  },

  topNavigation: {
    flexDirection: 'row',
    marginTop: 64,
    marginHorizontal: 24,
    justifyContent: 'flex-end',
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
    marginBottom: 8,
  },

  idPillFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  scientificName: {
    ...typography.largeRegular,
    color: colors.gray1,
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
