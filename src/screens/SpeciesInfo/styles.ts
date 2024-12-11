import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

export default StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: colors.white,
  },

  topBar: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 27,
    justifyContent: 'space-between',
  },

  imageBg: {
    flex: 1,
    height: 292,
  },

  switch: { paddingBottom: 32 },

  headerFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginHorizontal: 30,
    marginBottom: 21 + 16,
    gap: 5,
  },

  imageEmbed: {
    marginTop: 'auto',
    marginHorizontal: 30,
    marginBottom: 42,

    alignSelf: 'flex-start',
  },

  countPill: {
    flex: 0,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
  },

  idText: {
    ...typography.normalBold,
    flex: 0,
    textAlign: 'left',
    color: colors.white,
    padding: 10,
    paddingVertical: 6,
  },

  idPillFlex: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    ...typography.heading5,
    color: colors.gray1,
    paddingBottom: 10,
  },

  additionalNotes: {
    paddingBottom: 4,
  },

  scientificName: {
    ...typography.mediumRegular,
    color: colors.gray1,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginTop: 10,
  },

  // Main body
  body: {
    paddingHorizontal: 42,
    paddingTop: 64,
    marginBottom: 10,
    marginTop: -16,
    borderRadius: 20,
    flex: 1,
    backgroundColor: colors.white,
  },

  propertiesHeader: {
    marginVertical: 30,
  },

  label: {
    ...typography.normalRegular,
    color: colors.gray2,
    marginBottom: 7,
  },

  propertiesFlex: {
    flex: 1,
    gap: 26,
    marginBottom: 32,
  },

  editFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editButton: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    padding: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  doneEditingText: {
    ...typography.mediumRegular,
    color: colors.white,
  },

  locationInputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: 15,
  },

  textInput: {
    ...typography.normalRegular,
    flex: 1,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingVertical: 11,
    paddingHorizontal: 20,
  },

  textArea: {
    minHeight: 170,
    paddingVertical: 20,
    color: colors.gray3,
  },

  ownershipTextArea: {
    marginTop: 14,
    minHeight: 90,
  },
});
