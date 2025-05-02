import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 10,
  },

  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    height: 500,
  },

  sliderIndicatorRow: {
    alignItems: 'center',
    marginBottom: 10,
  },

  sliderIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },

  createList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  createText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },

  folderItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  treeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
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

  cancelButton: {
    backgroundColor: colors.secondary,
  },

  createButton: {
    backgroundColor: colors.primary,
  },

  disabledButton: {
    backgroundColor: '#b0c4de',
  },

  buttonText: {
    color: colors.offWhite,
    fontWeight: '600',
  },

  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
    zIndex: 10,
  },

  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  popupBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    position: 'relative',
    marginTop: 20,
  },

  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },

  removeButton: {
    padding: 8,
    borderRadius: 20,
    color: colors.black1,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 10,
  },
});
