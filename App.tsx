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
