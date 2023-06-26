import React, { ButtonHTMLAttributes, LiHTMLAttributes, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import { Layer, KeplerTable } from 'kepler.gl/src';
import { FilterField } from './keplerGl/factories';
import { Filter, FiltersConfigInterface, SetFilter } from '@datatlas/models';
import { createFilterComponent } from './keplerGl/factories/side-panel/filter-components';

export const MenuIconButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <MenuIcon as="button" {...props} />
);

export const MenuIcon = styled((props) => <div {...props} />)`
  align-self: center;
  justify-self: flex-end;
`;

export const ToggleMenuButton = ({ open, ...props }) => <MenuIconButton {...props}>{open ? 'X' : 'O'}</MenuIconButton>;

interface FilterFactoryProps {
  filter: Filter;
  setFilter: SetFilter;
}

export const FilterComponentFactory = (props: FilterFactoryProps) => {
  const FilterComponent = createFilterComponent(props.filter);

  return FilterComponent ? <FilterComponent {...props} /> : null;
};

interface DatasetMenuProps extends LiHTMLAttributes<HTMLLIElement> {
  datasets: Datasets;
  fields?: FilterField[];
  filters: Filter[];
  layer: Layer;
  unfolded?: boolean;
  reversedIndex: number[]; // An array of filters index in reverse order.
  setFilter: SetFilter;
}

export const DatasetMenu = ({
  datasets,
  filters,
  unfolded,
  fields,
  reversedIndex,
  layer,
  setFilter,
  ...props
}: DatasetMenuProps) => {
  return (
    <li {...props}>
      <MenuTitleSection>
        <h2>{layer.config.label}</h2>
        <MenuIcon />
      </MenuTitleSection>
      {reversedIndex.length && (
        <ul>
          {reversedIndex.map((idx) => (
            <li>
              <h3>{filters[idx].name}</h3>
              <ul>
                <li>
                  <FilterComponentFactory setFilter={(value) => setFilter(idx, 'value', value)} filter={filters[idx]} />
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuProps {
  datasets: Datasets;
  filtersConfig?: FiltersConfigInterface;
  filters: Filter[];
  layers: Layer[];
  setFilter: SetFilter;
}

export const MenuTitleSection = styled.div`
  display: inline-flex;
  flex: 0 0 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Menu = styled(({ datasets, filters = [], layers, filtersConfig, setFilter, ...props }: MenuProps) => {
  const [open, setOpen] = useState<boolean>();
  const [unfoldedDataset, setUnfoldedDataset] = useState<KeplerTable['id']>();
  // const toField = createToField(datasets.fields);

  // const isAnyFilterAnimating = filters.some((f) => f.isAnimating);
  // const hadEmptyFilter = (reversedIndex) => reversedIndex.map((idx) => filters[idx]).some((f) => !f.name);
  const reversedIndexGroupedByLayerIdx = useMemo(() => {
    return layers.reduce(
      (filtersGroupedByLayerIdx, layer, layerIdx) => ({
        ...filtersGroupedByLayerIdx,
        [layerIdx]: filters.reduce((reversedIndex: number[], filter, filterIdx) => {
          if (filter.dataId.includes(layer.config.dataId) && filter.public) {
            reversedIndex.unshift(filterIdx);
          }

          return reversedIndex;
        }, []),
      }),
      {}
    );
    // eslint-disable-next-line
  }, [layers.length, filters.length]);

  console.log('layers', layers);
  console.log('reversedIndexGroupedByLayerIdx', reversedIndexGroupedByLayerIdx);

  /*
  fields={
    filtersConfig && filtersConfig.config.fieldsToShow[dataset.id]
    ? dataset.fields.filter((field) =>
      filtersConfig.config.fieldsToShow[dataset.id].find(({ name }) => name === field.name)
    )
    : []
}
*/
  console.log('reversedIndexGroupedByLayerIdx', reversedIndexGroupedByLayerIdx);
  return (
    <ul {...props}>
      <li>
        <MenuTitleSection>
          <span>Recherche & filtres</span>
          <ToggleMenuButton open={open} onClick={() => setOpen(!open)} />
        </MenuTitleSection>
        {open && (
          <ul>
            {Object.keys(reversedIndexGroupedByLayerIdx).map((layerIdx) => (
              <DatasetMenu
                datasets={datasets}
                reversedIndex={reversedIndexGroupedByLayerIdx[layerIdx]}
                filters={filters}
                layer={layers[layerIdx]}
                setFilter={setFilter}
                key={`datasetMenu-${layerIdx}`}
                unfolded={layerIdx === unfoldedDataset}
                onClick={() => setUnfoldedDataset(layerIdx)}
              />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
})`
  display: flex;

  li {
    padding: 7px 13px;
  }

  li > ${MenuTitleSection} {
  }

  ul,
  ul > ul {
    padding: 0;
  }

  li,
  ul > li {
    background-color: black;
    color: red;
    padding: 7px 0;
    display: flex;
    flex-direction: column;
  }
`;
