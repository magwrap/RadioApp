import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RadioScreen from '../../screens/app/RadioScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MusicScreen from '../../screens/app/MusicScreen';
import PlayerTab from '../../components/app/player/PlayerTab';
import SettingsStack from './SettingsStack';
import Logout from '../../components/app/settings/Logout';
import RadioHeaderPickers from '../../components/app/headers/RadioHeaderPickers';
import AddSongButton from '../../components/app/music/AddSongButton';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

interface AppTabsProps {}

const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#404040',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            height: 50,
            paddingHorizontal: 5,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Music') {
              return <Entypo name="music" size={28} color={color} />;
            } else if (route.name === 'Radio') {
              return <Entypo name="radio" size={size} color={color} />;
            } else if (route.name === 'SettingsStack') {
              return <FontAwesome name="user" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Radio"
          component={RadioScreen}
          options={{
            headerRight: () => <RadioHeaderPickers />,
          }}
        />
        <Tab.Screen
          name="Music"
          component={MusicScreen}
          options={{headerRight: () => <AddSongButton />}}
        />

        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{title: 'Profile', headerRight: () => <Logout />}}
        />
      </Tab.Navigator>
      <PlayerTab />
    </>
  );
};

export default AppTabs;
