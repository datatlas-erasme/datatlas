import React, { useCallback } from 'react';
import styled from 'styled-components';
import { grayscale, rgbToHsl, toCss } from '../../utils/color';

export const MultiSelectFilterOption = styled(({ hslCssColor, selected, ...props }) => <button {...props} />)`
  color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.5})`};
  background-color: ${({ hslCssColor }) => `hsl(${hslCssColor}, 0.60)`};
  transition: background, color 0.3s ease;

  :hover {
    color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.9})`};
    background-color: ${({ hslCssColor }) => `hsl(${hslCssColor}, 0.35)`};
  }

  :active {
    color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.8})`};
    background-color: ${({ hslCssColor }) => `hsl(${hslCssColor}, 0.20)`};
  }
`;

export const MultiSelectFilter = styled(({ idx, filter, setFilter, layer, ...props }) => {
  const handleSetFilter = useCallback(
    (value) => {
      if (filter.value.indexOf(value) !== -1) {
        setFilter(
          idx,
          'value',
          filter.value.filter((v) => v !== value)
        );
      } else {
        setFilter(idx, 'value', filter.value.concat(value));
      }
    },
    [idx, setFilter, filter.value]
  );

  const hslLayerColor = rgbToHsl(layer.config.color);
  const hslColor = !layer.config.isVisible ? grayscale(hslLayerColor) : hslLayerColor;
  const hslCssColor = toCss(hslColor);

  return (
    <ul {...props}>
      {filter.domain.map((domain) => (
        <MultiSelectFilterOption
          key={domain}
          onClick={() => handleSetFilter(domain)}
          selected={filter.value.indexOf(domain) !== -1}
          hslCssColor={hslCssColor}
        >
          {domain}
        </MultiSelectFilterOption>
      ))}
    </ul>
  );
})`
  display: flex;
  flex-direction: column;
`;
