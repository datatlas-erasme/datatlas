/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any */
import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {AppLogo as KeplerGlLogo} from '@kepler.gl/components';

// factories
import {
  MapControlFactory as KeplerMapControlFactory,
  MapControlProps,
  SplitMapButtonFactory,
  Toggle3dButtonFactory
} from '@kepler.gl/components';

import {setFilter, layerConfigChange} from '@kepler.gl/actions';
import {useParams} from 'react-router-dom';
import {MapMenu} from '../../map-menu';
import {SampleMapPanel} from './map-control-panel/SampleMapPanel';
import {useAppSelector} from '../../../store/reducers';
import {useForward} from '../../../hooks';
import {selectFilters, selectFiltersConfig} from '../../../store/selectors';
import {PublishButton} from '../../buttons/PublishButton';
import {darkTheme} from '../../../style/theme';

const StyledMapControl = styled.div<Pick<MapControlProps, 'top'>>`
  right: 0;
  padding: ${props => props.theme.mapControl.padding}px;
  z-index: 10;
  margin-top: ${props => props.top || 0}px;
  position: absolute;
  display: grid;
  row-gap: 8px;
  justify-items: end;
  pointer-events: none; /* prevent padding from blocking input */
  & > * {
    /* all children should allow input */
    pointer-events: all;
  }
  overflow-y: scroll;
  scrollbar-gutter: auto;
  ${({theme}) => theme.mapMenuScrollBar}
  max-height: 100%;
`;

const LegendLogo = (
  <KeplerGlLogo version={false} appName={process.env.REACT_APP_NAME || 'Datatlas'} />
);

MapControlFactory.deps = KeplerMapControlFactory.deps;

function MapControlFactory(
  SplitMapButton: ReturnType<typeof SplitMapButtonFactory>,
  Toggle3dButton: ReturnType<typeof Toggle3dButtonFactory>
) {
  const DEFAULT_ACTIONS = [Toggle3dButton, PublishButton];

  const MapControl: React.FC<MapControlProps> = React.memo(
    ({actionComponents = DEFAULT_ACTIONS, ...props}) => {
      const {id} = useParams();

      if (!id) {
        return null;
      }

      const forward = useForward();
      const filters = useAppSelector(state => selectFilters(state, id));
      const filtersConfig = useAppSelector(state => selectFiltersConfig(state, id));

      // `MapMenu` and `SampleMapPanel` mightn't be transformed as `ActionComponent` but could be further isolated nonetheless.
      return (
        <ThemeProvider theme={darkTheme}>
          <StyledMapControl className="map-control" top={props.top} role="menubar">
            <MapMenu
              role="toolbar"
              datasets={props.datasets}
              filtersConfig={filtersConfig}
              filters={filters}
              layers={props.layers}
              setFilter={(idx: number, prop: string, value: any) =>
                forward(setFilter(idx, prop, value))
              }
              layerConfigChange={(oldLayer, newConfig) =>
                forward(layerConfigChange(oldLayer, newConfig))
              }
            />
            <SampleMapPanel />
            {actionComponents.map((ActionComponent, index) => (
              <ActionComponent
                role="toolbar"
                key={index}
                className="map-control-action"
                {...props}
              />
            ))}
          </StyledMapControl>
        </ThemeProvider>
      );
    }
  );

  MapControl.defaultProps = {
    isSplit: false,
    top: 0,
    mapIndex: 0,
    logoComponent: LegendLogo,
    actionComponents: DEFAULT_ACTIONS
  };

  MapControl.displayName = 'MapControl';

  return MapControl;
}

export function replaceMapControl() {
  return [KeplerMapControlFactory, MapControlFactory];
}
