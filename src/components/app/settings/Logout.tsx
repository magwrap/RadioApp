import React from 'react';
import {StyleSheet} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';
import CustomButton from '../CustomButton';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = ({}) => {
  const {logout} = useAuthContext();
  return <CustomButton title="Logout" onPress={logout} style={styles.button} />;
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

export default Logout;
