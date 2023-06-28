/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Filter } from 'kepler.gl';
import { MapControlFactory as KeplerMapControlFactory } from 'kepler.gl/components';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo';
import { KeplerGLProps } from './KeplerGlFactory';
import { Menu } from '../../Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useParams } from 'react-router-dom';
import { useForward } from '../../../hooks/useForward';
import { setFilter, layerConfigChange } from 'kepler.gl/dist/actions/vis-state-actions';
import { selectFilters, selectFiltersConfig } from '../../../store/selectors';
import { FiltersConfigInterface } from '@datatlas/models';
import { Layer } from 'kepler.gl/src';

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

function MapControlFactory(
  MapDrawPanel,
  Toggle3dButton,
  SplitMapButton,
  MapLegendPanel,
  LayerSelectorPanel,
  LocalePanel
) {
  const DEFAULT_ACTIONS = [
    // PublishButton,
    // SplitMapButton,
    // LayerSelectorPanel,
    // Toggle3dButton,
    // MapLegendPanel,
    // MapDrawPanel,
    // LocalePanel,
  ];

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
        <Menu
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
