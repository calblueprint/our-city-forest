import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { scale, verticalScale } from '@/utils/scaling';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
  },

  topActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(80),
  },

  mainFlex: {
    flex: 1,
    gap: scale(80),
  },

  subFlex: {
    flex: 1,
    gap: scale(40),
  },

  textFlex: {
    alignItems: 'center',
    gap: scale(8),
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
    width: scale(290),
    height: verticalScale(290),
    borderWidth: scale(2),
    borderColor: colors.secondary,
    borderRadius: scale(12),
    overflow: 'hidden',
  },

  qrCodeFoundCamera: {
    borderColor: colors.tertiary,
    borderWidth: scale(4),
  },

  camera: {
    flex: 1,
    borderRadius: scale(12),
  },

  scanButton: {
    alignItems: 'center',
    paddingHorizontal: scale(130),
    paddingVertical: verticalScale(12),
    borderRadius: scale(10),
    marginBottom: scale(10),
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
