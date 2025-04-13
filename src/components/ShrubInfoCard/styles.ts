import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  headingStyle: {
    ...typography.heading2,
    paddingTop: 25,
    paddingBottom: 20,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 40,
    borderRadius: 20,
    width: '80%',
    gap: 15,
  },

  modalInfo: {
    gap: 15,
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },

  iconItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    ...typography.mediumRegular,
    maxWidth: 150,
  },
});
