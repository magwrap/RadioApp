import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './auth/AuthStack';
import {useAuthContext} from '../hooks/AuthProvider';
import AppTabs from './app/AppTabs';

interface routesProps {}

const Routes: React.FC<routesProps> = ({}) => {
  const {currentUser} = useAuthContext();

  return (
    <NavigationContainer>
      {currentUser ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default Routes;
