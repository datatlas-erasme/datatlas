import React, { LiHTMLAttributes } from 'react';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import { FilterField } from '../keplerGl/factories';
import { Filter, SetFilter } from '@datatlas/models';
import { Layer } from 'kepler.gl/src';
import { MenuIcon, MenuIconButton } from './MenuIcon';
import { FilterFactory } from './FilterFactory';
import { LayerConfigChange, MenuSectionHeading } from './MapMenu';

interface DatasetMenuProps extends LiHTMLAttributes<HTMLLIElement> {
  datasets: Datasets;
  fields?: FilterField[];
  filters: Filter[];
  layer: Layer;
  unfolded?: boolean;
  reversedIndex: number[]; // An array of filters index in reverse order.
  setFilter: SetFilter;
  layerConfigChange: LayerConfigChange;
}

export const DatasetMenu = ({
  datasets,
  filters,
  unfolded,
  fields,
  reversedIndex,
  layer,
  setFilter,
  layerConfigChange,
  ...props
}: DatasetMenuProps) => {
  const toggleVisibility = (e) => {
    e.stopPropagation();
    const isVisible = !layer.config.isVisible;
    layerConfigChange(layer, { isVisible });
  };

  return (
    <li {...props}>
      <MenuSectionHeading>
        <h2>{layer.config.label}</h2>
        <MenuIcon style={{ backgroundColor: `rgb(${layer.config.color})`, height: 13, width: 13 }} />
      </MenuSectionHeading>
      <MenuSectionHeading>
        <span>Afficher le jeu de données</span>
        <MenuIconButton onClick={toggleVisibility}>{layer.config.isVisible ? '👁' : '🕶'}</MenuIconButton>
      </MenuSectionHeading>
      {reversedIndex.length > 0 && (
        <ul>
          {reversedIndex.map((idx) => (
            <li key={`filters-${idx}`}>
              <MenuSectionHeading style={{ backgroundColor: `rgb(${layer.config.color})` }}>
                <h3>{filters[idx].name}</h3>
              </MenuSectionHeading>
              <FilterFactory idx={idx} setFilter={setFilter} filter={filters[idx]} layer={layer} />
            </li>
          ))}
        </ul>
      )}
      <MenuSectionHeading>
        <h3>Infos jeu de données & glosssaire</h3>
        <MenuIcon>🛈</MenuIcon>
      </MenuSectionHeading>
    </li>
  );
};
