import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    minHeight: 70,
    minWidth: '36%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  updatePassword: {},
  updateProfile: {},
  pairOfbuttons: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logout: {backgroundColor: 'orange'},
  deleteProfile: {backgroundColor: 'red'},
});
