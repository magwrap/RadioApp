import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    minHeight: 40,
    minWidth: '26%',
    maxHeight: 100,
    maxWidth: '40%',
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
  logout: {
    backgroundColor: 'orange',
    height: 40,
    width: '25%',
    borderRadius: 13,
  },
  deleteProfile: {backgroundColor: 'red'},
});
