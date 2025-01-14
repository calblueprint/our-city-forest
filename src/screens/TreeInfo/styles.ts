import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: colors.white,
  },

  imageBackground: {
    flex: 1,
    height: 292,
    backgroundColor: colors.gray5,
  },

  body: {
    paddingHorizontal: 32,
    paddingTop: 20,
    marginBottom: 12,
    marginTop: -16,
    borderRadius: 20,
    flex: 1,
    backgroundColor: colors.white,
  },

  switch: { paddingBottom: 32 },

  header: {
    ...typography.heading2,
    color: colors.gray1,
    paddingBottom: 12,
  },

  idPillFlex: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scientificName: {
    ...typography.largeRegular,
    color: colors.gray1,
  },

  idPill: {
    flex: 0,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
  },

  idText: {
    ...typography.mediumRegular,
    flex: 0,
    textAlign: 'left',
    color: colors.white,
    padding: 12,
    paddingVertical: 6,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginTop: 12,
  },
});
