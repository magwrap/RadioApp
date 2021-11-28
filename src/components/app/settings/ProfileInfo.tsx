import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = ({}) => {
  const {currentUser} = useAuthContext();
  return (
    <View style={styles.container}>
      <Text>{currentUser?.email} </Text>

      <Text>
        displayName:{' '}
        {currentUser?.displayName ? currentUser?.displayName : 'brak'}{' '}
      </Text>

      <Text>
        created:
        {currentUser?.metadata
          ? `\n\tdate: ${currentUser.metadata.creationTime?.slice(
              0,
              10,
            )}\n\thour: ${currentUser.metadata.creationTime?.slice(12, 16)}`
          : 'brak'}{' '}
      </Text>

      <Text>
        photoUrl: {currentUser?.photoURL ? currentUser?.photoURL : 'brak'}{' '}
      </Text>

      <Text>EmailVerified: {currentUser?.emailVerified ? 'yes' : 'no'} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  text: {
    fontSize: 20,
  },
});

export default ProfileInfo;
