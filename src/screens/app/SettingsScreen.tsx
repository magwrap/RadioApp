import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../../components/app/CustomButton';
import DeleteProfile from '../../components/app/settings/DeleteProfile';
import Logout from '../../components/app/settings/Logout';
import ProfileInfo from '../../components/app/settings/ProfileInfo';
import {buttonStyles} from '../../styles/settings/ButtonStyles';
import {textStyles} from '../../styles/settings/TextStyles';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const onUpdateProfile = () => {
    navigation.navigate('UpdateProfile');
  };
  const onChangePassword = () => {
    navigation.navigate('UpdatePassword');
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ProfileInfo />
      </View>
      <View style={[styles.container, styles.buttons]}>
        <View style={buttonStyles.pairOfbuttons}>
          <CustomButton
            title="Update Profile"
            onPress={onUpdateProfile}
            style={buttonStyles.button}
            textStyle={textStyles.text}
          />
          <CustomButton
            title="Change Password"
            onPress={onChangePassword}
            style={buttonStyles.button}
            textStyle={textStyles.text}
          />
        </View>

        <View style={buttonStyles.pairOfbuttons}>
          <Logout />
          <DeleteProfile />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    padding: 10,
  },
});

export default SettingsScreen;
