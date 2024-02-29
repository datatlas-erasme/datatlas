/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {ComponentType} from 'react';
import {TooltipConfigFactory} from '@kepler.gl/components';
import {BaseInteraction, TooltipField} from '@kepler.gl/types';
import {TooltipConfigWrapper} from './TooltipConfigFactory';
import {DatasetConfigFactory} from './DatasetConfigFactory';

export type FilterField = TooltipField;
interface FiltersConfig extends BaseInteraction {
  config: {
    fieldsToShow: {
      [key: string]: FilterField[];
    };
  };
}

export function FiltersConfigFactory(
  DatasetTag: ComponentType<any>,
  FieldSelector: ComponentType<any>
) {
  const FiltersTooltipConfig = DatasetConfigFactory<FiltersConfig['config']>(
    DatasetTag,
    FieldSelector
  );

  return ({config, datasets, onChange, onDisplayFormatChange}) => {
    return (
      <TooltipConfigWrapper>
        {Object.keys(config.fieldsToShow).map(dataId => (
          <FiltersTooltipConfig
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

FiltersConfigFactory.deps = TooltipConfigFactory.deps;
