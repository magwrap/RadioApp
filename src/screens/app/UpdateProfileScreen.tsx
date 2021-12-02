import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/app/CustomButton';
import ImagePicker from '../../components/app/settings/ImagePicker';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
import {useAuthContext} from '../../hooks/AuthProvider';
import {buttonStyles} from '../../styles/settings/ButtonStyles';

interface UpdateProfileScreenProps {
  navigation: any;
}

const UpdateProfileScreen: React.FC<UpdateProfileScreenProps> = ({
  navigation,
}) => {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const {updateProfile} = useAuthContext();

  const onUpdateProfile = () => {
    updateProfile(displayName, photoURL);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={goBack} style={buttonStyles.back}>
        <Ionicons size={25} color="black" name="arrow-back" />
      </TouchableOpacity>
      <CrudentialsTextInput
        type="email"
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="enter your display name"
        label="display name"
      />

      <ImagePicker setPhotoURL={setPhotoURL} />
      <CustomButton
        title="Update Profile"
        onPress={onUpdateProfile}
        style={[buttonStyles.button, buttonStyles.updateProfile]}
      />
    </View>
  );
};

export default UpdateProfileScreen;
