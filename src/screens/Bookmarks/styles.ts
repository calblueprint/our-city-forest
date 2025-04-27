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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  createFolderCard: {
    backgroundColor: '#f5f5f5',
  },

  createImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },

  editButton: {
    width: 74,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },

  editButtonActive: {
    backgroundColor: colors.primary,  
    borderWidth: 0,
  },

  editButtonText: {
    color: colors.primary, 
    fontSize: 16,
    fontWeight: '600',
  },

  editButtonTextActive: {
    color: 'white',
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  overlaySvg: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  folderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 16,
  },

  folderName: {
    flex: 1,
    fontSize: 16,
    color: colors.primary,
    alignItems: 'flex-start'
  },

  folderItem: {
    flexDirection: 'column',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 14,
  },

  speciesContainer: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    rowGap: 16,
  },

  speciesImage: {
    backgroundColor: colors.gray5,
    width: '100%',
    aspectRatio: 1.25,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 6,
  },

  folderCard: {
    width: '48%',
    overflow: 'hidden',
  },

  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },

  removeButton: {
    padding: 8,
    borderRadius: 20,
    color: colors.black1,
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
});
