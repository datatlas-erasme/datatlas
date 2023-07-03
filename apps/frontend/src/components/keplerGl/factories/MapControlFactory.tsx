/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Filter } from 'kepler.gl';
import { Layer } from 'kepler.gl/src';
import { MapControlFactory as KeplerMapControlFactory } from 'kepler.gl/components';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo';
import { setFilter, layerConfigChange } from 'kepler.gl/dist/actions/vis-state-actions';
import { KeplerGLProps } from './KeplerGlFactory';
import { MapMenu } from '../../map-menu';
import { RootState } from '../../../store/reducers';
import { useForward } from '../../../hooks/useForward';
import { selectFilters, selectFiltersConfig } from '../../../store/selectors';
import { FiltersConfigInterface } from '@datatlas/models';

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
`;

const LegendLogo = <KeplerGlLogo version={false} appName={process.env.REACT_APP_NAME || 'Datatlas'} />;

interface MapControlProps extends KeplerGLProps {
  actionComponents: Component[];
  isSplit: boolean;
  top: number;
  mapIndex: number;
  logoComponent: typeof LegendLogo;
}

function MapControlFactory() {
  const DEFAULT_ACTIONS = [];

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
      <StyledMapControl className="map-control" top={top}>
        <MapMenu
          datasets={datasets}
          filtersConfig={filtersConfig}
          filters={filters}
          layers={layers}
          setFilter={(idx: number, prop: string, value: any) => forward(setFilter(idx, prop, value))}
          layerConfigChange={(oldLayer: Layer, newConfig: Partial<Layer>) =>
            forward(layerConfigChange(oldLayer, newConfig))
          }
        />
        {actionComponents.map((ActionComponent, index) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ActionComponent
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
    );
  };
}

MapControlFactory.deps = KeplerMapControlFactory.deps;

export function replaceMapControl() {
  return [KeplerMapControlFactory, MapControlFactory];
}
