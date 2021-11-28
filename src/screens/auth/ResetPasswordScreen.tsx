import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/app/CustomButton';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
import {useAuthContext} from '../../hooks/AuthProvider';
import {buttonStyles} from '../../styles/auth/ButtonStyles';
import {textStyles} from '../../styles/auth/TextStyles';

interface ResetPasswordScreenProps {
  navigation: any;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const {sendPasswordResetEmail} = useAuthContext();

  const sendEmail = () => {
    if (email) {
      sendPasswordResetEmail(setMessage, email);
      Alert.alert(
        'Check your email!',
        'If your email adress is correct, a message has been send to reset your password',
        [{text: 'OK', onPress: () => navigation.goBack()}],
      );
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <CrudentialsTextInput
        type="email"
        value={email}
        onChangeText={setEmail}
        placeholder="enter your email"
        label="email"
      />
      {message ? <Text style={textStyles.message}>{message}</Text> : null}
      <View style={styles.buttons}>
        <CustomButton
          title="Send an email to reset password"
          onPress={sendEmail}
          style={[buttonStyles.button, buttonStyles.loginButton]}
          textStyle={textStyles.text}
        />
        <CustomButton
          title="Cancel"
          onPress={goBack}
          style={[buttonStyles.button, styles.red]}
          textStyle={textStyles.text}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {minHeight: 600},
  red: {backgroundColor: 'red'},
});

export default ResetPasswordScreen;
