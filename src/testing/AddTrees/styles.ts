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
    ...typography.heading5,
    color: colors.primary,
    marginBottom: 40,
  },

  inputContainer: {
    marginBottom: 30,
  },

  label: {
    ...typography.normalRegular,
    marginBottom: 10,
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
    ...typography.normalRegular,
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
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
    ...typography.heading5,
    color: colors.white,
  },

  quantityText: {
    ...typography.largeRegular,
    marginHorizontal: 30,
    color: colors.gray1,
  },

  completeButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 20,
  },

  completeButtonText: {
    ...typography.mediumBold,
    color: colors.white,
    textAlign: 'center',
  },
});
