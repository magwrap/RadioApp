import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`Welcome to the demo of my all music in one app!

        In future I'm planning to add: 
          -spotify-connection, 
          -youtube music, 
          -music from local files,
          -music from database,
        `}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;
