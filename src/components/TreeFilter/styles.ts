import { Dimensions, StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import typography from '@/styles/typography';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  filterContent: {
    width: '100%',
    height: height * 0.8,
    backgroundColor: colors.white,
    padding: 40,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    alignItems: 'flex-start',
  },

  filterHeading: {},

  filterHeadingText: {
    ...typography.heading5,
    color: colors.primary,
    marginBottom: 10,
  },

  filterText: {
    ...typography.normalRegular,
    color: colors.gray4,
  },

  resetButton: {},

  resetText: {},

  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 53,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  completeButtonText: {
    ...typography.mediumBold,
    color: colors.white,
  },

  checkboxContainer: {
    marginVertical: 20,
    width: '100%',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  checkboxLabel: {
    ...typography.normalRegular,
    marginLeft: 8,
  },
});
