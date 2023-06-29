/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import KeplerRangeFilterFactory from 'kepler.gl/dist/components/filters/range-filter';

export function RangeFilterFactory(RangeSlider) {
  return ({ idx, filter, setFilter, layer }) => {
    const handleSetFilter = useCallback((value) => setFilter(idx, 'value', value), [idx, setFilter]);

    return (
      <div
        className="range-slider__container"
        style={layer ? { backgroundColor: `rgba(${layer.config.color}, 0.75)` } : {}}
      >
        <RangeSlider
          range={filter.domain}
          value0={filter.value[0]}
          value1={filter.value[1]}
          step={filter.step}
          histogram={filter.histogram}
          isEnlarged={filter.isEnlarged}
          onChange={handleSetFilter}
          inputTheme="secondary"
        />
      </div>
    );
  };
}

RangeFilterFactory.deps = KeplerRangeFilterFactory.deps;

export function provideRangerFilter() {
  return [RangeFilterFactory, RangeFilterFactory];
}
