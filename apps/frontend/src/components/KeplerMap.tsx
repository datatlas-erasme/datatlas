import React from 'react';
import KeplerGl from 'kepler.gl';
import { AutoSizer } from 'react-virtualized';
import { datatlasTheme } from '../style/customTheme';

const KeplerMap = () => (
  <AutoSizer>
    {({ height, width }) => (
      <KeplerGl
        width={width}
        height={height}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''}
        theme={datatlasTheme}
      />
    )}
  </AutoSizer>
);

export default KeplerMap;
