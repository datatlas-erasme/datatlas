/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import styled from 'styled-components';

export const Option = styled(({ backgroundRgb, selected, ...props }) => <li {...props} />)`
  cursor: pointer;
  color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.55})`};
  background-color: ${({ backgroundRgb }) => `rgba(${backgroundRgb}, 0.75)`};
  transition: background, color 0.3s ease;

  :hover {
    color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.9})`};
    background-color: ${({ backgroundRgb }) => `rgba(${backgroundRgb}, 0.85)`};
  }

  :active {
    color: ${({ selected }) => `rgba(255, 255, 255, ${selected ? 1 : 0.8})`};
    background-color: ${({ backgroundRgb }) => `rgba(${backgroundRgb}, 0.70)`};
  }
`;

export function MultiSelectFilterFactory() {
  return ({ idx, filter, setFilter, layer, ...props }) => {
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
      [idx, setFilter]
    );

    return (
      <ul {...props}>
        {filter.domain.map((domain) => (
          <Option
            key={domain}
            onClick={() => handleSetFilter(domain)}
            selected={filter.value.indexOf(domain) !== -1}
            backgroundRgb={layer.config.color}
          >
            {domain}
          </Option>
        ))}
      </ul>
    );
  };
}

export function provideMultiSelectFilter() {
  return [MultiSelectFilterFactory, MultiSelectFilterFactory];
}
