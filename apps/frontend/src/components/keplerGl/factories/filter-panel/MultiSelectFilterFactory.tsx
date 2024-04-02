/* eslint-disable react-hooks/rules-of-hooks */
import {Factory} from '@kepler.gl/components/dist/injector';
import {MultiSelectFilter} from '../../../map-menu';

export function MultiSelectFilterFactory() {
  return MultiSelectFilter;
}

export function provideMultiSelectFilter(): [Factory, Factory] {
  // @ts-ignore
  return [MultiSelectFilterFactory, MultiSelectFilterFactory];
}
