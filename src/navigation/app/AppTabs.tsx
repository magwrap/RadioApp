import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/app/HomeScreen';
import SettingsScreen from '../../screens/app/SettingsScreen';
import PlayerScreen from '../../screens/app/PlayerScreen';
import RadioScreen from '../../screens/app/RadioScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

interface AppTabsProps {}

const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return focused ? (
              <Ionicons name="home" size={size} color={color} />
            ) : (
              <Entypo name="home" size={size} color={color} />
            );
          } else if (route.name === 'Player') {
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
      <Tab.Screen name="Player" component={PlayerScreen} />
      <Tab.Screen name="Radio" component={RadioScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
