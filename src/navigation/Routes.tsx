import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './auth/AuthStack';
import {useAuthContext} from '../hooks/AuthProvider';
import AppStack from './app/AppStack';

interface routesProps {}

const Routes: React.FC<routesProps> = ({}) => {
  const {currentUser} = useAuthContext();

  return (
    <NavigationContainer>
      {currentUser ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default Routes;
