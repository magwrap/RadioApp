import React from 'react';
import AuthProvider from './src/hooks/AuthProvider';
import PlayerProvider from './src/hooks/PlayerProvider';
import RadioStateProvider from './src/hooks/RadioStateProvider';
import Routes from './src/navigation/Routes';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <RadioStateProvider>
          <Routes />
        </RadioStateProvider>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;

//TODO: dodac w przyszlosci(jesli ci sie bedzie chcialo)
//viewRadioStationScreen - naciskasz na logo radia i ci wyswietla jego dane
//dodawanie piosenek/stacji do kolejki - na koncu kolejki na poczatku kolejki
//wlaczanie innej stacji/piosenki podczas gdy jedna sie laduje --> bez efektu dwóch stacji lecacych na raz
