import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/app/HomeScreen';
import SettingsScreen from '../../screens/app/SettingsScreen';
import RadioScreen from '../../screens/app/RadioScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicScreen from '../../screens/app/MusicScreen';
import PlayerTab from '../../components/app/player/PlayerTab';

const Tab = createBottomTabNavigator();

interface AppTabsProps {}

const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            height: 50,
            paddingHorizontal: 5,
          },
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Home') {
              return focused ? (
                <Ionicons name="home" size={size} color={color} />
              ) : (
                <Entypo name="home" size={size} color={color} />
              );
            } else if (route.name === 'Music') {
              return focused ? (
                <Entypo name="folder-music" size={size} color={color} />
              ) : (
                <Entypo name="music" size={28} color={color} />
              );
            } else if (route.name === 'Radio') {
              return focused ? (
                <Feather name="radio" size={size} color={color} />
              ) : (
                <Entypo name="radio" size={size} color={color} />
              );
            } else if (route.name === 'Settings') {
              return focused ? (
                <Feather name="settings" size={size} color={color} />
              ) : (
                <Ionicons name="settings" size={size} color={color} />
              );
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Music" component={MusicScreen} />
        <Tab.Screen name="Radio" component={RadioScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <PlayerTab />
    </>
  );
};

export default AppTabs;
