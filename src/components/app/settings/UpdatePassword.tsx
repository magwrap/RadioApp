import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';
import CustomButton from '../CustomButton';

interface UpdatePasswordProps {}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {updatePassword} = useAuthContext();

  const onUpdatePassword = () => {
    if (password === confirmPassword) {
      updatePassword(password);
    }
  };
  return (
    <View>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="new Password"
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
      />
      <CustomButton
        title="Update Password"
        onPress={onUpdatePassword}
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

export default UpdatePassword;
