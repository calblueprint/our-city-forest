import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRadius: 22,
    minHeight: 400,
  },

  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 4,
    width: 45,
    borderRadius: 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  saveText: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
  },

  foldersList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    gap: 12,
  },

  createList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    padding: 20,
  },

  createText: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'left',
  },

  folderItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },

  addFolderContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },

  addFolderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#f0f0f0',
  },

  createButton: {
    backgroundColor: '#007bff',
  },

  disabledButton: {
    backgroundColor: '#b0c4de',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
