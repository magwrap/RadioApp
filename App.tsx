import React from 'react';
import AuthProvider from './src/hooks/AuthProvider';
import PlayerProvider from './src/hooks/PlayerProvider';
import Routes from './src/navigation/Routes';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Routes />
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
