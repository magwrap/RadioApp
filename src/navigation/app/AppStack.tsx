import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PlayerHeader from '../../components/app/player/PlayerHeader';
import PlayerScreen2 from '../../screens/app/PlayerScreen';
import AppTabs from './AppTabs';

interface AppStackProps {}

const Stack = createNativeStackNavigator();

const AppStack: React.FC<AppStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Player"
        component={PlayerScreen2}
        options={{header: () => <PlayerHeader />}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
