import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

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

  speciesContainer: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    rowGap: 16,
  },

  bookmarkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  bookmarkText: {
    fontSize: 16,
    flex: 1,
  },

  removeButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
    ...typography.heading2,
    color: colors.primary,
    textAlign: 'left',
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
  },

  createText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
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

  nameText: {
    color: colors.gray3,
    fontStyle: 'normal',
  },
});
