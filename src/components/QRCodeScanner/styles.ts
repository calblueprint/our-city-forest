import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { space } from '@/styles/space';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 44,
    backgroundColor: colors.primary,
  },

  iconFlex: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icon: {
    backgroundColor: colors.white,
    padding: 8,
  },

  mainFlex: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: space[1000],
  },

  textFlex: {
    flex: 0,
    flexDirection: 'column',
    gap: space[100],
  },

  header: {
    textAlign: 'center',
    ...typography.heading5,
    color: colors.white,
  },

  subtext: {
    textAlign: 'center',
    ...typography.normalRegular,
    color: colors.white,
  },

  cameraView: {
    alignSelf: 'center',
    width: 285,
    height: 248,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 12,
    zIndex: 1,
  },

  camera: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },

  qrCodeFoundCamera: {
    borderColor: colors.tertiary,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },

  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 44,
    marginBottom: 64,
  },

  scanButtonDisabled: {
    backgroundColor: colors.gray4,
  },

  scanButtonEnabled: {
    backgroundColor: colors.tertiary,
  },

  scanButtonText: {
    ...typography.mediumBold,
    color: colors.white,
  },
});
