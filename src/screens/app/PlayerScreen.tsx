/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Slider from '@react-native-community/slider';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {usePlayerContext} from '../../hooks/PlayerProvider';
import {LogBox} from 'react-native';
import ViewActivityIndicator from '../../components/app/player/ViewActivityIndicator';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const listSpeedValues = [
  {value: 0.25, text: 'x0.25'},
  {value: 0.5, text: 'x0.5'},
  {value: 0.75, text: 'x0.75'},
  {value: 1.0, text: 'x1.0'},
  {value: 1.25, text: 'x1.25'},
  {value: 1.5, text: 'x1.5'},
  {value: 1.75, text: 'x1.75'},
];

const defaultColor = 'black';
const defaultOppositeColor = 'aliceblue';

interface PlayerScreenProps {
  route: any;
}

const PlayerScreen: React.FC<PlayerScreenProps> = () => {
  const {player, station} = usePlayerContext();

  const musicIcon = require('../../images/Music-icon-lg.png');

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{station ? station.name : 'No name'}</Text>
      </View>
      <View style={styles.changeAudio}>
        <TouchableOpacity onPress={player.previous}>
          <FontAwesomeIcon
            name="step-backward"
            size={50}
            color={
              player.isDisabledButtonPrevious === false ? defaultColor : 'gray'
            }
          />
        </TouchableOpacity>
        <View>
          {station && (
            <View>
              <ViewActivityIndicator
                player={player}
                size="large"
                viewText={true}
              />
            </View>
          )}
          {station?.favicon ? (
            <Image source={{uri: station.favicon}} style={styles.avatar} />
          ) : (
            <Image source={musicIcon} style={styles.avatar} />
          )}
        </View>
        <TouchableOpacity onPress={player.next} style={styles.button}>
          <FontAwesomeIcon
            name="step-forward"
            size={50}
            color={
              player.isDisabledButtonNext === false ? defaultColor : 'gray'
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtonsOther}>
        <TouchableOpacity onPress={player.decreaseTime} style={styles.button}>
          <FontAwesomeIcon name="rotate-left" size={50} color={defaultColor} />
          <Text style={styles.timeRate}>{player.timeRate}</Text>
        </TouchableOpacity>
        {player.status === 'play' ? (
          <TouchableOpacity
            onPress={player.pause}
            style={styles.marginHorizontal}>
            <FontAwesomeIcon name="pause" color={defaultColor} size={50} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={player.play}
            style={styles.marginHorizontal}>
            <FontAwesomeIcon name="play" color={defaultColor} size={50} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={player.increaseTime} style={styles.button}>
          <FontAwesomeIcon name="rotate-right" size={50} color={defaultColor} />
          <Text style={styles.timeRate}>{player.timeRate}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtonsOther}>
        <TouchableOpacity onPress={player.shuffle} style={styles.button}>
          <EntypoIcon
            name="shuffle"
            color={player.isShuffle === true ? '#0aad39' : defaultColor}
            size={50}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={player.loop} style={styles.button}>
          <MaterialIcon
            name="loop"
            color={player.isLoop === true ? '#3399ff' : defaultColor}
            size={50}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={player.stop}
          style={styles.button}
          disabled={player.isDisabledButtonStop}>
          <EntypoIcon
            name="controller-stop"
            color={player.status === 'stop' ? 'red' : defaultColor}
            size={50}
          />
        </TouchableOpacity>
        {player.isMuted === false ? (
          <TouchableOpacity onPress={player.mute} style={styles.button}>
            <EntypoIcon name="sound" color={defaultColor} size={50} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={player.unmute} style={styles.button}>
            <EntypoIcon name="sound-mute" color={'red'} size={50} />
          </TouchableOpacity>
        )}
        <Slider
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '40%', height: 50}}
          minimumValue={0}
          maximumValue={100}
          value={player.volume}
          minimumTrackTintColor={defaultColor}
          maximumTrackTintColor="gray"
          thumbTintColor={defaultColor}
          onSlidingComplete={volume => player.setVolume(volume)}
        />
      </View>
      <View style={styles.progressBar}>
        <Text style={styles.progressBarText}>{player.currentTimeString}</Text>
        <Slider
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '70%', height: 40}}
          minimumValue={0}
          maximumValue={player.duration}
          value={player.currentTime}
          minimumTrackTintColor={defaultColor}
          maximumTrackTintColor="gray"
          thumbTintColor={defaultColor}
          onTouchStart={player.pause}
          onTouchEnd={player.play}
          onSlidingComplete={seconds => player.seekToTime(seconds)}
        />
        <Text style={styles.progressBarText}>{player.durationString}</Text>
      </View>
      <View style={styles.speed}>
        {listSpeedValues.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.speedItem}
            onPress={() => player.setSpeed(item.value)}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: player.speed === item.value ? 'gray' : defaultColor,
              }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: defaultOppositeColor,
  },
  name: {
    color: defaultColor,
    fontSize: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    margin: 15,
  },
  progressBar: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  progressBarText: {
    color: defaultColor,
    alignSelf: 'center',
  },
  speed: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  speedItem: {
    width: 50,
  },
  actionButtons: {},
  actionButtonsOther: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  pauseOrPlayButton: {
    marginRight: 10,
    marginLeft: 10,
    width: 50,
  },
  actionButtonsOtherTimeDown: {
    // left: -35,
  },
  actionButtonsOtherTimeUp: {
    // width: 40,
  },
  changeAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
  },

  timeRate: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 1,
    color: defaultColor,
    fontSize: 12,
  },

  marginHorizontal: {marginHorizontal: 20},
  info: {
    alignItems: 'center',
  },
});

export default PlayerScreen;
