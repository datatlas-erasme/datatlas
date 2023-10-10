import React, { Fragment, FunctionComponent, UIEventHandler } from 'react';
import { Input, LayerConfiguratorFactory as KeplerLayerConfiguratorFactory } from 'kepler.gl/components';
import { ConfigGroupCollapsibleContent } from 'kepler.gl/dist/components/side-panel/layer-panel/layer-config-group';
import { capitalizeFirstLetter } from 'kepler.gl/dist/utils/utils';
import { LAYER_TYPES } from 'kepler.gl/dist/layers/types';
import { Datasets, Layer, KeplerTable } from 'kepler.gl';
import { LayerTypeOptionInterface } from '../types/LayerTypeOptionInterface';
import { visStateActions } from 'kepler.gl/actions';
import {
  AggregationTypeSelector,
  AggrScaleSelector,
  ArcLayerColorSelector,
  HowToButton,
  LayerColorRangeSelector,
  LayerColorSelector,
  StyledLayerConfigurator,
  StyledLayerVisualConfigurator,
} from './configurator';

export const getLayerFields = (datasets: Datasets, layer: Layer) =>
  layer.config && datasets[layer.config.dataId] ? datasets[layer.config.dataId].fields : [];

export const getLayerDataset = (datasets: Datasets, layer: Layer) =>
  layer.config && datasets[layer.config.dataId] ? datasets[layer.config.dataId] : null;

export const getLayerConfiguratorProps = (
  props: Pick<LayerConfiguratorPropsInterface, 'layer' | 'datasets' | 'updateLayerConfig' | 'updateLayerColorUI'>
) => ({
  layer: props.layer,
  fields: getLayerFields(props.datasets, props.layer),
  onChange: props.updateLayerConfig,
  setColorUI: props.updateLayerColorUI,
});

export const getVisConfiguratorProps = (
  props: Pick<LayerConfiguratorPropsInterface, 'layer' | 'datasets' | 'updateLayerVisConfig' | 'updateLayerColorUI'>
) => ({
  layer: props.layer,
  fields: getLayerFields(props.datasets, props.layer),
  onChange: props.updateLayerVisConfig,
  setColorUI: props.updateLayerColorUI,
});

export const getLayerChannelConfigProps = (
  props: Pick<LayerConfiguratorPropsInterface, 'layer' | 'datasets' | 'updateLayerVisualChannelConfig'>
) => ({
  layer: props.layer,
  fields: getLayerFields(props.datasets, props.layer),
  onChange: props.updateLayerVisualChannelConfig,
});

interface LayerConfigerRendererPropsInterface {
  layer: Layer;
  dataset: KeplerTable;
  visConfiguratorProps: ReturnType<typeof getVisConfiguratorProps>;
  layerChannelConfigProps: ReturnType<typeof getLayerChannelConfigProps>;
  layerConfiguratorProps: ReturnType<typeof getLayerConfiguratorProps>;
}

interface LayerConfiguratorPropsInterface {
  layer: Layer;
  datasets: Datasets;
  layerTypeOptions: LayerTypeOptionInterface[];
  openModal: UIEventHandler;
  updateLayerConfig: visStateActions['updateLayerConfig'];
  updateLayerTextLabel: visStateActions['updateLayerTextLabel'];
  updateLayerType: visStateActions['updateLayerConfig'];
  updateLayerVisConfig: visStateActions['updateLayerVisConfig'];
  updateLayerVisualChannelConfig: visStateActions['updateLayerVisualChannelConfig'];
  updateLayerColorUI: visStateActions['updateLayerColorUI'];
}

const LayerConfiguratorFactory = (
  SourceDataSelector,
  VisConfigSlider,
  TextLabelPanel,
  LayerConfigGroup,
  ChannelByValueSelector,
  LayerColumnConfig,
  LayerTypeSelector,
  VisConfigSwitch
) => {
  const LayerConfigurator = ({
    layer,
    datasets,
    layerTypeOptions,
    openModal,
    updateLayerConfig,
    updateLayerTextLabel,
    updateLayerType,
    updateLayerVisConfig,
    updateLayerVisualChannelConfig,
    updateLayerColorUI,
  }: LayerConfiguratorPropsInterface) => {
    const _renderPointLayerConfig = (props) => {
      return _renderScatterplotLayerConfig(props);
    };

    const _renderIconLayerConfig = (props) => {
      return _renderScatterplotLayerConfig(props);
    };

    const _renderScatterplotLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerChannelConfigProps,
      layerConfiguratorProps,
    }) => {
      return (
        <StyledLayerVisualConfigurator>
          {/* Fill Color */}
          <LayerConfigGroup
            {...(layer.visConfigSettings.filled || { label: 'layer.color' })}
            {...visConfiguratorProps}
            collapsible
          >
            {layer.config.colorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} />
            ) : (
              <LayerColorSelector {...layerConfiguratorProps} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* outline color */}
          {layer.type === LAYER_TYPES.point ? (
            <LayerConfigGroup {...layer.visConfigSettings.outline} {...visConfiguratorProps} collapsible>
              {layer.config.strokeColorField ? (
                <LayerColorRangeSelector {...visConfiguratorProps} property="strokeColorRange" />
              ) : (
                <LayerColorSelector
                  {...visConfiguratorProps}
                  selectedColor={layer.config.visConfig.strokeColor}
                  property="strokeColor"
                />
              )}
              <ConfigGroupCollapsibleContent>
                <ChannelByValueSelector channel={layer.visualChannels.strokeColor} {...layerChannelConfigProps} />
                <VisConfigSlider
                  {...layer.visConfigSettings.thickness}
                  {...visConfiguratorProps}
                  disabled={!layer.config.visConfig.outline}
                />
              </ConfigGroupCollapsibleContent>
            </LayerConfigGroup>
          ) : null}

          {/* Radius */}
          <LayerConfigGroup label={'layer.radius'} collapsible>
            {!layer.config.sizeField ? (
              <VisConfigSlider
                {...layer.visConfigSettings.radius}
                {...visConfiguratorProps}
                label={false}
                disabled={Boolean(layer.config.sizeField)}
              />
            ) : (
              <VisConfigSlider
                {...layer.visConfigSettings.radiusRange}
                {...visConfiguratorProps}
                label={false}
                disabled={!layer.config.sizeField || layer.config.visConfig.fixedRadius}
              />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.size} {...layerChannelConfigProps} />
              {layer.config.sizeField ? (
                <VisConfigSwitch {...layer.visConfigSettings.fixedRadius} {...visConfiguratorProps} />
              ) : null}
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* text label */}
          <TextLabelPanel
            fields={visConfiguratorProps.fields}
            updateLayerTextLabel={updateLayerTextLabel}
            textLabel={layer.config.textLabel}
            colorPalette={visConfiguratorProps.colorPalette}
            setColorPaletteUI={visConfiguratorProps.setColorPaletteUI}
          />
        </StyledLayerVisualConfigurator>
      );
    };

    const _renderClusterLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup label={'layer.color'} collapsible>
            <LayerColorRangeSelector {...visConfiguratorProps} />
            <ConfigGroupCollapsibleContent>
              <AggrScaleSelector {...layerConfiguratorProps} channel={layer.visualChannels.color} />
              <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
              {layer.visConfigSettings.colorAggregation.condition(layer.config) ? (
                <AggregationTypeSelector
                  {...layer.visConfigSettings.colorAggregation}
                  {...layerChannelConfigProps}
                  channel={layer.visualChannels.color}
                />
              ) : null}
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Cluster Radius */}
          <LayerConfigGroup label={'layer.radius'} collapsible>
            <VisConfigSlider {...layer.visConfigSettings.clusterRadius} {...visConfiguratorProps} />
            <ConfigGroupCollapsibleContent>
              <VisConfigSlider {...layer.visConfigSettings.radiusRange} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>
        </StyledLayerVisualConfigurator>
      );
    };

    const _renderHeatmapLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup label={'layer.color'} collapsible>
            <LayerColorRangeSelector {...visConfiguratorProps} />
            <ConfigGroupCollapsibleContent>
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>
          {/* Radius */}
          <LayerConfigGroup label={'layer.radius'}>
            <VisConfigSlider {...layer.visConfigSettings.radius} {...visConfiguratorProps} label={false} />
          </LayerConfigGroup>
          {/* Weight */}
          <LayerConfigGroup label={'layer.weight'}>
            <ChannelByValueSelector channel={layer.visualChannels.weight} {...layerChannelConfigProps} />
          </LayerConfigGroup>
        </StyledLayerVisualConfigurator>
      );
    };

    const _renderGridLayerConfig = (props) => {
      return _renderAggregationLayerConfig(props);
    };

    const _renderHexagonLayerConfig = (props) => {
      return _renderAggregationLayerConfig(props);
    };

    const _renderAggregationLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      const { config } = layer;
      const {
        visConfig: { enable3d },
      } = config;
      const elevationByDescription = 'layer.elevationByDescription';
      const colorByDescription = 'layer.colorByDescription';

      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup label={'layer.color'} collapsible>
            <LayerColorRangeSelector {...visConfiguratorProps} />
            <ConfigGroupCollapsibleContent>
              <AggrScaleSelector {...layerConfiguratorProps} channel={layer.visualChannels.color} />
              <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
              {layer.visConfigSettings.colorAggregation.condition(layer.config) ? (
                <AggregationTypeSelector
                  {...layer.visConfigSettings.colorAggregation}
                  {...layerChannelConfigProps}
                  description={colorByDescription}
                  channel={layer.visualChannels.color}
                />
              ) : null}
              {layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? (
                <VisConfigSlider {...layer.visConfigSettings.percentile} {...visConfiguratorProps} />
              ) : null}
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Cell size */}
          <LayerConfigGroup label={'layer.radius'} collapsible>
            <VisConfigSlider {...layer.visConfigSettings.worldUnitSize} {...visConfiguratorProps} />
            <ConfigGroupCollapsibleContent>
              <VisConfigSlider {...layer.visConfigSettings.coverage} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Elevation */}
          {layer.visConfigSettings.enable3d ? (
            <LayerConfigGroup {...layer.visConfigSettings.enable3d} {...visConfiguratorProps} collapsible>
              <VisConfigSlider
                {...layer.visConfigSettings.elevationScale}
                {...visConfiguratorProps}
                label="layerVisConfigs.heightMultiplier"
              />
              <ConfigGroupCollapsibleContent>
                <ChannelByValueSelector
                  {...layerChannelConfigProps}
                  channel={layer.visualChannels.size}
                  description={elevationByDescription}
                  disabled={!enable3d}
                />
                <AggrScaleSelector {...layerConfiguratorProps} channel={layer.visualChannels.size} />
                <VisConfigSlider
                  {...layer.visConfigSettings.sizeRange}
                  {...visConfiguratorProps}
                  label="layerVisConfigs.heightRange"
                />
                <VisConfigSwitch
                  {...layer.visConfigSettings.enableElevationZoomFactor}
                  {...visConfiguratorProps}
                  label="layerVisConfigs.enableHeightZoomFactor"
                />
                {layer.visConfigSettings.sizeAggregation.condition(layer.config) ? (
                  <AggregationTypeSelector
                    {...layer.visConfigSettings.sizeAggregation}
                    {...layerChannelConfigProps}
                    channel={layer.visualChannels.size}
                  />
                ) : null}
                {layer.visConfigSettings.elevationPercentile.condition(layer.config) ? (
                  <VisConfigSlider {...layer.visConfigSettings.elevationPercentile} {...visConfiguratorProps} />
                ) : null}
              </ConfigGroupCollapsibleContent>
            </LayerConfigGroup>
          ) : null}
        </StyledLayerVisualConfigurator>
      );
    };

    // TODO: Shan move these into layer class
    const _renderHexagonIdLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup label={'layer.color'} collapsible>
            {layer.config.colorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} />
            ) : (
              <LayerColorSelector {...layerConfiguratorProps} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Coverage */}
          <LayerConfigGroup label={'layer.coverage'} collapsible>
            {!layer.config.coverageField ? (
              <VisConfigSlider {...layer.visConfigSettings.coverage} {...visConfiguratorProps} label={false} />
            ) : (
              <VisConfigSlider {...layer.visConfigSettings.coverageRange} {...visConfiguratorProps} label={false} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.coverage} {...layerChannelConfigProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* height */}
          <LayerConfigGroup {...layer.visConfigSettings.enable3d} {...visConfiguratorProps} collapsible>
            <ChannelByValueSelector channel={layer.visualChannels.size} {...layerChannelConfigProps} />
            <ConfigGroupCollapsibleContent>
              <VisConfigSlider {...layer.visConfigSettings.elevationScale} {...visConfiguratorProps} />
              <VisConfigSlider
                {...layer.visConfigSettings.sizeRange}
                {...visConfiguratorProps}
                label="layerVisConfigs.heightRange"
              />
              <VisConfigSwitch {...layer.visConfigSettings.enableElevationZoomFactor} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>
        </StyledLayerVisualConfigurator>
      );
    };

    const _renderArcLayerConfig = (args) => {
      return _renderLineLayerConfig(args);
    };

    const _renderLineLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup label={'layer.color'} collapsible>
            {layer.config.colorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} />
            ) : (
              <ArcLayerColorSelector
                layer={layer}
                setColorUI={layerConfiguratorProps.setColorUI}
                onChangeConfig={layerConfiguratorProps.onChange}
                onChangeVisConfig={visConfiguratorProps.onChange}
              />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.sourceColor} {...layerChannelConfigProps} />
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* thickness */}
          <LayerConfigGroup label={'layer.stroke'} collapsible>
            {layer.config.sizeField ? (
              <VisConfigSlider
                {...layer.visConfigSettings.sizeRange}
                {...visConfiguratorProps}
                disabled={!layer.config.sizeField}
                label={false}
              />
            ) : (
              <VisConfigSlider {...layer.visConfigSettings.thickness} {...visConfiguratorProps} label={false} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.size} {...layerChannelConfigProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* elevation scale */}
          {layer.visConfigSettings.elevationScale ? (
            <LayerConfigGroup label="layerVisConfigs.elevationScale" collapsible>
              <VisConfigSlider {...layer.visConfigSettings.elevationScale} {...visConfiguratorProps} />
            </LayerConfigGroup>
          ) : null}
        </StyledLayerVisualConfigurator>
      );
    };

    const _renderTripLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      const {
        meta: { featureTypes = {} },
      } = layer;

      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup label={'layer.color'} collapsible>
            {layer.config.colorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} />
            ) : (
              <LayerColorSelector {...layerConfiguratorProps} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Stroke Width */}
          <LayerConfigGroup {...visConfiguratorProps} label="layer.strokeWidth" collapsible>
            {layer.config.sizeField ? (
              <VisConfigSlider {...layer.visConfigSettings.sizeRange} {...visConfiguratorProps} label={false} />
            ) : (
              <VisConfigSlider {...layer.visConfigSettings.thickness} {...visConfiguratorProps} label={false} />
            )}

            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.size} {...layerChannelConfigProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Trail Length*/}
          <LayerConfigGroup
            {...visConfiguratorProps}
            {...(featureTypes.polygon ? layer.visConfigSettings.stroked : {})}
            label="layer.trailLength"
            description="layer.trailLengthDescription"
          >
            <VisConfigSlider {...layer.visConfigSettings.trailLength} {...visConfiguratorProps} label={false} />
          </LayerConfigGroup>
        </StyledLayerVisualConfigurator>
      );
    };

    const _renderGeojsonLayerConfig = ({
      layer,
      visConfiguratorProps,
      layerConfiguratorProps,
      layerChannelConfigProps,
    }) => {
      const {
        meta: { featureTypes = {} },
        config: { visConfig },
      } = layer;

      return (
        <StyledLayerVisualConfigurator>
          {/* Fill Color */}
          {featureTypes.polygon || featureTypes.point ? (
            <LayerConfigGroup
              {...layer.visConfigSettings.filled}
              {...visConfiguratorProps}
              label="layer.fillColor"
              collapsible
            >
              {layer.config.colorField ? (
                <LayerColorRangeSelector {...visConfiguratorProps} />
              ) : (
                <LayerColorSelector {...layerConfiguratorProps} />
              )}
              <ConfigGroupCollapsibleContent>
                <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
                <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
              </ConfigGroupCollapsibleContent>
            </LayerConfigGroup>
          ) : null}

          {/* stroke color */}
          <LayerConfigGroup
            {...layer.visConfigSettings.stroked}
            {...visConfiguratorProps}
            label="layer.strokeColor"
            collapsible
          >
            {layer.config.strokeColorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} property="strokeColorRange" />
            ) : (
              <LayerColorSelector
                {...visConfiguratorProps}
                selectedColor={layer.config.visConfig.strokeColor}
                property="strokeColor"
              />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.strokeColor} {...layerChannelConfigProps} />
              <VisConfigSlider {...layer.visConfigSettings.strokeOpacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Stroke Width */}
          <LayerConfigGroup
            {...visConfiguratorProps}
            {...(featureTypes.polygon ? layer.visConfigSettings.stroked : {})}
            label="layer.strokeWidth"
            collapsible
          >
            {layer.config.sizeField ? (
              <VisConfigSlider {...layer.visConfigSettings.sizeRange} {...visConfiguratorProps} label={false} />
            ) : (
              <VisConfigSlider {...layer.visConfigSettings.thickness} {...visConfiguratorProps} label={false} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.size} {...layerChannelConfigProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Elevation */}
          {featureTypes.polygon ? (
            <LayerConfigGroup
              {...visConfiguratorProps}
              {...layer.visConfigSettings.enable3d}
              disabled={!visConfig.filled}
              collapsible
            >
              <VisConfigSlider {...layer.visConfigSettings.elevationScale} {...visConfiguratorProps} label={false} />
              <ConfigGroupCollapsibleContent>
                <ChannelByValueSelector channel={layer.visualChannels.height} {...layerChannelConfigProps} />
                <VisConfigSwitch {...layer.visConfigSettings.enableElevationZoomFactor} {...visConfiguratorProps} />
                <VisConfigSwitch {...visConfiguratorProps} {...layer.visConfigSettings.wireframe} />
              </ConfigGroupCollapsibleContent>
            </LayerConfigGroup>
          ) : null}

          {/* Radius */}
          {featureTypes.point ? (
            <LayerConfigGroup label={'layer.radius'} collapsible>
              {!layer.config.radiusField ? (
                <VisConfigSlider
                  {...layer.visConfigSettings.radius}
                  {...visConfiguratorProps}
                  label={false}
                  disabled={Boolean(layer.config.radiusField)}
                />
              ) : (
                <VisConfigSlider
                  {...layer.visConfigSettings.radiusRange}
                  {...visConfiguratorProps}
                  label={false}
                  disabled={!layer.config.radiusField}
                />
              )}
              <ConfigGroupCollapsibleContent>
                <ChannelByValueSelector channel={layer.visualChannels.radius} {...layerChannelConfigProps} />
              </ConfigGroupCollapsibleContent>
            </LayerConfigGroup>
          ) : null}
        </StyledLayerVisualConfigurator>
      );
    };

    const _render3DLayerConfig = ({ layer, visConfiguratorProps }) => {
      return (
        <Fragment>
          <LayerConfigGroup label={'layer.3DModel'} collapsible>
            <Input
              type="file"
              accept=".glb,.gltf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  visConfiguratorProps.onChange({ scenegraph: url });
                }
              }}
            />
          </LayerConfigGroup>
          <LayerConfigGroup label={'layer.3DModelOptions'} collapsible>
            <VisConfigSlider {...layer.visConfigSettings.sizeScale} {...visConfiguratorProps} disabled={false} />
            <VisConfigSlider {...layer.visConfigSettings.angleX} {...visConfiguratorProps} disabled={false} />
            <VisConfigSlider {...layer.visConfigSettings.angleY} {...visConfiguratorProps} disabled={false} />
            <VisConfigSlider {...layer.visConfigSettings.angleZ} {...visConfiguratorProps} disabled={false} />
          </LayerConfigGroup>
        </Fragment>
      );
    };

    const _renderS2LayerConfig = ({ layer, visConfiguratorProps, layerConfiguratorProps, layerChannelConfigProps }) => {
      const {
        config: { visConfig },
      } = layer;

      return (
        <StyledLayerVisualConfigurator>
          {/* Color */}
          <LayerConfigGroup
            {...layer.visConfigSettings.filled}
            {...visConfiguratorProps}
            label="layer.fillColor"
            collapsible
          >
            {layer.config.colorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} />
            ) : (
              <LayerColorSelector {...layerConfiguratorProps} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.color} {...layerChannelConfigProps} />
              <VisConfigSlider {...layer.visConfigSettings.opacity} {...visConfiguratorProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Stroke */}
          <LayerConfigGroup
            {...layer.visConfigSettings.stroked}
            {...visConfiguratorProps}
            label="layer.strokeColor"
            collapsible
          >
            {layer.config.strokeColorField ? (
              <LayerColorRangeSelector {...visConfiguratorProps} property="strokeColorRange" />
            ) : (
              <LayerColorSelector
                {...visConfiguratorProps}
                selectedColor={layer.config.visConfig.strokeColor}
                property="strokeColor"
              />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.strokeColor} {...layerChannelConfigProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Stroke Width */}
          <LayerConfigGroup {...visConfiguratorProps} label="layer.strokeWidth" collapsible>
            {layer.config.sizeField ? (
              <VisConfigSlider {...layer.visConfigSettings.sizeRange} {...visConfiguratorProps} label={false} />
            ) : (
              <VisConfigSlider {...layer.visConfigSettings.thickness} {...visConfiguratorProps} label={false} />
            )}
            <ConfigGroupCollapsibleContent>
              <ChannelByValueSelector channel={layer.visualChannels.size} {...layerChannelConfigProps} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>

          {/* Elevation */}
          <LayerConfigGroup
            {...visConfiguratorProps}
            {...layer.visConfigSettings.enable3d}
            disabled={!visConfig.filled}
            collapsible
          >
            <ChannelByValueSelector channel={layer.visualChannels.height} {...layerChannelConfigProps} />
            <VisConfigSlider
              {...layer.visConfigSettings.elevationScale}
              {...visConfiguratorProps}
              label="layerVisConfigs.elevationScale"
            />
            <ConfigGroupCollapsibleContent>
              <VisConfigSlider
                {...layer.visConfigSettings.heightRange}
                {...visConfiguratorProps}
                label="layerVisConfigs.heightRange"
              />
              <VisConfigSwitch {...layer.visConfigSettings.enableElevationZoomFactor} {...visConfiguratorProps} />
              <VisConfigSwitch {...visConfiguratorProps} {...layer.visConfigSettings.wireframe} />
            </ConfigGroupCollapsibleContent>
          </LayerConfigGroup>
        </StyledLayerVisualConfigurator>
      );
    };

    const layerConfigRenderers: Record<string, FunctionComponent<LayerConfigerRendererPropsInterface>> = {
      _render3DLayerConfig,
      _renderAggregationLayerConfig,
      _renderArcLayerConfig,
      _renderClusterLayerConfig,
      _renderGeojsonLayerConfig,
      _renderGridLayerConfig,
      _renderHeatmapLayerConfig,
      _renderHexagonIdLayerConfig,
      _renderHexagonLayerConfig,
      _renderIconLayerConfig,
      _renderLineLayerConfig,
      _renderPointLayerConfig,
      _renderS2LayerConfig,
      _renderScatterplotLayerConfig,
      _renderTripLayerConfig,
    };
    const { fields = [], fieldPairs = undefined } = layer.config.dataId ? datasets[layer.config.dataId] : {};

    const visConfiguratorProps = getVisConfiguratorProps({ updateLayerColorUI, updateLayerVisConfig, layer, datasets });
    const layerConfiguratorProps = getLayerConfiguratorProps({
      layer,
      updateLayerColorUI,
      updateLayerConfig,
      datasets,
    });
    const layerChannelConfigProps = getLayerChannelConfigProps({ updateLayerVisualChannelConfig, layer, datasets });
    const dataset = getLayerDataset(datasets, layer);
    const renderTemplate = layer.type && `_render${capitalizeFirstLetter(layer.type)}LayerConfig`;

    return (
      <StyledLayerConfigurator>
        {layer.layerInfoModal ? <HowToButton onClick={() => openModal(layer.layerInfoModal)} /> : null}
        <LayerConfigGroup label={'layer.basic'} collapsible expanded={!layer.hasAllColumns()}>
          <LayerTypeSelector
            datasets={datasets}
            layer={layer}
            layerTypeOptions={layerTypeOptions}
            onSelect={updateLayerType}
          />
          <LayerColumnConfig
            columnPairs={layer.columnPairs}
            columns={layer.config.columns}
            assignColumnPairs={layer.assignColumnPairs.bind(layer)}
            assignColumn={layer.assignColumn.bind(layer)}
            columnLabels={layer.columnLabels}
            fields={fields}
            fieldPairs={fieldPairs}
            updateLayerConfig={updateLayerConfig}
            updateLayerType={updateLayerType}
          />
        </LayerConfigGroup>
        {layerConfigRenderers[renderTemplate] &&
          layerConfigRenderers[renderTemplate]({
            layer,
            dataset,
            visConfiguratorProps,
            layerChannelConfigProps,
            layerConfiguratorProps,
          })}
      </StyledLayerConfigurator>
    );
  };

  return LayerConfigurator;
};

LayerConfiguratorFactory.deps = KeplerLayerConfiguratorFactory.deps;

export function replaceLayerConfigurator() {
  return [KeplerLayerConfiguratorFactory, LayerConfiguratorFactory];
}
