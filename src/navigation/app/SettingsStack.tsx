import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SettingsScreen from '../../screens/app/SettingsScreen';
import UpdatePasswordScreen from '../../screens/app/UpdatePasswordScreen';
import UpdateProfileScreen from '../../screens/app/UpdateProfileScreen';

interface SettingsStackProps {}

const Stack = createNativeStackNavigator();

const SettingsStack: React.FC<SettingsStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        // options={{header: () => null}}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        // options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
