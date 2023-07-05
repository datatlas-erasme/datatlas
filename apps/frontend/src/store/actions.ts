/* eslint-disable @typescript-eslint/no-explicit-any */
import curry from 'lodash.curry';
import { wrapTo } from 'kepler.gl/actions';

export const wrapCreatorTo = curry(
  (id, actionCreator) =>
    (...args: any[]) =>
      wrapTo(id)(actionCreator(...args))
);
