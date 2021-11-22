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
import SoundPlayer from 'react-native-sound-player';

interface RadioScreenProps {}

const RadioScreen: React.FC<RadioScreenProps> = ({}) => {
  const [stations, setStations] = useState<Station[]>();
  const [stationFilter, setStationFilter] = useState('all');

  useEffect(() => {
    setupApi(stationFilter).then(data => {
      if (data) {
        setStations(data);
      }
    });
  }, [stationFilter]);

  const setupApi = async (stationFil: string) => {
    const api = new RadioBrowserApi('My Radio App');

    const stations = await api.searchStations({
      language: 'polish',
      tag: stationFil,
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

  const play = (url: string) => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile('ns_wip', 'mp3');
      // or play from url
      // SoundPlayer.playUrl(url);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };
  const stop = () => {
    SoundPlayer.stop();
  };
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
        {stations &&
          stations.map((station, i) => (
            <View key={i}>
              <View>
                <Text>{station.name}</Text>
                {station.favicon ? (
                  <Image
                    source={{uri: station.favicon}}
                    style={{width: 50, height: 50}}
                  />
                ) : (
                  <Text>No Photo</Text>
                )}
              </View>
              <Button title="play" onPress={() => play(station.urlResolved)} />
              <Button title="stop" onPress={() => stop()} />
            </View>
          ))}
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
});

export default RadioScreen;
