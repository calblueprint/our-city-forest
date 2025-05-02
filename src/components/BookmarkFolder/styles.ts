import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
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
  },

  addText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },

  folderName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.primary,
  },

  folderImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F0F0F0',
  },
});
