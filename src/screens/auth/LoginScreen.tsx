import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CrudentialsTextInput from '../../components/auth/CrudentialsTextInput';
// import PhoneSignIn from '../../components/auth/PhoneSignin';
import {useAuthContext} from '../../hooks/AuthProvider';

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

  const signIn = () => {
    if (email && password) {
      login(email, password, setMessage);
    } else {
      setViewWarnings(true);
    }
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
      {message ? <Text>{message}</Text> : null}
      <Button title="login" onPress={signIn} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      {/* <PhoneSignIn /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
