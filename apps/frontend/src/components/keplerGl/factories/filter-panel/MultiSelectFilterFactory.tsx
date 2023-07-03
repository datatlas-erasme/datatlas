/* eslint-disable react-hooks/rules-of-hooks */
import { MultiSelectFilter } from '../../../map-menu';

export function MultiSelectFilterFactory() {
  return MultiSelectFilter;
}

export function provideMultiSelectFilter() {
  return [MultiSelectFilterFactory, MultiSelectFilterFactory];
}
