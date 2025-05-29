import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: colors.gray5,
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
  },

  searchBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray6,
    padding: 8,
    gap: 8,
    borderRadius: 24,
  },

  searchBarText: {
    ...typography.mediumRegular,
    color: colors.gray2,
  },

  searchBarPlaceholder: {
    color: colors.gray4,
  },

  contentContainer: {
    flex: 1,
    paddingVertical: 16,
    gap: 12,
  },

  speciesHeader: {
    gap: 8,
  },

  speciesData: {
    width: '100%',
    borderColor: colors.gray5,
    borderRadius: 24,
    paddingHorizontal: 24,
  },

  speciesName: {
    ...typography.heading3,
    color: colors.gray2,
  },

  scientificName: {
    ...typography.mediumBold,
    color: colors.gray3,
  },

  yearAndSource: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    paddingLeft: 8,
    paddingRight: 24,
  },

  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chevronButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chevronButtonDisabled: {
    opacity: 0.3,
  },

  yearText: {
    ...typography.heading3,
    color: colors.gray3,
  },

  dropdown: {
    backgroundColor: colors.gray6,
    height: 48,
    width: 144,
    paddingHorizontal: 16,
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 0,
  },

  dropdownContainer: {
    overflow: 'hidden',
    borderRadius: 24,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
    gap: 8,
  },

  // NEW STYLES
  modalContainer: {
    flex: 1,
  },

  modalHeader: {
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: colors.gray5,
  },

  modalHeaderText: {
    ...typography.heading2,
    color: colors.primary,
    paddingHorizontal: 24,
  },

  modalSearchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
  },

  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalSearchBar: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray6,
    padding: 8,
    gap: 8,
    borderRadius: 24,
  },

  speciesList: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },

  emptyListText: {
    ...typography.mediumRegular,
    color: colors.gray3,
    textAlign: 'center',
    marginTop: 16,
  },

  listItemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
    alignSelf: 'center',
  },

  listItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  listItemName: {
    ...typography.largeBold,
    color: colors.gray2,
  },

  listItemScientificName: {
    ...typography.smallRegular,
    color: colors.gray3,
  },
});
