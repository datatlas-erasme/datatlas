import React from 'react';
import DimensionScaleSelector from 'kepler.gl/dist/components/side-panel/layer-panel/dimension-scale-selector';

export const AggrScaleSelector = ({ channel, layer, onChange }) => {
  const { scale, key } = channel;
  const scaleOptions = layer.getScaleOptions(key);

  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? (
    <DimensionScaleSelector
      label={`${key} Scale`}
      options={scaleOptions}
      scaleType={layer.config[scale]}
      onSelect={(val) => onChange({ [scale]: val }, key)}
    />
  ) : null;
};
