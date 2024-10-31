import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  // Container
  container: {
    flex: 1,
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
    marginBottom: 23,
    gap: 5,
  },
  idBadge: {
    flex: 0,
    justifyContent: 'flex-start',
    backgroundColor: colors.primary_green_2,
    borderRadius: 5,
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
    fontSize: 32,
    color: colors.off_white,
    fontWeight: 900,
  },
  scientificName: {
    fontSize: 20,
    color: colors.off_white,
  },

  // Main body
  body: {
    gap: 25,
    marginHorizontal: 44,
    marginTop: 32,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.gray3,
    marginBottom: 14,
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
});
