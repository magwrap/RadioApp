import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface PlayerHeaderProps {}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({}) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate}>
        <FontAwesome5Icon name="long-arrow-alt-left" color="black" size={50} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'aliceblue',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PlayerHeader;
