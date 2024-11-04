import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 44,
    backgroundColor: colors.primary_green,
  },

  iconFlex: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icon: {
    backgroundColor: colors.white1,
    padding: 8,
  },

  cameraView: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 86,
  },

  textFlex: {
    flex: 0,
    flexDirection: 'column',
    gap: 8,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.white1,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.white1,
  },

  camera: {
    alignSelf: 'center',
    width: 285,
    height: 248,
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
    backgroundColor: colors.primary_yellow,
  },

  scanButtonText: {
    fontSize: 18,
    color: colors.white1,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
