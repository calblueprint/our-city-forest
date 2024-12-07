import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    fontSize: 24,
    fontWeight: 900,
    color: colors.gray1,
    paddingBottom: 10,
  },
  additionalNotes: {
    paddingBottom: 4,
  },
  scientificName: {
    fontSize: 18,
    color: colors.gray1,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginTop: 10,
  },

  body: {
    paddingHorizontal: 42,
    paddingTop: 20,
    marginBottom: 10,
    marginTop: -16,
    borderRadius: 20,
    flex: 1,
    backgroundColor: colors.white1,
  },

  propertiesHeader: {
    marginVertical: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 400,
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
    backgroundColor: colors.primary_green,
    padding: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  doneEditingText: {
    fontSize: 18,
    color: colors.white1,
  },

  locationInputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: 15,
  },
  iconTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    gap: 9,
  },
  displayText: {
    fontSize: 16,
    color: colors.gray3,
  },
  greenText: {
    color: colors.primary_green,
  },

  textInput: {
    flex: 1,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingVertical: 11,
    paddingHorizontal: 20,
    fontSize: 16,
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
