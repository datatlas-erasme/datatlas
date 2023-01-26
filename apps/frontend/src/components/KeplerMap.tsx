import React from 'react';
import KeplerGl from 'kepler.gl';
import { AutoSizer } from 'react-virtualized';
import { theme } from '../style/theme';

const KeplerMap = () => (
  <AutoSizer>
    {({ height, width }) => (
      <KeplerGl
        width={width}
        height={height}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''}
        theme={theme}
      />
    )}
  </AutoSizer>
);

export default KeplerMap;
