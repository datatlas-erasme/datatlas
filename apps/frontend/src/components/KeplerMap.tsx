import React from 'react';
import { AutoSizer } from 'react-virtualized';
import { theme } from '../style/theme';
import { ProjectInterface } from '@datatlas/models';
import { KeplerGl } from './keplerGl';
import { messages } from '../i18n/kepler';
import { IntlProvider } from 'react-intl';
import { selectLocale } from '../store/selectors';
import { useSelector } from 'react-redux';

interface KeplerMapProps {
  id: ProjectInterface['id'];
}

const KeplerMap = ({ id }: KeplerMapProps) => {
  const locale = useSelector(selectLocale);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <IntlProvider locale={locale} messages={messages[locale]}>
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
        </IntlProvider>
      )}
    </AutoSizer>
  );
};

export default KeplerMap;
