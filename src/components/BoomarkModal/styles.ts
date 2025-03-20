import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderRadius: 22,
    minHeight: 400,
  },

  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 4,
    width: 45,
  },

  foldersList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    gap: 12,
  },

  createList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },

  createText: {
    fontWeight: 500,
    fontSize: 18,
    textAlign: 'left',
  },

  saveText: {
    fontWeight: 700,
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20, 
  },

});
