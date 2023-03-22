import React from 'react';
import VisConfigByFieldSelectorFactory from 'kepler.gl/dist/components/side-panel/layer-panel/vis-config-by-field-selector';
import { CHANNEL_SCALE_SUPPORTED_FIELDS } from 'kepler.gl/dist/constants/default-settings';

export function ChannelByValueSelectorFactory(VisConfigByFieldSelector) {
  const ChannelByValueSelector = ({ layer, channel, onChange, fields, description }) => {
    const { channelScaleType, domain, field, key, property, range, scale, defaultMeasure, supportedFieldTypes } =
      channel;
    const channelSupportedFieldTypes = supportedFieldTypes || CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
    const supportedFields = fields.filter(({ type }) => channelSupportedFieldTypes.includes(type));
    const scaleOptions = layer.getScaleOptions(channel.key);
    const showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
    const defaultDescription = 'layerConfiguration.defaultDescription';

    return (
      <VisConfigByFieldSelector
        channel={channel.key}
        description={description || defaultDescription}
        domain={layer.config[domain]}
        fields={supportedFields}
        id={layer.id}
        key={`${key}-channel-selector`}
        property={property}
        placeholder={defaultMeasure || 'placeholder.selectField'}
        range={layer.config.visConfig[range]}
        scaleOptions={scaleOptions}
        scaleType={scale ? layer.config[scale] : null}
        selectedField={layer.config[field]}
        showScale={showScale}
        updateField={(val) => onChange({ [field]: val }, key)}
        updateScale={(val) => onChange({ [scale]: val }, key)}
      />
    );
  };

  return ChannelByValueSelector;
}

ChannelByValueSelectorFactory.deps = [VisConfigByFieldSelectorFactory];
