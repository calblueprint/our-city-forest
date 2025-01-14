import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },

  iconFlex: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mainFlex: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 80,
  },

  textFlex: {
    flex: 0,
    flexDirection: 'column',
    gap: 8,
  },

  header: {
    textAlign: 'center',
    ...typography.heading2,
    color: colors.white,
  },

  subtext: {
    textAlign: 'center',
    ...typography.mediumRegular,
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

  qrCodeFoundCamera: {
    borderColor: colors.tertiary,
  },

  camera: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },

  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 48,
    marginBottom: 64,
  },

  scanButtonEnabled: {
    backgroundColor: colors.tertiary,
  },

  scanButtonDisabled: {
    backgroundColor: colors.gray4,
  },

  scanButtonText: {
    ...typography.largeBold,
    color: colors.white,
  },
});
