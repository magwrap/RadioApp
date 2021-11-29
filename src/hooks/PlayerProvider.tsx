import {Station} from 'radio-browser-api';
import React, {createContext, useContext, useState} from 'react';
import useCreatePlayer from './useCreatePlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlayerProviderProps {}

const PlayerContext = createContext<{
  player: any;
  station: Station | null;
  playStationNow: (station: Station) => void;
  getStation: () => void;
}>({
  player: {},
  station: null,
  playStationNow: () => {},
  getStation: () => {},
});
export const usePlayerContext = () => useContext(PlayerContext);

const PlayerProvider: React.FC<PlayerProviderProps> = ({children}) => {
  const [station, setStation] = useState<Station | null>(null);
  let player = useCreatePlayer();

  // eslint-disable-next-line no-shadow
  const playStationNow = (station: Station) => {
    console.log('player status: ', player.status);
    if (player.status !== 'loading') {
      //TODO: player nie wlaczy sie za pierwszym odtworzeniem bo nie moze byc loaded skoro nie byl puszczony
      console.log('PLAYING NOW');
      //TODO: to rozwiazanie kaze czekac uzytkownikowi az zaladuje sie wybrana stacja i wtedy bedzie mogl dopiero zmienic
      player.release();
      player.playStationNow(station);
      setStation(station);
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
      await AsyncStorage.setItem('@station', jsonStation);
    } catch (e) {
      console.error(e);
    }
  };

  const getStation = async () => {
    try {
      const jsonStation = await AsyncStorage.getItem('@station');
      console.log('jsonStation: ', jsonStation);
      setStation(jsonStation != null ? JSON.parse(jsonStation) : null);
      player.release();
      player.playStationNow(
        jsonStation != null ? JSON.parse(jsonStation) : null,
      );
      if (!player.isPlaying()) {
        player.initialize();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PlayerContext.Provider
      value={{player, station, playStationNow, getStation}}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
