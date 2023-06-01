import React, { ComponentType } from 'react';
import TooltipConfigFactory from 'kepler.gl/dist/components/side-panel/interaction-panel/tooltip-config';
import { BaseInteraction, TooltipField } from 'kepler.gl/src/reducers/vis-state-updaters';
import { TooltipConfigWrapper } from './TooltipConfigFactory';
import { DatasetConfigFactory } from './DatasetConfigFactory';

export type FilterField = TooltipField;
interface FiltersConfig extends BaseInteraction {
  config: {
    fieldsToShow: {
      [key: string]: FilterField[];
    };
  };
}

export function FiltersConfigFactory(DatasetTag: ComponentType<any>, FieldSelector: ComponentType<any>) {
  const FiltersTooltipConfig = DatasetConfigFactory<FiltersConfig['config']>(DatasetTag, FieldSelector);

  return ({ config, datasets, onChange }) => {
    return (
      <TooltipConfigWrapper>
        {Object.keys(config.fieldsToShow).map((dataId) => (
          <FiltersTooltipConfig key={dataId} config={config} onChange={onChange} dataset={datasets[dataId]} />
        ))}
      </TooltipConfigWrapper>
    );
  };
}

FiltersConfigFactory.deps = TooltipConfigFactory.deps;
