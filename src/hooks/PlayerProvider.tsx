import {Station} from 'radio-browser-api';
import React, {createContext, useContext, useState} from 'react';
import useCreatePlayer from './useCreatePlayer';

interface PlayerProviderProps {}

const PlayerContext = createContext<{
  player: any;
  playNow: (station: Station) => void;
  station: Station | null;
}>({
  player: {},
  playNow: () => {},
  station: null,
});
export const usePlayerContext = () => useContext(PlayerContext);

const PlayerProvider: React.FC<PlayerProviderProps> = ({children}) => {
  const [station, setStation] = useState<Station | null>(null);
  let player = useCreatePlayer();

  // eslint-disable-next-line no-shadow
  const playNow = (station: Station) => {
    player.playSoundNow(station);
    setStation(station);
    if (!player.isPlaying()) {
      player.initialize();
    }
  };

  return (
    <PlayerContext.Provider value={{player, playNow, station}}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
