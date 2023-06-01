import React, { Component } from 'react';
import styled from 'styled-components';
import { MapControlFactory as KeplerMapControlFactory } from 'kepler.gl/components';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo';
import { KeplerGLProps } from './KeplerGlFactory';
import { PublishButton } from '../../buttons/PublishButton';
import { Menu } from '../../Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useParams } from 'react-router-dom';

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
    PublishButton,
    SplitMapButton,
    LayerSelectorPanel,
    Toggle3dButton,
    MapLegendPanel,
    MapDrawPanel,
    LocalePanel,
  ];

  return ({
    actionComponents = DEFAULT_ACTIONS,
    isSplit = false,
    top = 0,
    mapIndex = 0,
    logoComponent = LegendLogo,
    datasets,
    ...props
  }: MapControlProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { id } = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const filtersConfig = useSelector<RootState>((state) => state.keplerGl[id].visState.interactionConfig.filters);
    // console.log('datasets', datasets);
    // console.log('props', props);
    // console.log('filtersConfig', filtersConfig);
    return (
      <StyledMapControl className="map-control" top={top}>
        <Menu datasets={datasets} filtersConfig={filtersConfig} />
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
