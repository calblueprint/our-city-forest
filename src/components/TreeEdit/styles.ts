import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  editFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  header: {
    ...typography.heading2,
    color: colors.gray1,
    paddingBottom: 12,
  },

  propertiesHeader: {
    marginVertical: 32,
  },

  editButton: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },

  propertiesFlex: {
    flex: 1,
    gap: 24,
    marginBottom: 32,
  },

  label: {
    ...typography.mediumRegular,
    color: colors.gray2,
    marginBottom: 12,
  },

  locationInputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: 16,
  },

  textInput: {
    ...typography.mediumRegular,
    flex: 1,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  iconTextView: {
    ...typography.mediumRegular,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  displayText: {
    ...typography.mediumRegular,
    color: colors.gray3,
  },

  greenText: {
    color: colors.primary,
  },

  textArea: {
    minHeight: 170,
    paddingVertical: 20,
    color: colors.gray3,
  },

  doneEditingText: {
    ...typography.largeBold,
    color: colors.white,
  },
});
