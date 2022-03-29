import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: 80,
  },
  button: {
    minWidth: '40%',
    minHeight: '8%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  loginButton: {
    backgroundColor: 'green',
  },
  registerButton: {
    backgroundColor: 'blue',
  },
  goToRegisterButton: {
    backgroundColor: 'yellow',
  },
});
