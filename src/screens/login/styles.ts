import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loginContainer: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
  },

  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#446127',
  },

  logoContainer: {
    alignItems: 'center',
  },

  logo: {
    height: 200,
    marginTop: 20,
    marginBottom: 70,
  },

  button: {
    backgroundColor: '#446127',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  adminLoginContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  adminLoginText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#828282',
  },

  adminLoginLinkText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#446127',
    textDecorationLine: 'underline',
  },
});
