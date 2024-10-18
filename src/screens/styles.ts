import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },

  loginSelectionContainer: {
    flex: 1,
    rowGap: 20,
    padding: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#DFDFDF',
  },

  loginHeadingText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  buttonsContainer: {
    rowGap: 10,
  },

  button: {
    backgroundColor: '#8F8F8F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  memberLoginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 100,
    rowGap: 50,
  },

  googleLoginProfileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButton: {
    backgroundColor: '#8F8F8F',
    padding: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
});
