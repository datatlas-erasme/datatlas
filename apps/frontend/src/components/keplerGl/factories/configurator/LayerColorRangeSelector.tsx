import React from 'react';
import { SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';
import ColorSelector from 'kepler.gl/dist/components/side-panel/layer-panel/color-selector';

export const LayerColorRangeSelector = ({ layer, onChange, property = 'colorRange', setColorUI }) => (
  <SidePanelSection>
    <h2>COUCOU</h2>
    <ColorSelector
      colorSets={[
        {
          selectedColor: layer.config.visConfig[property],
          isRange: true,
          setColor: (colorRange) => onChange({ [property]: colorRange }),
        },
      ]}
      colorUI={layer.config.colorUI[property]}
      setColorUI={(newConfig) => setColorUI(property, newConfig)}
    />
  </SidePanelSection>
);
