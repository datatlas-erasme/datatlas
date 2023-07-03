/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import KeplerRangeFilterFactory from 'kepler.gl/dist/components/filters/range-filter';
import styled from 'styled-components';

export function RangeFilterFactory(RangeSlider) {
  return styled(({ idx, filter, setFilter, layer, className, style }) => {
    const handleSetFilter = useCallback((value) => setFilter(idx, 'value', value), [idx, setFilter]);

    return (
      <div
        className={`range-slider__container ${className}`}
        style={{ backgroundColor: `rgba(${layer.config.color}, 0.75)`, ...style }}
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
  })`
    .kg-range-slider .kg-range-slider__plot .histogram-bars rect {
      fill: rgba(255, 255, 255, 0.5);
    }

    .kg-range-slider .kg-range-slider__brush .selection {
      fill: white;
      fill-opacity: 0.4;
    }

    .kg-range-slider .kg-range-slider__slider .kg-range-slider {
      background-color: rgba(255, 255, 255, 0.5);
    }

    .kg-range-slider .kg-range-slider__slider .kg-range-slider__bar {
      background-color: rgba(255, 255, 255, 0.9);
    }

    .kg-range-slider .kg-range-slider__brush .handle--custom {
      fill: rgba(255, 255, 255, 0.8);
    }
    .kg-range-slider .kg-range-slider__slider .kg-range-slider__handle {
      background-color: rgba(255, 255, 255, 0.8);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .kg-range-slider .kg-range-slider__slider .kg-range-slider__handle:hover {
      background-color: rgba(255, 255, 255, 1);
    }

    .kg-range-slider .range-slider__input-group .kg-range-slider__input {
      background-color: white;
    }
  `;
}

RangeFilterFactory.deps = KeplerRangeFilterFactory.deps;

export function provideRangerFilter() {
  return [RangeFilterFactory, RangeFilterFactory];
}
