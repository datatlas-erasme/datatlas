/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import { Button, SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';
import KeplerMapManagerFactory from 'kepler.gl/dist/components/side-panel/map-manager';
import MapStyleSelectorFactory from 'kepler.gl/dist/components/side-panel/map-style-panel/map-style-selector';
import LayerGroupSelectorFactory from 'kepler.gl/dist/components/side-panel/map-style-panel/map-layer-selector';

import { Add } from 'kepler.gl/dist/components/common/icons';
import ColorSelector from 'kepler.gl/dist/components/side-panel/layer-panel/color-selector';
import { createSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';

import { KeplerMapStyle } from '@datatlas/models';
import { KeplerGlActions } from '../KeplerGlFactory';

interface MapManagerProps {
  mapStyle: KeplerMapStyle;
  mapStyleActions: KeplerGlActions['mapStyleActions'];
  showAddMapStyleModal: () => void;
}

MapManagerFactory.deps = KeplerMapManagerFactory.deps;

function MapManagerFactory(
  MapStyleSelector: ReturnType<typeof MapStyleSelectorFactory>,
  LayerGroupSelector: ReturnType<typeof LayerGroupSelectorFactory>
) {
  return (props: MapManagerProps) => {
    const [isSelecting, setSelecting] = useState(false);

    const buildingColorSelector = (props: MapManagerProps) => props.mapStyle.threeDBuildingColor;
    const setColorSelector = (props: MapManagerProps) => props.mapStyleActions.set3dBuildingColor;

    const toggleSelecting = () => {
      setSelecting(!isSelecting);
    };

    const selectStyle = (val) => {
      const { mapStyleActions } = props;
      const { mapStyleChange } = mapStyleActions;
      mapStyleChange(val);
      toggleSelecting();
    };

    const { mapStyle, mapStyleActions, showAddMapStyleModal } = props;
    const intl = useIntl();
    const currentStyle = mapStyle.mapStyles[mapStyle.styleType] || {};
    const editableLayers = (currentStyle.layerGroups || []).map((lg) => lg.slug);
    const hasBuildingLayer = mapStyle.visibleLayerGroups['3d building'];
    const colorSetSelector = createSelector(buildingColorSelector, setColorSelector, (selectedColor, setColor) => [
      {
        selectedColor,
        setColor,
        isRange: false,
        label: intl.formatMessage({ id: 'mapManager.3dBuildingColor' }),
      },
    ]);

    const colorSets = colorSetSelector(props);

    return (
      <div className="map-style-panel">
        <div>
          <MapStyleSelector
            mapStyle={mapStyle}
            isSelecting={isSelecting}
            onChange={selectStyle}
            toggleActive={toggleSelecting}
          />
          {editableLayers.length ? (
            <LayerGroupSelector
              layers={mapStyle.visibleLayerGroups}
              editableLayers={editableLayers}
              topLayers={mapStyle.topLayerGroups}
              onChange={mapStyleActions.mapConfigChange}
            />
          ) : null}
          <SidePanelSection>
            <ColorSelector colorSets={colorSets} disabled={!hasBuildingLayer} />
          </SidePanelSection>
          <Button className="add-map-style-button" onClick={showAddMapStyleModal} secondary>
            <Add height="12px" />
            <FormattedMessage id={'mapManager.addMapStyle'} />
          </Button>
        </div>
      </div>
    );
  };
}

export function replaceMapManager() {
  return [KeplerMapManagerFactory, MapManagerFactory];
}
