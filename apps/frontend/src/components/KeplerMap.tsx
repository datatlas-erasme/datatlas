import React from 'react';
import KeplerGl from 'kepler.gl';
import { AutoSizer } from 'react-virtualized';
import { theme } from '../style/theme';
import { ProjectInterface } from '@datatlas/models';

interface KeplerMapProps {
  id: ProjectInterface['id'];
}

const KeplerMap = ({ id }: KeplerMapProps) => (
  <AutoSizer>
    {({ height, width }) => (
      <KeplerGl
        id={id}
        width={width}
        height={height}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''}
        theme={theme}
        appName={process.env.REACT_APP_NAME || 'Datatlas'}
        mint={false}
      />
    )}
  </AutoSizer>
);

export default KeplerMap;
