import React from 'react';
import AuthProvider from './src/hooks/AuthProvider';
import Routes from './src/navigation/Routes';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
