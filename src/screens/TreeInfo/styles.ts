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
  idBadge: {
    flex: 0,
    justifyContent: 'flex-start',
    backgroundColor: colors.primary_green,
    borderRadius: 30,
    marginRight: 'auto',
  },
  idText: {
    flex: 0,
    textAlign: 'left',
    color: colors.white1,
    fontSize: 14,
    padding: 10,
  },
  treeName: {
    paddingTop: 44,
    fontSize: 24,
    color: colors.gray1,
  },

  scientificName: {
    fontSize: 18,
    color: colors.gray1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
    marginTop: 7,
    marginBottom: 20,
  },

  // Main body
  body: {
    paddingHorizontal: 44,
    marginTop: -16,
    borderRadius: 20,
    flex: 1,
    backgroundColor: colors.white1,
  },
  propertiesHeader: {
    fontSize: 18,
    color: colors.gray1,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.gray3,
    marginBottom: 14,
  },

  editFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: colors.color2,
    borderRadius: 10,
  },
  editText: {
    fontSize: 16,
    color: colors.gray3,
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
    borderColor: colors.gray4,
    paddingVertical: 11,
    paddingHorizontal: 18,
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
