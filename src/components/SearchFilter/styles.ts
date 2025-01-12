import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { space } from '@/styles/space';
import { typography } from '@/styles/typography';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    height: height * 0.9,
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    paddingBottom: 20,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
  },

  grabber: {
    width: 128,
    height: 6,
    borderRadius: 4,
    backgroundColor: colors.gray5,
    alignSelf: 'center',
    marginVertical: 8,
  },

  filterProperties: {
    marginBottom: 23,
    gap: space[150],
  },

  filterHeading: {
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
  },

  subheaderText: {
    ...typography.largeBold,
    color: colors.gray2,
  },

  resetButtonActive: {
    width: 86,
    height: 34,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },

  resetTextActive: {
    ...typography.largeBold,
    color: colors.white,
  },

  resetButtonInactive: {
    width: 86,
    height: 34,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.gray5,
    borderRadius: 8,
    alignItems: 'center',
  },

  resetTextInactive: {
    ...typography.largeBold,
    color: colors.gray3,
  },

  checkboxGroup: {
    flexDirection: 'column',
    gap: space[200],
    borderTopColor: colors.gray5,
    borderTopWidth: 1,
    paddingTop: 12,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[200],
  },

  checkboxLabel: {
    ...typography.mediumRegular,
    color: colors.gray3,
  },

  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 53,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingBottom: 10,
  },

  completeButtonText: {
    ...typography.largeBold,
    color: colors.white,
  },
});
