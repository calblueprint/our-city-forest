import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },

  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  headingStyle: {
    color: 'black',
    fontFamily: 'SF Pro Display',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 26.4,
  },

  iconBlock: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 16,
  },

  allIcons: {
    padding: 10,
    flexDirection: 'column',
  },

  allText: {
    padding: 10,
    flexDirection: 'column',
  },

  item: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
