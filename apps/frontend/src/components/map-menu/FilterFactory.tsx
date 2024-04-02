import { Filter, SetFilter } from '@datatlas/models';
import { Layer } from '@kepler.gl/layers';
import React from 'react';
import { createFilterComponent } from '../keplerGl/factories';

interface FilterFactoryProps {
  idx: number;
  filter: Filter;
  setFilter: SetFilter;
  layer: Layer;
  style?: React.CSSProperties;
}

export const FilterFactory = (props: FilterFactoryProps) => {
  const FilterComponent = createFilterComponent(props.filter);

  return FilterComponent && <FilterComponent {...props} />;
};
