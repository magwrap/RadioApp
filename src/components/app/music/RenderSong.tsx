import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Song, usePlayerContext} from '../../../hooks/PlayerProvider';
import {stationStyles} from '../../../styles/Radio/StationsStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextTicker from 'react-native-text-ticker';

interface RenderSongProps {
  song: Song;
}

const RenderSong: React.FC<RenderSongProps> = ({song}) => {
  const {playSongNow} = usePlayerContext();
  const musicIcon = require('../../../images/Music-icon-lg.png');

  // eslint-disable-next-line no-shadow
  const play = (song: Song) => {
    try {
      console.log('MusicScreen: ', song.title, ': ', song.songUrl);
      playSongNow(song);
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  return (
    <View style={stationStyles.station}>
      <View style={stationStyles.stationContent}>
        <View style={stationStyles.stationLeft}>
          {song.imageUrl ? (
            <Image source={{uri: song.imageUrl}} style={styles.imageSize} />
          ) : (
            <Image source={musicIcon} style={styles.imageSize} />
          )}
          <View style={stationStyles.stationTexts}>
            <View style={stationStyles.tickerWidth}>
              <TextTicker
                style={stationStyles.stationName}
                duration={10000}
                loop
                repeatSpacer={50}
                marqueeDelay={1000}
                marqueeOnMount={true}
                isInteraction={false}>
                {song.title}
              </TextTicker>
            </View>
            {/* <View style={styles.row}>
              <Text style={stationStyles.stationInfo}>{station.country}</Text>
              <Text style={stationStyles.stationInfo}> - {station.state}</Text>
            </View>
            <View style={styles.row}>
              <Text style={stationStyles.stationInfo}>
                bitrate: {station.bitrate}{' '}
              </Text>
              <Text style={stationStyles.stationInfo}>
                votes: {station.votes}
              </Text>
            </View> */}
          </View>
        </View>
        <TouchableOpacity onPress={() => play(song)}>
          <AntDesign size={50} color="green" name="play" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  imageSize: {width: 50, height: 50},
  row: {flexDirection: 'row'},
});

export default RenderSong;
