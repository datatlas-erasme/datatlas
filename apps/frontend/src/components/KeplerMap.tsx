import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { theme } from '../style/theme';
import { KeplerGl } from './keplerGl';
import { messages } from '../i18n/messages';

interface KeplerMapProps {
  id: string;
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
        localeMessages={messages}
      />
    )}
  </AutoSizer>
);

export default KeplerMap;
