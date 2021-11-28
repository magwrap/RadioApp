import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/app/CustomButton';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
// import PhoneSignIn from '../../components/auth/PhoneSignin';
import {useAuthContext} from '../../hooks/AuthProvider';
import {buttonStyles} from '../../styles/auth/ButtonStyles';
import {textStyles} from '../../styles/auth/TextStyles';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewWarnings, setViewWarnings] = useState(false);
  const [message, setMessage] = useState('');

  const {login} = useAuthContext();

  useEffect(() => {
    setEmail('jasiek.musiol@gmail.com');
    setPassword('haslo123');
    signIn();
  }, []); //TODO: usunac ten efekt

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const signIn = () => {
    if (email && password) {
      login(email, password, setMessage);
    } else {
      setViewWarnings(true);
    }
  };

  const goToResetPassword = () => {
    navigation.navigate('ResetPassword');
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

      <CustomButton
        title="You dont remember your password?"
        onPress={goToResetPassword}
        textStyle={textStyles.resetPassword}
      />

      {message ? <Text style={textStyles.message}>{message}</Text> : null}
      <View style={buttonStyles.buttons}>
        <CustomButton
          title="Login"
          onPress={signIn}
          style={[buttonStyles.button, buttonStyles.loginButton]}
          textStyle={textStyles.text}
        />
        <CustomButton
          title="Sign Up"
          onPress={goToRegister}
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

export default LoginScreen;
