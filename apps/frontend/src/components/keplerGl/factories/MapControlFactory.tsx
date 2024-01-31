/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any */
import React, { FunctionComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Filter } from 'kepler.gl';
import { Layer } from 'kepler.gl/src';
import { MapControlFactory as KeplerMapControlFactory } from 'kepler.gl/components';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo';
import { setFilter, layerConfigChange } from 'kepler.gl/dist/actions/vis-state-actions';
import { KeplerGLProps } from './KeplerGlFactory';
import { MapMenu } from '../../map-menu';
import { SampleMapPanel } from './map-control-panel/SampleMapPanel';
import { RootState } from '../../../store/reducers';
import { useForward } from '../../../hooks';
import { selectFilters, selectFiltersConfig } from '../../../store/selectors';
import { FiltersConfigInterface } from '@datatlas/models';
import { PublishButton } from '../../buttons/PublishButton';
import { darkTheme } from '../../../style/theme';

const StyledMapControl = styled.div<Pick<MapControlProps, 'theme' | 'top'>>`
  right: 0;
  padding: ${(props) => props.theme.mapControl.padding}px;
  z-index: 10;
  margin-top: ${(props) => props.top || 0}px;
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
  ${({ theme }) => theme.mapMenuScrollBar}
  max-height: 100%;
`;

const LegendLogo = <KeplerGlLogo version={false} appName={process.env.REACT_APP_NAME || 'Datatlas'} />;

interface MapControlProps extends KeplerGLProps {
  actionComponents: FunctionComponent<any>[];
  isSplit: boolean;
  top: number;
  mapIndex: number;
  logoComponent: typeof LegendLogo;
}

function MapControlFactory(_, Toggle3dButton) {
  const DEFAULT_ACTIONS = [Toggle3dButton, PublishButton];

  return ({
    actionComponents = DEFAULT_ACTIONS,
    isSplit = false,
    top = 0,
    mapIndex = 0,
    logoComponent = LegendLogo,
    datasets,
    layers,
    ...props
  }: MapControlProps) => {
    const { id } = useParams();

    if (!id) {
      return null;
    }

    const forward = useForward();
    const filters = useSelector<RootState, Filter[]>((state) => selectFilters(state, id));
    const filtersConfig = useSelector<RootState, FiltersConfigInterface>((state) => selectFiltersConfig(state, id));

    return (
      <ThemeProvider theme={darkTheme}>
        <StyledMapControl className="map-control" top={top} role="menubar">
          <MapMenu
            role="toolbar"
            datasets={datasets}
            filtersConfig={filtersConfig}
            filters={filters}
            layers={layers}
            setFilter={(idx: number, prop: string, value: any) => forward(setFilter(idx, prop, value))}
            layerConfigChange={(oldLayer: Layer, newConfig: Partial<Layer>) =>
              forward(layerConfigChange(oldLayer, newConfig))
            }
          />
          <SampleMapPanel {...props} />
          {actionComponents.map((ActionComponent, index) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <ActionComponent
              role="toolbar"
              key={index}
              className="map-control-action"
              isSplit={isSplit}
              top={top}
              mapIndex={mapIndex}
              logoComponent={LegendLogo}
              datasets={datasets}
              filters={filters}
              layers={layers}
              {...props}
            />
          ))}
        </StyledMapControl>
      </ThemeProvider>
    );
  };
}

MapControlFactory.deps = KeplerMapControlFactory.deps;

export function replaceMapControl() {
  return [KeplerMapControlFactory, MapControlFactory];
}
