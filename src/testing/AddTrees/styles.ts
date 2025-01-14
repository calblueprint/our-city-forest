import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },

  title: {
    ...typography.heading2,
    color: colors.primary,
    marginBottom: 40,
  },

  inputContainer: {
    marginBottom: 32,
  },

  label: {
    ...typography.mediumRegular,
    marginBottom: 12,
    color: colors.gray1,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },

  input: {
    ...typography.mediumRegular,
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButton: {
    backgroundColor: colors.primary,
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    ...typography.heading2,
    color: colors.white,
  },

  quantityText: {
    ...typography.largeRegular,
    marginHorizontal: 32,
    color: colors.gray1,
  },

  completeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 20,
  },

  completeButtonText: {
    ...typography.largeBold,
    color: colors.white,
    textAlign: 'center',
  },
});
