import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Station} from 'radio-browser-api';
import {usePlayerContext} from '../../../hooks/PlayerProvider';
import {stationStyles} from '../../../styles/Radio/StationsStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextTicker from 'react-native-text-ticker';

interface RenderStationProps {
  station: Station;
}

const RenderStation: React.FC<RenderStationProps> = ({station}) => {
  const {playStationNow} = usePlayerContext();
  const musicIcon = require('../../../images/Music-icon-lg.png');

  const play = (station: Station) => {
    try {
      console.log('RadioScreen: ', station.name, ': ', station.urlResolved);
      playStationNow(station);
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  return (
    <View style={stationStyles.station}>
      <View style={stationStyles.stationContent}>
        <View style={stationStyles.stationLeft}>
          {station.favicon ? (
            <Image source={{uri: station.favicon}} style={styles.imageSize} />
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
                marqueeDelay={1000}>
                {station.name}
              </TextTicker>
            </View>

            <Text style={stationStyles.stationInfo}>{station.country}</Text>
            <Text style={stationStyles.stationInfo}>{station.state}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => play(station)}>
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
});

export default RenderStation;
