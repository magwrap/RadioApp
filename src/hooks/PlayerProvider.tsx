import {Station} from 'radio-browser-api';
import React, {createContext, useContext, useState} from 'react';
import useCreatePlayer from './useCreatePlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlayerProviderProps {}

export type Song = {
  songUrl: string;
  imageUrl: string;
  mediaId: string;
  title: string;
};

type StationRepresentation = {
  name: string;
  favicon: string;
  url: string;
};

const PlayerContext = createContext<{
  player: any;
  station: StationRepresentation | null;
  currentStation: Station | null;
  currentSong: Song | null;
  playSongNow: (song: Song) => void;
  playStationNow: (station: Station) => void;
  getStationOrSong: () => void;
}>({
  player: {},
  station: null,
  currentStation: null,
  currentSong: null,
  playSongNow: () => {},
  playStationNow: () => {},
  getStationOrSong: () => {},
});
export const usePlayerContext = () => useContext(PlayerContext);

const PlayerProvider: React.FC<PlayerProviderProps> = ({children}) => {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [station, setStation] = useState<StationRepresentation | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  let player = useCreatePlayer();

  const playSongNow = (song: Song) => {
    console.log('player status: ', player.status);
    if (player.status !== 'loading') {
      console.log('PLAYING NOW');
      //TODO: to rozwiazanie kaze czekac uzytkownikowi az zaladuje sie wybrana stacja i wtedy bedzie mogl dopiero zmienic
      player.release();
      player.playSongNow(song);
      setStation({
        name: song.title,
        favicon: song.imageUrl,
        url: song.songUrl,
      });
      setCurrentSong(song);
      storeSong(song);
      if (!player.isPlaying()) {
        player.initialize();
      }
    }
  };

  // eslint-disable-next-line no-shadow
  const playStationNow = (station: Station) => {
    console.log('player status: ', player.status);
    if (player.status !== 'loading') {
      console.log('PLAYING NOW');
      //TODO: to rozwiazanie kaze czekac uzytkownikowi az zaladuje sie wybrana stacja i wtedy bedzie mogl dopiero zmienic
      player.release();
      player.playStationNow(station);
      setStation({
        name: station.name,
        favicon: station.favicon,
        url: station.url,
      });
      setCurrentStation(station);
      storeStation(station);
      if (!player.isPlaying()) {
        player.initialize();
      }
    }
  };
  // eslint-disable-next-line no-shadow
  const storeStation = async (station: Station) => {
    try {
      console.log('sotring...');
      const jsonStation = JSON.stringify(station);
      await AsyncStorage.setItem('@song', '');
      await AsyncStorage.setItem('@station', jsonStation);
    } catch (e) {
      console.error(e);
    }
  };

  const storeSong = async (song: Song) => {
    try {
      console.log('sotring...');
      const jsonSong = JSON.stringify(song);
      await AsyncStorage.setItem('@station', '');
      await AsyncStorage.setItem('@song', jsonSong);
    } catch (e) {
      console.error(e);
    }
  };

  const getStationOrSong = async () => {
    try {
      const jsonStation = await AsyncStorage.getItem('@station');

      if (jsonStation) {
        const stationParased =
          jsonStation != null ? JSON.parse(jsonStation) : null;
        setCurrentStation(stationParased != null ? stationParased : null);
        if (stationParased) {
          player.release();
          player.playStationNow(stationParased);
          setStation({
            name: stationParased.name,
            favicon: stationParased.favicon,
            url: stationParased.url,
          });
        }
      } else {
        const jsonSong = await AsyncStorage.getItem('@song');
        console.log('jsonSong: ', jsonSong);
        const songParased = jsonSong != null ? JSON.parse(jsonSong) : null;
        setCurrentSong(songParased != null ? songParased : null);
        if (songParased) {
          player.release();
          player.playSongNow(songParased);
          setStation({
            name: songParased.title,
            favicon: songParased.imageUrl,
            url: songParased.songUrl,
          });
        }
      }
      if (!player.isPlaying()) {
        player.initialize();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        currentStation,
        station,
        currentSong,
        playSongNow,
        playStationNow,
        getStationOrSong,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
