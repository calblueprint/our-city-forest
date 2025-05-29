import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  editFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },

  editButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  editText: {
    ...typography.smallRegular,
    color: colors.primary,
  },

  header: {
    ...typography.heading2,
    color: colors.gray1,
  },

  propertiesFlex: {
    gap: 30,
    paddingBottom: 40,
  },

  label: {
    ...typography.mediumBold,
    color: colors.gray2,
    paddingBottom: 12,
  },

  locationInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: 16,
  },

  location: {
    flexDirection: 'row',
    gap: 12,
  },

  bankPill: {
    backgroundColor: colors.gray4,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },

  bankText: {
    color: colors.white,
    ...typography.mediumRegular,
  },

  rowPill: {
    backgroundColor: colors.gray6,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },

  rowText: {
    color: colors.gray2,
    ...typography.mediumRegular,
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
    paddingBottom: 24,
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
    maxHeight: 200,
  },

  notes: {
    paddingBottom: 30,
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
