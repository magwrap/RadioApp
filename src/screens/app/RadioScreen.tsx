import {RadioBrowserApi, Station} from 'radio-browser-api';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {usePlayerContext} from '../../hooks/PlayerProvider';

interface RadioScreenProps {}

const RadioScreen: React.FC<RadioScreenProps> = ({}) => {
  const [stations, setStations] = useState<Station[]>();
  const [stationFilter, setStationFilter] = useState('disco'); // TODO: zmienic na all

  const {playNow} = usePlayerContext();
  const musicIcon = require('../../images/Music-icon-lg.png');

  const play = (station: Station) => {
    try {
      // SoundPlayer.playSoundFile('ns_wip', 'mp3');
      console.log('RadioScreen: ', station.name, ': ', station.urlResolved);
      playNow(station);
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };
  // const stop = () => {
  //   //costam zeby stop
  // };

  useEffect(() => {
    setupApi(stationFilter).then(data => {
      if (data) {
        setStations(data);
      }
    });
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   console.log('Connection type', state.type);
    //   console.log('Is connected?', state.isConnected);
    // });
  }, [stationFilter]);

  const setupApi = async (stationFiltr: string) => {
    const api = new RadioBrowserApi('My Radio App');

    // eslint-disable-next-line no-shadow
    const stations = await api.searchStations({
      language: 'polish',
      tag: stationFiltr,
      limit: 30,
    });

    return stations;
  };
  const filters = [
    'all',
    'classical',
    'country',
    'dance',
    'disco',
    'house',
    'jazz',
    'pop',
    'rap',
    'retro',
    'rock',
  ];

  return (
    <View>
      <Text style={styles.text}>Radio Screen</Text>
      {filters.map((filter, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setStationFilter(filter)}
          style={[
            stationFilter === filter
              ? styles.selectedStation
              : styles.normalStation,
            styles.station,
          ]}>
          <Text>{filter}</Text>
        </TouchableOpacity>
      ))}

      <ScrollView>
        {stations ? (
          stations.map((station, i) => (
            //TODO: dodac jakis placeholder jesli stacja nie ma ikony np. station.favicon ? "costam ": "costam"
            <View key={i}>
              <View>
                <Text>{station.name}</Text>
                {station.favicon ? (
                  <Image
                    source={{uri: station.favicon}}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={styles.imageSize}
                  />
                ) : (
                  <Image
                    source={musicIcon}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={styles.imageSize}
                  />
                )}
              </View>
              <Button title="play" onPress={() => play(station)} />
            </View>
          ))
        ) : (
          <Text>No Stations Found</Text>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  selectedStation: {
    backgroundColor: 'red',
  },
  normalStation: {
    backgroundColor: 'green',
  },
  station: {
    width: 100,
  },
  stations: {},
  imageSize: {width: 50, height: 50},
});

export default RadioScreen;
