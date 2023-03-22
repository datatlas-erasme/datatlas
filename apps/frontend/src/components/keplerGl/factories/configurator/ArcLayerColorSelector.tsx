import React from 'react';
import ColorSelector from 'kepler.gl/dist/components/side-panel/layer-panel/color-selector';
import { SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';

export const ArcLayerColorSelector = ({ layer, onChangeConfig, onChangeVisConfig, property = 'color', setColorUI }) => (
  <SidePanelSection>
    <ColorSelector
      colorSets={[
        {
          selectedColor: layer.config.color,
          setColor: (rgbValue) => onChangeConfig({ color: rgbValue }),
          label: 'Source',
        },
        {
          selectedColor: layer.config.visConfig.targetColor || layer.config.color,
          setColor: (rgbValue) => onChangeVisConfig({ targetColor: rgbValue }),
          label: 'Target',
        },
      ]}
      colorUI={layer.config.colorUI[property]}
      setColorUI={(newConfig) => setColorUI(property, newConfig)}
    />
  </SidePanelSection>
);
