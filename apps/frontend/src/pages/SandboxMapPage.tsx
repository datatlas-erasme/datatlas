import React from 'react';
import { KeplerGl } from 'kepler.gl';
import { AutoSizer } from 'react-virtualized';

export const SandboxMapPage = () => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <KeplerGl
          width={width}
          height={height}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''}
        />
      )}
    </AutoSizer>
  );
};
