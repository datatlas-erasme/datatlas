import { FilterBase as KeplerGlFilterBase } from '@kepler.gl/types';
import { LineChart } from '@kepler.gl/types/reducers';

export interface FilterBase extends KeplerGlFilterBase<LineChart> {
  public: boolean;
}
