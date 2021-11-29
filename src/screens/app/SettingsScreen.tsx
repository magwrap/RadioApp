import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../components/app/CustomButton';
import DeleteProfile from '../../components/app/settings/DeleteProfile';
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

  const containerStyle = {flex: 1};
  return (
    <View style={containerStyle}>
      <View style={containerStyle}>
        <ProfileInfo />
      </View>
      <View style={[containerStyle, buttonStyles.buttons]}>
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

        <DeleteProfile />
      </View>
    </View>
  );
};

export default SettingsScreen;
