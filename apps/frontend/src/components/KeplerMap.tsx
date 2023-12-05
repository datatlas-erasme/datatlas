import React, { RefObject, useContext, useEffect } from 'react';
import { theme } from '../style/theme';
import { KeplerGl } from './keplerGl';
import { messages } from '../i18n/messages';
import { useForward, useMapAutoSizer } from '../hooks';
import { MapControlRefContext } from './context/MapControlRefContext';
import { updateReadState } from '../store/reducers/keplerGl';

interface KeplerMapProps {
  id: string;
  readOnly: boolean;
  mapContainerRef: RefObject<HTMLDivElement | undefined>;
}

const KeplerMap = ({ id, readOnly, mapContainerRef }: KeplerMapProps) => {
  const forward = useForward();

  useEffect(() => {
    forward(updateReadState(readOnly));
  }, [readOnly, forward]);

  const mapControlRef = useContext(MapControlRefContext);
  const dimensions = useMapAutoSizer<HTMLDivElement>(mapContainerRef, mapControlRef);

  return (
    <KeplerGl
      id={id}
      {...dimensions}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''}
      theme={theme}
      appName={process.env.REACT_APP_NAME || 'Datatlas'}
      mint={false}
      localeMessages={messages}
      readOnly={readOnly}
    />
  );
};

export default KeplerMap;
