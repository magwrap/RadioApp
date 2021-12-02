import React from 'react';
import {Alert} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';
import {buttonStyles} from '../../../styles/settings/ButtonStyles';
import {textStyles} from '../../../styles/settings/TextStyles';
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
      style={[buttonStyles.button, buttonStyles.deleteProfile]}
      textStyle={textStyles.text}
    />
  );
};

export default DeleteProfile;
