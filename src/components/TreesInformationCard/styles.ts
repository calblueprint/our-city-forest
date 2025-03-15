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
    borderRadius: 33,
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
    fontFamily: 'SF Pro Display',
    fontSize: 16,
    color: 'black',
    fontWeight: 400,
    lineHeight: 0,
  },

  headingBlock: {
    paddingTop: 30,
    paddingBottom: 27,
    paddingRight: 21,
    paddingLeft: 20,
    gap: 15,
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
    alignItems: 'center',
    paddingRight: 10,
    gap: 10,
  },

  allIcons: {
    flexDirection: 'column',
    gap: 10,
  },

  allText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 6,
    gap: 10,
  },

  item: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
