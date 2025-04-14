import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  editFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  header: {
    ...typography.heading2,
    color: colors.gray1,
  },

  propertiesFlex: {
    gap: 24,
  },

  label: {
    ...typography.mediumRegular,
    color: colors.gray2,
    marginBottom: 12,
  },

  locationInputView: {
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  iconTextView: {
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

  notesHeader: {
    ...typography.heading2,
    color: colors.gray1,
    marginBottom: 24,
  },

  notesTextBox: {
    ...typography.mediumRegular,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 160,
  },

  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    ...typography.largeBold,
    color: colors.white,
  },
});