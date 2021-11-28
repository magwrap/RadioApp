import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
import {useAuthContext} from '../../hooks/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/app/CustomButton';
import {buttonStyles} from '../../styles/auth/ButtonStyles';
import {textStyles} from '../../styles/auth/TextStyles';

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [viewWarnings, setViewWarnings] = useState(false);
  const [message, setMessage] = useState('');

  const {register} = useAuthContext();
  const navigation = useNavigation();

  const signUp = () => {
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        register(email, password, setMessage);
      } else {
        setMessage("Passwords doesn't match!");
      }
    } else {
      setViewWarnings(true);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <CrudentialsTextInput
        type="email"
        value={email}
        onChangeText={setEmail}
        placeholder="enter your email"
        label="email"
        viewWarnings={viewWarnings}
      />
      <CrudentialsTextInput
        type="password"
        value={password}
        onChangeText={setPassword}
        placeholder="enter your password"
        label="password"
        viewWarnings={viewWarnings}
      />
      <CrudentialsTextInput
        type="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="confirm your password"
        label="confirm password"
        viewWarnings={viewWarnings}
      />

      {message ? <Text style={textStyles.message}>{message}</Text> : null}
      <View style={buttonStyles.buttons}>
        <CustomButton
          title="Register"
          onPress={signUp}
          style={[buttonStyles.button, buttonStyles.registerButton]}
          textStyle={textStyles.text}
        />
        <CustomButton
          title="Sign In"
          onPress={goToLogin}
          style={[buttonStyles.button, buttonStyles.goToRegisterButton]}
          textStyle={textStyles.text}
        />
        {/* <PhoneSignIn /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegisterScreen;
