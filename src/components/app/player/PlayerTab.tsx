import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {usePlayerContext} from '../../../hooks/PlayerProvider';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import ViewActivityIndicator from './ViewActivityIndicator';

interface PlayerTabProps {}

const PlayerTab: React.FC<PlayerTabProps> = ({}) => {
  const {player, station} = usePlayerContext();
  const buttonSize = 25;
  const name = station ? station.name : '';

  const navigation = useNavigation();

  const musicIcon = require('../../../images/Music-icon-sm.png');

  const goToPlayer = () => {
    navigation.navigate('Player');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToPlayer} style={styles.station}>
        {station?.favicon ? (
          <Image source={{uri: station.favicon}} style={styles.avatar} />
        ) : (
          <Image source={musicIcon} style={styles.avatar} />
        )}
        <Text>{name.slice(0, 10)}</Text>
      </TouchableOpacity>
      <View style={styles.progressBar}>
        <Text style={styles.progressBarText}>{player.currentTimeString}</Text>
        <Slider
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '70%', minHeight: 40}}
          minimumValue={0}
          maximumValue={player.duration}
          value={player.currentTime}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="gray"
          thumbTintColor="#FFFFFF"
          onTouchStart={player.pause}
          onTouchEnd={player.play}
          onSlidingComplete={seconds => player.seekToTime(seconds)}
        />
        {/* <Text style={styles.progressBarText}>{player.durationString}</Text> */}
      </View>
      <View style={styles.buttons}>
        {station && <ViewActivityIndicator player={player} />}

        {player.status === 'play' ? (
          <TouchableOpacity onPress={player.pause} style={styles.button}>
            <FontAwesomeIcon name="pause" color="gray" size={buttonSize} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={player.play} style={styles.button}>
            <FontAwesomeIcon name="play" color="gray" size={buttonSize} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={player.next} style={styles.button}>
          <FontAwesomeIcon
            name="step-forward"
            size={buttonSize}
            color={player.isDisabledButtonNext === false ? 'white' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 50,
    // top: 100,
    flexDirection: 'row',
    backgroundColor: '#FDFDFD',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    margin: 2,
    marginRight: 10,
  },
  progressBar: {
    flexDirection: 'row',
    marginVertical: 1,
    marginHorizontal: 1,
    borderColor: 'white',
    borderWidth: 1,
    width: 165,
  },
  progressBarText: {
    alignSelf: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 100,
    marginRight: 5,
  },
  station: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
});

export default PlayerTab;
