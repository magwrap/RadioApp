import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  return (
    <View>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;
