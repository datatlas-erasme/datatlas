/* eslint-disable @typescript-eslint/no-explicit-any */
import {ComponentType} from 'react';
import {Filter} from '@kepler.gl/types';
import {
  PolygonFilter,
  SingleSelectFilter,
  TimeRangeFilter
} from '@kepler.gl/components/dist/filters';
import {FILTER_TYPES} from '@kepler.gl/constants';
import {appInjector} from '../../injector';
import {MultiSelectFilterFactory, RangeFilterFactory} from '../filter-panel';

type FilterFactory =
  | typeof TimeRangeFilter
  | typeof SingleSelectFilter
  | typeof MultiSelectFilterFactory
  | typeof RangeFilterFactory
  | typeof PolygonFilter;

const filterComponentFactories: Record<string, FilterFactory> = {
  [FILTER_TYPES.timeRange]: TimeRangeFilter,
  [FILTER_TYPES.select]: SingleSelectFilter,
  [FILTER_TYPES.multiSelect]: MultiSelectFilterFactory,
  [FILTER_TYPES.range]: RangeFilterFactory,
  [FILTER_TYPES.polygon]: PolygonFilter
};

export const isTypeSupported = ({type}: {type: string}): boolean => {
  if (!filterComponentFactories[type]) {
    console.warn(`Field type ${type} isn't supported.`);
    return false;
  }

  return true;
};

export const createFilterComponent = (filter: Filter): ComponentType<any> | null => {
  if (!filter.type) {
    console.warn(`Filter ${filter.id} doesn't have a filter type.`);
    return null;
  }

  const filterComponent = appInjector.get(filterComponentFactories[filter.type]);

  if (!filterComponent) {
    console.warn(`Filter ${filter.id} type ${filter.type} isn't supported.`);
    return null;
  }

  return filterComponent;
};
