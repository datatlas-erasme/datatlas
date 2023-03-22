import React from 'react';
import { SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';
import ColorSelector from 'kepler.gl/dist/components/side-panel/layer-panel/color-selector';

export const LayerColorSelector = ({ layer, onChange, label, selectedColor, property = 'color', setColorUI }) => (
  <SidePanelSection>
    <ColorSelector
      colorSets={[
        {
          selectedColor: selectedColor || layer.config.color,
          setColor: (rgbValue) => onChange({ [property]: rgbValue }),
        },
      ]}
      colorUI={layer.config.colorUI[property]}
      setColorUI={(newConfig) => setColorUI(property, newConfig)}
    />
  </SidePanelSection>
);
