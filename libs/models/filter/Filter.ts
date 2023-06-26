import {
  FilterBase,
  MultiSelectFilter,
  PolygonFilter,
  RangeFilter,
  SelectFilter,
  TimeRangeFilter,
} from 'kepler.gl/src/reducers/vis-state-updaters';

export type Filter = FilterBase | RangeFilter | TimeRangeFilter | SelectFilter | MultiSelectFilter | PolygonFilter;
