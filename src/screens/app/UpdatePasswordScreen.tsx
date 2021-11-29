import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../components/app/CustomButton';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
import {useAuthContext} from '../../hooks/AuthProvider';
import {textStyles} from '../../styles/auth/TextStyles';
import {buttonStyles} from '../../styles/settings/ButtonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface UpdatePasswordScreenProps {
  navigation: any;
}

const UpdatePasswordScreen: React.FC<UpdatePasswordScreenProps> = ({
  navigation,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [viewWarnings, setViewWarnings] = useState(false);
  const [message, setMessage] = useState('');
  const {updatePassword} = useAuthContext();

  //TODO: dodac funkcje sprawdzajacą czy stare haslo sie zgadza
  const onUpdatePassword = () => {
    if (currentPassword && password && confirmPassword) {
      if (password === confirmPassword) {
        updatePassword(password, setMessage);
      } else {
        setMessage("Passwords doesn't match");
      }
    } else {
      setViewWarnings(true);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onResetPassword = () => {
    navigation.navigate('ResetPassword');
  };
  return (
    <View>
      <TouchableOpacity onPress={goBack} style={buttonStyles.back}>
        <Ionicons size={25} color="black" name="arrow-back" />
      </TouchableOpacity>
      <CrudentialsTextInput
        type="password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="enter your current Password"
        label="current password"
        viewWarnings={viewWarnings}
      />
      <CrudentialsTextInput
        type="password"
        value={password}
        onChangeText={setPassword}
        placeholder="enter your new Password"
        label="new password"
        viewWarnings={viewWarnings}
      />

      <CrudentialsTextInput
        type="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="confirm your password"
        label="confirm new password"
        viewWarnings={viewWarnings}
      />
      {message ? <Text style={textStyles.message}>{message}</Text> : null}
      <CustomButton
        title="Update Password"
        onPress={onUpdatePassword}
        style={[buttonStyles.button, buttonStyles.updatePassword]}
      />
      <CustomButton
        title="Do you want to reset your password?"
        onPress={onResetPassword}
        style={[buttonStyles.button, buttonStyles.updatePassword]}
      />
    </View>
  );
};

export default UpdatePasswordScreen;
