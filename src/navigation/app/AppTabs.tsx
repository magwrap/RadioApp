import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/app/HomeScreen';
import RadioScreen from '../../screens/app/RadioScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicScreen from '../../screens/app/MusicScreen';
import PlayerTab from '../../components/app/player/PlayerTab';
import SettingsStack from './SettingsStack';
import Logout from '../../components/app/settings/Logout';
import LanguagePicker from '../../components/app/radio/LanguagePicker';

const Tab = createBottomTabNavigator();

interface AppTabsProps {}

const AppTabs: React.FC<AppTabsProps> = ({}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('polish');
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
            if (route.name === 'Home') {
              return focused ? (
                <Ionicons name="home" size={size} color={color} />
              ) : (
                <Entypo name="home" size={size} color={color} />
              );
            } else if (route.name === 'Music') {
              return <Entypo name="music" size={28} color={color} />;
            } else if (route.name === 'Radio') {
              return <Entypo name="radio" size={size} color={color} />;
            } else if (route.name === 'SettingsStack') {
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
        <Tab.Screen
          name="Radio"
          component={RadioScreen}
          initialParams={{selectedLanguage: selectedLanguage}}
          options={{
            headerRight: () => (
              <LanguagePicker
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{title: 'Settings', headerRight: () => <Logout />}}
        />
      </Tab.Navigator>
      <PlayerTab />
    </>
  );
};

export default AppTabs;
