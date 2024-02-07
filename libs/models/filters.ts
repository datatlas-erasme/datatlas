import {
  FilterBase as KeplerGlFilterBase,
  MultiSelectFilter as KeplerGlMultiSelectFilter,
  PolygonFilter as KeplerGlPolygonFilter,
  RangeFilter as KeplerGlRangeFilter,
  SelectFilter as KeplerGlSelectFilter,
  TimeRangeFilter as KeplerGlTimeRangeFilter,
} from '@kepler.gl/types';
import { LineChart } from '@kepler.gl/types/reducers';

export interface FilterBase extends KeplerGlFilterBase<LineChart> {
  public: boolean;
}

export type MultiSelectFilter = FilterBase & KeplerGlMultiSelectFilter;
export type PolygonFilter = FilterBase & KeplerGlPolygonFilter;
export type RangeFilter = FilterBase & KeplerGlRangeFilter;
export type SelectFilter = FilterBase & KeplerGlSelectFilter;
export type TimeRangeFilter = FilterBase & KeplerGlTimeRangeFilter;

export type Filter = FilterBase | RangeFilter | TimeRangeFilter | SelectFilter | MultiSelectFilter | PolygonFilter;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetFilter = (idx: number, prop: string, value: any) => void;
