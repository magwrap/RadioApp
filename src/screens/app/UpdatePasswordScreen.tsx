import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CustomButton from '../../components/app/CustomButton';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
import {useAuthContext} from '../../hooks/AuthProvider';
import {textStyles} from '../../styles/auth/TextStyles';
import {buttonStyles} from '../../styles/settings/ButtonStyles';

interface UpdatePasswordScreenProps {}

const UpdatePasswordScreen: React.FC<UpdatePasswordScreenProps> = ({}) => {
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
  return (
    <View>
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
    </View>
  );
};

export default UpdatePasswordScreen;
