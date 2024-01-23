import React, { useEffect } from 'react';
import { AutoSizer } from 'react-virtualized';
import { LoadingProjectInterface, Project } from '@datatlas/models';
import { GetUserDto } from '@datatlas/dtos';
import { theme } from '../style/theme';
import { KeplerGl } from './keplerGl';
import { messages } from '../i18n/messages';
import { useForward } from '../hooks';
import { updateReadState } from '../store/reducers/keplerGl';

interface KeplerMapProps {
  id: string;
  project?: LoadingProjectInterface;
  user?: GetUserDto;
}

const KeplerMap = ({ id, project, user }: KeplerMapProps) => {
  const forward = useForward();
  useEffect(() => {
    forward(updateReadState(!Project.canBeEditedBy(project, user)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

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
        />
      )}
    </AutoSizer>
  );
};

export default KeplerMap;
