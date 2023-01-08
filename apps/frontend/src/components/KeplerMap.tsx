import React from 'react';
import KeplerGl from 'kepler.gl';

const KeplerMap = () => (
  <KeplerGl mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN || ''} />
);

export default KeplerMap;
