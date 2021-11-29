import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {usePlayerContext} from '../../../hooks/PlayerProvider';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import ViewActivityIndicator from './ViewActivityIndicator';
import TextTicker from 'react-native-text-ticker';
import {playerStyles} from '../../../styles/player/PlayerTabStyles';

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
    <View style={playerStyles.container}>
      <TouchableOpacity onPress={goToPlayer} style={playerStyles.station}>
        {station?.favicon ? (
          <Image source={{uri: station.favicon}} style={playerStyles.avatar} />
        ) : (
          <Image source={musicIcon} style={playerStyles.avatar} />
        )}
        {/* <Text>{name.slice(0, 10)}</Text> */}
        <View style={playerStyles.tickerWidth}>
          <TextTicker
            style={playerStyles.stationName}
            duration={10000}
            loop
            repeatSpacer={50}
            marqueeDelay={1000}>
            {name}
          </TextTicker>
        </View>
      </TouchableOpacity>
      <View style={playerStyles.progressBar}>
        <Text style={playerStyles.progressBarText}>
          {player.currentTimeString}
        </Text>
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
      <View style={playerStyles.buttons}>
        {station && <ViewActivityIndicator player={player} />}

        {player.status === 'play' ? (
          <TouchableOpacity onPress={player.pause} style={playerStyles.button}>
            <FontAwesomeIcon name="pause" color="gray" size={buttonSize} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={player.play} style={playerStyles.button}>
            <FontAwesomeIcon name="play" color="gray" size={buttonSize} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={player.next} style={playerStyles.button}>
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

export default PlayerTab;
