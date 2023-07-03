/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';
import { Filter } from 'kepler.gl';
import {
  TimeRangeFilter as TimeRangeFilterFactory,
  SingleSelectFilter as SingleSelectFactory,
  PolygonFilter as PolygonFilterFactory,
} from 'kepler.gl/dist/components/filters';
import { FILTER_TYPES } from 'kepler.gl/dist/constants/default-settings';
import { appInjector } from '../../injector';
import { MultiSelectFilterFactory, RangeFilterFactory } from '../filter-panel';

const filterComponentFactories: Record<string, ComponentType<any>> = {
  [FILTER_TYPES.timeRange]: TimeRangeFilterFactory,
  [FILTER_TYPES.select]: SingleSelectFactory,
  [FILTER_TYPES.multiSelect]: MultiSelectFilterFactory,
  [FILTER_TYPES.range]: RangeFilterFactory,
  [FILTER_TYPES.polygon]: PolygonFilterFactory,
};

export const isTypeSupported = ({ type }: { type: string }): boolean => {
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
