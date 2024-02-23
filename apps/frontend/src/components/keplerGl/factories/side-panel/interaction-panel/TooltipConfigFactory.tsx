/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {ComponentType} from 'react';
import styled from 'styled-components';
import {TooltipConfigFactory as KeplerTooltipConfigFactory} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
import {DatasetConfigFactory} from './DatasetConfigFactory';

export const TooltipConfigWrapper = styled.div`
  .item-selector > div > div {
    overflow: visible;
  }
`;

function TooltipConfigFactory(DatasetTag: ComponentType<any>, FieldSelector: ComponentType<any>) {
  const DatasetTooltipConfig = DatasetConfigFactory(DatasetTag, FieldSelector);

  return ({config, datasets, onChange, onDisplayFormatChange}) => {
    return (
      <TooltipConfigWrapper>
        {Object.keys(config.fieldsToShow).map(dataId => (
          <DatasetTooltipConfig
            key={dataId}
            config={config}
            onChange={onChange}
            dataset={datasets[dataId]}
            onDisplayFormatChange={onDisplayFormatChange}
          />
        ))}
      </TooltipConfigWrapper>
    );
  };
}

TooltipConfigFactory.deps = KeplerTooltipConfigFactory.deps;

export function replaceTooltipConfig(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerTooltipConfigFactory, TooltipConfigFactory];
}
