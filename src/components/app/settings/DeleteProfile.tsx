import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';
import CustomButton from '../CustomButton';

interface DeleteProfileProps {}

const DeleteProfile: React.FC<DeleteProfileProps> = ({}) => {
  const {deleteProfile} = useAuthContext();

  const onDeleteProfile = () => {
    Alert.alert(
      'Warning!',
      'Do you really want to delete your accont?',
      [
        {
          text: 'Yes',
          onPress: () => deleteProfile(),
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <CustomButton
      title="deleteProfile"
      onPress={onDeleteProfile}
      style={styles.removeButton}
    />
  );
};
const styles = StyleSheet.create({
  removeButton: {
    padding: 5,
    margin: 10,
    height: 50,
    width: 100,
    borderWidth: 1,
    backgroundColor: 'red',
  },
});

export default DeleteProfile;
