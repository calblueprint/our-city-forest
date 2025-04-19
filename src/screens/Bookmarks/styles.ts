import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    marginBottom: 20,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 14,
  },

  removeButton: {
    padding: 8,
    borderRadius: 20,
    color: colors.black1,
  },

  folderItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
  },

  createList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  createText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },

  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 10,
  },

  popupBox: {
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 33,
    padding: 20,
    justifyContent: 'space-evenly',
  },

  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },

  nameText: {
    color: colors.gray3,
    fontStyle: 'normal',
  },

  addFolderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  clearButtonText: {
    color: colors.gray2,
    textDecorationLine: 'underline',
    justifyContent: 'center',
  },

  clearButton: {
    justifyContent: 'center',
  },

  charactersText: {
    color: colors.gray3,
  },

  buttonText: {
    color: colors.offWhite,
    fontWeight: '600',
  },

  createButton: {
    backgroundColor: colors.primary,
  },

  disabledButton: {
    backgroundColor: '#b0c4de',
  },
});
