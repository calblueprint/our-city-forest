import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },

  topActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 80,
  },

  mainFlex: {
    flex: 1,
    gap: 80,
  },

  textFlex: {
    alignItems: 'center',
    gap: 8,
  },

  header: {
    ...typography.heading2,
    color: colors.white,
  },

  subtext: {
    ...typography.mediumRegular,
    color: colors.white,
  },

  cameraView: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 12,
    overflow: 'hidden',
  },

  qrCodeFoundCamera: {
    borderColor: colors.tertiary,
  },

  camera: {
    flex: 1,
    borderRadius: 12,
  },

  scanButton: {
    alignItems: 'center',
    paddingHorizontal: 120,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 32,
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
