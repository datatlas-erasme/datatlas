import React, {ChangeEventHandler, MouseEventHandler} from 'react';
import styled from 'styled-components';

import {
  LayerConfiguratorFactory,
  LayerPanelFactory as KeplerLayerPanelFactory
} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
import {dataTestIds} from '@kepler.gl/constants';
import {ColorUI, LayerVisConfig, NestedPartial} from '@kepler.gl/types';
import {LayerBaseConfig} from '@kepler.gl/layers';
import {layerSetIsValid} from '@kepler.gl/actions';
import {LayerPanelProps} from '../types';
import {LayerPanelHeaderFactory} from './LayerPanelHeaderFactory';

const PanelWrapper = styled.div<{active: boolean}>`
  font-size: 12px;
  border-radius: 1px;
  z-index: 1000;
  &.dragging {
    cursor: move;
  }
`;

LayerPanelFactory.deps = KeplerLayerPanelFactory.deps;

function LayerPanelFactory(
  LayerConfigurator: ReturnType<typeof LayerConfiguratorFactory>,
  LayerPanelHeader: ReturnType<typeof LayerPanelHeaderFactory>
): React.ComponentType<LayerPanelProps> {
  return (props: LayerPanelProps) => {
    const updateLayerConfig = newProp => {
      props.layerConfigChange(props.layer, newProp);
    };

    const updateLayerType = (newType: string) => {
      props.layerTypeChange(props.layer, newType);
    };

    const updateLayerVisConfig = (newVisConfig: Partial<LayerVisConfig>) => {
      props.layerVisConfigChange(props.layer, newVisConfig);
    };

    const updateLayerColorUI = (...args: [string, NestedPartial<ColorUI>]) => {
      props.layerColorUIChange(props.layer, ...args);
    };

    const updateLayerTextLabel = (...args: [number | 'all', string, any]) => {
      props.layerTextLabelChange(props.layer, ...args);
    };

    const updateLayerVisualChannelConfig = (
      newConfig: Partial<LayerBaseConfig>,
      channel: string
    ) => {
      props.layerVisualChannelConfigChange(props.layer, newConfig, channel);
    };

    const _updateLayerLabel: ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
      updateLayerConfig({label: value});
    };

    const _toggleVisibility: MouseEventHandler = e => {
      e?.stopPropagation();
      const isVisible = !layer.config.isVisible;
      updateLayerConfig({isVisible});
    };

    const _resetIsValid: MouseEventHandler = e => {
      e?.stopPropagation();
      // Make the layer valid and visible again after an error
      layerSetIsValid(layer, true);
    };

    const _toggleEnableConfig = e => {
      e?.stopPropagation();
      const {
        config: {isConfigActive}
      } = layer;
      updateLayerConfig({isConfigActive: !isConfigActive});
    };

    const _removeLayer = e => {
      e?.stopPropagation();
      // We might want to remove layer as well.
      props.removeLayer(layer.id);
      props.removeDataset(layer.config.dataId);
    };

    const _duplicateLayer = e => {
      e?.stopPropagation();
      props.duplicateLayer(layer.id);
    };

    const _showDatasetTable = e => {
      e?.stopPropagation();
      props.showDatasetTable(layer.config.dataId);
    };

    const {layer, datasets, isDraggable, layerTypeOptions, listeners} = props;
    const {config, isValid} = layer;
    const {isConfigActive} = config;
    const allowDuplicate = typeof layer.isValidToSave === 'function' && layer.isValidToSave();

    return (
      <PanelWrapper
        active={isConfigActive}
        className={`layer-panel ${props.className}`}
        data-testid={dataTestIds.layerPanel}
        style={props.style}
        onMouseDown={props.onMouseDown}
        onTouchStart={props.onTouchStart}
      >
        <LayerPanelHeader
          isConfigActive={isConfigActive}
          layerId={layer.id}
          isVisible={config.isVisible}
          isValid={isValid}
          label={config.label}
          labelRCGColorValues={config.dataId ? datasets[config.dataId].color : null}
          layerType={layer.type}
          allowDuplicate={allowDuplicate}
          onToggleEnableConfig={_toggleEnableConfig}
          onToggleVisibility={_toggleVisibility}
          onResetIsValid={_resetIsValid}
          onUpdateLayerLabel={_updateLayerLabel}
          onRemoveLayer={_removeLayer}
          onDuplicateLayer={_duplicateLayer}
          showDatasetTable={_showDatasetTable}
          showRemoveLayer={true}
          isDragNDropEnabled={isDraggable}
          listeners={listeners}
        />
        {isConfigActive && (
          <LayerConfigurator
            layer={layer}
            datasets={datasets}
            layerTypeOptions={layerTypeOptions}
            openModal={props.openModal}
            updateLayerColorUI={updateLayerColorUI}
            updateLayerConfig={updateLayerConfig}
            updateLayerVisualChannelConfig={updateLayerVisualChannelConfig}
            updateLayerType={updateLayerType}
            updateLayerTextLabel={updateLayerTextLabel}
            updateLayerVisConfig={updateLayerVisConfig}
          />
        )}
      </PanelWrapper>
    );
  };
}

export function replaceLayerPanel(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerLayerPanelFactory, LayerPanelFactory];
}
