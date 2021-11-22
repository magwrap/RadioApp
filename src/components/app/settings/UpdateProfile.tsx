import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';
import CustomButton from '../CustomButton';

interface UpdateProfileProps {}

const UpdateProfile: React.FC<UpdateProfileProps> = ({}) => {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const {updateProfile} = useAuthContext();

  const onUpdateProfile = () => {
    updateProfile(displayName, photoURL);
  };

  return (
    <View>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="display name"
      />

      <TextInput
        value={photoURL}
        onChangeText={setPhotoURL}
        placeholder="photo URjanL"
      />
      <CustomButton
        title="Update Profile"
        onPress={onUpdateProfile}
        style={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 100,
    borderWidth: 1,
    padding: 5,
    margin: 10,
  },
});

export default UpdateProfile;
