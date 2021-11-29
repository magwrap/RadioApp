import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  buttons: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    minHeight: 40,
    minWidth: '26%',
    maxHeight: 100,
    maxWidth: '40%',
    // shadow: true,
    // shadowRadius: 1,
    // shadowColor: 'black',
    // shadowOpacity: 2.2,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  updatePassword: {
    backgroundColor: '#A9A9A9',
  },
  updateProfile: {
    backgroundColor: '#A9A9A9',
  },
  pairOfbuttons: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logout: {
    backgroundColor: 'gray',
    height: 40,
    width: '25%',
    borderRadius: 13,
    borderWidth: 0,
  },
  deleteProfile: {backgroundColor: 'red'},
  back: {padding: 10},
});
