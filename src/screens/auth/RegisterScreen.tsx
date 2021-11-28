import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
import {useAuthContext} from '../../hooks/AuthProvider';
import {useNavigation} from '@react-navigation/native';

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
    if (email && password && confirmPassword && password === confirmPassword) {
      register(email, password, setMessage);
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

      {message ? <Text>{message}</Text> : null}

      <Button title="Register" onPress={signUp} />
      <Button title="Go to Login" onPress={goToLogin} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});

export default RegisterScreen;
