import React, { useEffect } from 'react';
import { AutoSizer } from 'react-virtualized';
import { theme } from '../style/theme';
import { KeplerGl } from './keplerGl';
import { messages } from '../i18n/messages';
import { useForward } from '../hooks/useForward';
import { updateReadState } from '../store/reducers/keplerGl';

interface KeplerMapProps {
  id: string;
  readOnly: boolean;
}

const KeplerMap = ({ id, readOnly }: KeplerMapProps) => {
  const forward = useForward();

  useEffect(() => {
    forward(updateReadState(readOnly));
  }, [readOnly, forward]);

  return (
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
          readOnly={readOnly}
        />
      )}
    </AutoSizer>
  );
};

export default KeplerMap;
