import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 20,
    position: 'relative',
  },

  imageContainer: {
    marginBottom: 16,
  },

  headerText: {
    ...typography.heading2,
    color: colors.primary,
    textAlign: 'left',
  },

  createText: {
    fontWeight: 500,
    fontSize: 18,
    textAlign: 'left',
  },

  topContainer: {
    paddingHorizontal: 27,
    paddingTop: 16,
    gap: 12,
    marginBottom: 20,
  },

  createList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 9,
    gap: 12,
    marginBottom: 20,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray5,
  },
});
