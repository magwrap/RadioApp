import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useAuthContext} from '../../../hooks/AuthProvider';
import Center from '../Center';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = ({}) => {
  const {currentUser} = useAuthContext();
  return (
    <View style={styles.container}>
      <Center>
        <Text style={styles.displayName}>
          {currentUser?.displayName ? currentUser?.displayName : 'brak'}{' '}
        </Text>

        <Text style={styles.email}>{currentUser?.email} </Text>

        <Text style={styles.created}>
          created:
          {currentUser?.metadata
            ? `${currentUser.metadata.creationTime?.slice(
                0,
                10,
              )} ${currentUser.metadata.creationTime?.slice(12, 16)}`
            : 'brak'}
        </Text>

        {currentUser?.photoURL ? (
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 50, height: 50}}
            source={{uri: currentUser?.photoURL}}
          />
        ) : null}
      </Center>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  text: {
    fontSize: 20,
  },
  email: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  displayName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  created: {
    color: 'gray',
  },
});

export default ProfileInfo;
