import React from 'react';
import {useAuthContext} from '../../../hooks/AuthProvider';
import {buttonStyles} from '../../../styles/settings/ButtonStyles';
import {textStyles} from '../../../styles/settings/TextStyles';
import CustomButton from '../CustomButton';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = ({}) => {
  const {logout} = useAuthContext();
  return (
    <CustomButton
      title="Logout"
      onPress={logout}
      style={[buttonStyles.button, buttonStyles.logout]}
      textStyle={textStyles.text}
    />
  );
};

export default Logout;
