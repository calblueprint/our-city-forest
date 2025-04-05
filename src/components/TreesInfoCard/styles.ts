import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 33,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'white',
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

  textStyle: {
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
