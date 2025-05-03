import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  editFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scale(24),
  },

  editButton: {
    borderWidth: scale(1),
    borderColor: colors.primary,
    borderRadius: scale(30),
    paddingHorizontal: scale(20),
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
    gap: scale(30),
    paddingBottom: scale(40),
  },

  label: {
    ...typography.mediumBold,
    color: colors.gray2,
    paddingBottom: scale(12),
  },

  locationInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: scale(16),
  },

  location: {
    flexDirection: 'row',
    gap: scale(12),
  },

  bankPill: {
    backgroundColor: colors.gray4,
    borderRadius: scale(48),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    alignSelf: 'flex-start',
  },

  bankText: {
    color: colors.white,
    ...typography.mediumRegular,
  },

  rowPill: {
    backgroundColor: colors.gray6,
    borderRadius: scale(48),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
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
    borderWidth: scale(1),
    borderRadius: scale(10),
    borderColor: colors.gray5,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
  },

  iconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
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
    paddingBottom: scale(24),
  },

  notesTextBox: {
    ...typography.mediumRegular,
    color: colors.gray3,
    borderWidth: scale(1),
    borderRadius: scale(10),
    borderColor: colors.gray5,
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    minHeight: scale(160),
  },

  notes: {
    paddingBottom: scale(30),
  },

  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderRadius: scale(10),
  },

  buttonText: {
    ...typography.largeBold,
    color: colors.white,
  },
});
