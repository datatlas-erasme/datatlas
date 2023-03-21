import React, { CSSProperties, UIEventHandler } from 'react';
import { Layer } from 'kepler.gl';
import { LayerPanelFactory as KeplerLayerPanelFactory } from 'kepler.gl/components';
import { PanelWrapper } from '../side-panel/layer/LayerPanel';
import { Datasets } from 'kepler.gl';
import { visStateActions } from 'kepler.gl/actions';
import { LayerTypeOptionInterface } from '../types/LayerTypeOptionInterface';

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
}

export const LayerPanelFactory = (KeplerLayerConfigurator, KeplerLayerPanelHeader) => {
  return ({
    layer,
    datasets,
    idx,
    layerConfigChange,
    layerTypeChange,
    openModal,
    removeLayer,
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
      removeLayer(idx);
    };

    const _duplicateLayer = (e) => {
      e.stopPropagation();
      duplicateLayer(idx);
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
          labelRCGColorValues={config.dataId ? datasets[config.dataId].color : null}
          layerType={layer.type}
          onToggleEnableConfig={_toggleEnableConfig}
          onToggleVisibility={_toggleVisibility}
          onUpdateLayerLabel={_updateLayerLabel}
          onRemoveLayer={_removeLayer}
          onDuplicateLayer={_duplicateLayer}
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
