import React from 'react';
import KeplerMap from './components/KeplerMap';

function App() {
  return (
    <div className="App" style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <React.StrictMode />
      <KeplerMap />
    </div>
  );
}

export default App;
