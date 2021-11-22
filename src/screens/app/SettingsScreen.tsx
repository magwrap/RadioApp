import React from 'react';
import {StyleSheet, View} from 'react-native';
import DeleteProfile from '../../components/app/settings/DeleteProfile';
import Logout from '../../components/app/settings/Logout';
import ProfileInfo from '../../components/app/settings/ProfileInfo';
import UpdatePassword from '../../components/app/settings/UpdatePassword';
import UpdateProfile from '../../components/app/settings/UpdateProfile';

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <ProfileInfo />
      <View style={styles.profileFunctions}>
        <UpdateProfile />
        <UpdatePassword />
      </View>
      <View style={styles.profileFunctions}>
        <Logout />
        <DeleteProfile />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  profileFunctions: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default SettingsScreen;
