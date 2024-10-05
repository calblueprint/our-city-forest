import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 44,
  },
  cameraView: {
    flexDirection: 'column',
    gap: 24,
  },
  qrMessage: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  camera: {
    aspectRatio: 1,
    width: '100%',
    height: undefined, // Calculate heigth based on aspect ratio and width
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
