import React from 'react';
import styled from 'styled-components';

export const Option = styled((props) => <li {...props} />)``;

export function MultiSelectFilterFactory() {
  return ({ filter, setFilter }) =>
    filter.domain.map((domain) => (
      <Option onChange={setFilter} selected={filter.value}>
        {domain}
      </Option>
    ));
}
