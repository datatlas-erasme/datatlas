import React, { ButtonHTMLAttributes, LiHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import { KeplerTable } from 'kepler.gl/src';
import { appInjector } from 'kepler.gl/dist/components';
import { RangeFilter as RangeFilterFactory } from 'kepler.gl/dist/components/filters';
import { FiltersConfigInterface } from '../../../../libs/models/kepler/DatatlasGlVisState';
import { FilterField } from './keplerGl/factories';
import { Field } from 'kepler.gl/src/utils/table-utils/kepler-table';

// [FILTER_TYPES.timeRange]: TimeRangeFilterPanel,
//   [FILTER_TYPES.select]: SingleSelectFilterPanel,
//   [FILTER_TYPES.multiSelect]: MultiSelectFilterPanel,
//   [FILTER_TYPES.range]: RangeFilterPanel,
//   [FILTER_TYPES.polygon]: PolygonFilterPanel

// export const TimeRangeSlider = appInjector.get(TimeRangeSliderFactory);
// export const RangeFilter = appInjector.get();
export const RangeFilter = appInjector.get(RangeFilterFactory);
//
// RangeFilterFactory(RangeSlider) {
// TimeRangeFilterFactory
// PolygonFilterFactory
// SingleSelectFilterFactory
// MultiSelectFilterFactory

interface MenuIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuIconButton = ({ ...props }: MenuIconButtonProps) => <MenuIcon as="button" {...props} />;

export const MenuIcon = styled((props) => <div {...props} />)``;

export const ToggleMenuButton = ({ open, ...props }) => <MenuIconButton {...props}>{open ? 'X' : 'O'}</MenuIconButton>;

interface DatasetMenuProps extends LiHTMLAttributes<HTMLLIElement> {
  dataset: KeplerTable;
  fields?: FilterField[];
  unfolded?: boolean;
}

export const FilterFactory = ({ da, field }) => {
  // class KeplerTable {
  //   constructor({info = {}, data, color, metadata, supportedFilterTypes}) {
  // console.log('dataset', dataset);
  // console.log('dataset.getColumnFilterProps', dataset.getColumnFilterProps);
  return <div>{}</div>;
};

export const DatasetMenu = ({ dataset, unfolded, fields, ...props }: DatasetMenuProps) => {
  // getFilterProps
  // KeplerTable.getColumnFilterProps

  console.log('getColumnFilterProps', typeof dataset.getColumnFilterProps());
  console.log('fields', fields);

  const fieldsFilterProps: Field['filterProps'][] = fields
    ? fields.map(({ name }) => dataset.getColumnFilterProps(name))
    : [];

  console.log('fieldsFilterProps', fieldsFilterProps);

  return (
    <li {...props}>
      <h3>
        {dataset.label} <MenuIcon />
      </h3>
      {fieldsFilterProps.length && (
        <ul>
          {fieldsFilterProps.map((filterProps) => (
            <li>
              <h4>{filterProps.name}</h4>
              <ul>
                <li>
                  <RangeFilter setFilter={() => {}} filter={filterProps} />
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
}

export const Menu = styled(({ datasets, filtersConfig, ...props }: MenuProps) => {
  const [open, setOpen] = useState<boolean>();
  const [unfoldedDataset, setUnfoldedDataset] = useState<KeplerTable['id']>();
  // const toField = createToField(datasets.fields);


  return (
    <ul {...props}>
      <li>
        <h2>
          Recherche & filtres <ToggleMenuButton open={open} onClick={() => setOpen(!open)} />
        </h2>
        {open && (
          <ul>
            <li>
              <RangeFilter setFilter={() => {}} filter={{}} />
            </li>
            {Object.values(datasets).map((dataset) => (
              <DatasetMenu
                key={`datasetMenu[${dataset.id}]`}
                dataset={dataset}
                fields={
                  filtersConfig && filtersConfig.config.fieldsToShow[dataset.id]
                    ? dataset.fields.filter((field) =>
                        filtersConfig.config.fieldsToShow[dataset.id].find(({ name }) => name === field.name)
                      )
                    : []
                }
                unfolded={dataset.id === unfoldedDataset}
                onClick={() => setUnfoldedDataset(dataset.id)}
              />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
})`
  color: white;
  background-color: black;
`;
