import React, { CSSProperties, UIEventHandler } from 'react';
import { Datasets, Layer } from 'kepler.gl';
import { LayerPanelFactory as KeplerLayerPanelFactory } from 'kepler.gl/components';
import { visStateActions } from 'kepler.gl/actions';
import { PanelWrapper } from '../side-panel/layer/LayerPanel';
import { LayerTypeOptionInterface, PanelComponentPropsInterface } from '../types';

export interface KeplerLayerPanelPropsInterface {
  layer: Layer;
  datasets: Datasets;
  idx: number;
  layerConfigChange: visStateActions.layerConfigChange;
  layerTypeChange: visStateActions.layerTypeChange;
  openModal: UIEventHandler;
  removeLayer: visStateActions.removeLayer;
  duplicateLayer: visStateActions.duplicateLayer;
  onCloseConfig: UIEventHandler;
  layerTextLabelChange: visStateActions.layerTextLabelChange;
  layerTypeOptions: LayerTypeOptionInterface[];
  layerVisConfigChange: visStateActions.layerVisConfigChange;
  layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange;
  layerColorUIChange: visStateActions.layerColorUIChange;
  setLayerAnimationTime: UIEventHandler;
  updateLayerAnimationSpeed: UIEventHandler;
  style: CSSProperties;
  className: string;
  onMouseDown: UIEventHandler;
  onTouchStart: UIEventHandler;
  showDatasetTable: PanelComponentPropsInterface['showDatasetTable'];
  removeDataset: PanelComponentPropsInterface['removeDataset'];
}

export const LayerPanelFactory = (KeplerLayerConfigurator, KeplerLayerPanelHeader) => {
  return ({
    layer,
    datasets,
    idx,
    layerConfigChange,
    layerTypeChange,
    openModal,
    duplicateLayer,
    layerTextLabelChange,
    layerTypeOptions,
    layerVisConfigChange,
    layerVisualChannelConfigChange,
    layerColorUIChange,
    style,
    className,
    onMouseDown,
    onTouchStart,
    showDatasetTable,
    removeDataset,
  }: KeplerLayerPanelPropsInterface) => {
    const updateLayerConfig = (newProp) => {
      layerConfigChange(layer, newProp);
    };

    const updateLayerType = (newType) => {
      layerTypeChange(layer, newType);
    };

    const updateLayerVisConfig = (newVisConfig) => {
      layerVisConfigChange(layer, newVisConfig);
    };

    const updateLayerColorUI = (...args) => {
      layerColorUIChange(layer, ...args);
    };

    const updateLayerTextLabel = (...args) => {
      layerTextLabelChange(layer, ...args);
    };

    const updateLayerVisualChannelConfig = (newConfig, channel, scaleKey) => {
      layerVisualChannelConfigChange(layer, newConfig, channel, scaleKey);
    };

    const _updateLayerLabel = ({ target: { value } }) => {
      updateLayerConfig({ label: value });
    };

    const _toggleVisibility = (e) => {
      e.stopPropagation();
      const isVisible = !layer.config.isVisible;
      updateLayerConfig({ isVisible });
    };

    const _toggleEnableConfig = (e) => {
      e.stopPropagation();
      const {
        config: { isConfigActive },
      } = layer;
      updateLayerConfig({ isConfigActive: !isConfigActive });
    };

    const _removeLayer = (e) => {
      e.stopPropagation();
      // We might want to remove layer as well.
      // removeLayer(idx);
      removeDataset(layer.config.dataId);
    };

    const _duplicateLayer = (e) => {
      e.stopPropagation();
      duplicateLayer(idx);
    };

    const _showDatasetTable = (e) => {
      e.stopPropagation();
      showDatasetTable(layer.config.dataId);
    };

    const { config } = layer;
    const { isConfigActive } = config;

    return (
      <PanelWrapper
        active={isConfigActive}
        className={`layer-panel ${className}`}
        style={style}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <KeplerLayerPanelHeader
          isConfigActive={isConfigActive}
          layerId={layer.id}
          isVisible={config.isVisible}
          label={config.label}
          labelRCGColorValues={config.color}
          layerType={layer.type}
          onToggleEnableConfig={_toggleEnableConfig}
          onToggleVisibility={_toggleVisibility}
          onUpdateLayerLabel={_updateLayerLabel}
          onRemoveLayer={_removeLayer}
          onDuplicateLayer={_duplicateLayer}
          showDatasetTable={_showDatasetTable}
          showRemoveLayer={true}
          isDragNDropEnabled={true}
        />
        {isConfigActive && (
          <KeplerLayerConfigurator
            layer={layer}
            datasets={datasets}
            layerTypeOptions={layerTypeOptions}
            openModal={openModal}
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
};

LayerPanelFactory.deps = KeplerLayerPanelFactory.deps;

export function replaceLayerPanel() {
  return [KeplerLayerPanelFactory, LayerPanelFactory];
}
