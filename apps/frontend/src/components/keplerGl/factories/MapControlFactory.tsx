import React, { Component } from 'react';
import styled from 'styled-components';
import { MapControlFactory as KeplerMapControlFactory } from 'kepler.gl/components';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo';
import { KeplerGLBasicProps } from './KeplerGlFactory';
import { PublishButton } from '../../buttons/PublishButton';

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

interface MapControlProps extends KeplerGLBasicProps {
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
    ...props
  }: MapControlProps) => {
    return (
      <StyledMapControl className="map-control" top={top}>
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
