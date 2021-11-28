import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface MusicScreenProps {}

const MusicScreen: React.FC<MusicScreenProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.text}>Music Screen</Text>
      <Button
        title="Open Player"
        onPress={() => navigation.navigate('Player')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default MusicScreen;
