import React, { useCallback } from 'react';
import styled from 'styled-components';

export const MultiSelectFilterOption = styled(({ backgroundRgb, selected, ...props }) => <li {...props} />)`
  cursor: pointer;
  color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.5})`};
  background-color: ${({ backgroundRgb }) => `rgba(${backgroundRgb}, 0.60)`};
  transition: background, color 0.3s ease;

  :hover {
    color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.9})`};
    background-color: ${({ backgroundRgb }) => `rgba(${backgroundRgb}, 0.80)`};
  }

  :active {
    color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.8})`};
    background-color: ${({ backgroundRgb }) => `rgba(${backgroundRgb}, 0.90)`};
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

  return (
    <ul {...props}>
      {filter.domain.map((domain) => (
        <MultiSelectFilterOption
          key={domain}
          onClick={() => handleSetFilter(domain)}
          selected={filter.value.indexOf(domain) !== -1}
          backgroundRgb={layer.config.color}
        >
          {domain}
        </MultiSelectFilterOption>
      ))}
    </ul>
  );
})``;
