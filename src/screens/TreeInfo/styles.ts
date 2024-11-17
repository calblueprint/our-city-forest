import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  // Container
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: colors.white1,
  },
  imageBg: {
    flex: 1,
    height: 292,
  },

  // Header
  headerFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginHorizontal: 30,
    marginBottom: 21 + 16,
    gap: 5,
  },
  idPill: {
    flex: 0,
    alignSelf: 'center',
    backgroundColor: colors.primary_green,
    borderRadius: 30,
  },
  idText: {
    flex: 0,
    textAlign: 'left',
    color: colors.white1,
    fontSize: 16,
    padding: 10,
    paddingVertical: 6,
  },
  idPillFlex: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  treeName: {
    fontSize: 24,
    color: colors.gray1,
    paddingBottom: 10,
  },
  scientificName: {
    fontSize: 18,
    color: colors.gray1,
    paddingBottom: 10,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginTop: 7,
  },

  // Main body
  body: {
    paddingHorizontal: 42,
    paddingTop: 48,
    marginTop: -16,
    borderRadius: 20,
    flex: 1,
    backgroundColor: colors.white1,
  },

  propertiesHeader: {
    fontSize: 24,
    marginVertical: 30,
    color: colors.gray1,
  },
  additionalNotesHeader: {
    fontSize: 24,
    color: colors.gray1,
  },

  label: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.gray3,
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
    backgroundColor: colors.primary_green,
    padding: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  editText: {
    fontSize: 16,
    color: colors.white1,
  },

  locationInputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: 15,
  },
  textInput: {
    flex: 1,
    color: colors.black3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.gray5,
    paddingVertical: 11,
    paddingHorizontal: 18,
    fontSize: 16,
  },
  textArea: {
    minHeight: 170,
    paddingVertical: 32,
    paddingHorizontal: 32,
  },
  ownershipTextArea: {
    marginTop: 14,
    minHeight: 90,
  },
});
