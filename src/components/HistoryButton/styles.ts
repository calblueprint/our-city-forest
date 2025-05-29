import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 16,
    overflow: 'hidden',
  },

  selectedButton: {
    borderColor: colors.primary,
  },

  labelContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.gray5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedLabelContainer: {
    backgroundColor: colors.primary,
  },

  labelText: {
    ...typography.mediumRegular,
    color: colors.gray3,
    textAlign: 'center',
  },

  valueContainer: {
    flex: 2,
    height: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  valueText: {
    ...typography.mediumRegular,
    textAlign: 'center',
    color: colors.gray2,
  },

  selectedText: {
    color: colors.white,
  },
});
