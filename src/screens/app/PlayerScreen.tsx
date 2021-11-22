import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface PlayerScreenProps {}

const PlayerScreen: React.FC<PlayerScreenProps> = ({}) => {
  return (
    <View>
      <Text style={styles.text}>Player Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

export default PlayerScreen;
