import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { KeplerGl } from './KeplerGl';

const KeplerMap = () => (
  <AutoSizer>
    {({ height, width }) => (
      <KeplerGl width={width} height={height} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''} />
    )}
  </AutoSizer>
);

export default KeplerMap;
