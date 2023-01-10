import React from 'react';
import KeplerGl from 'kepler.gl';
import { AutoSizer } from 'react-virtualized';

const KeplerMap = () => (
  <AutoSizer>
    {({ height, width }) => (
      <KeplerGl width={width} height={height} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''} />
    )}
  </AutoSizer>
);

export default KeplerMap;
