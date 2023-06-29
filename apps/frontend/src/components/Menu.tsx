import React, { ButtonHTMLAttributes, LiHTMLAttributes, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import { Layer, KeplerTable } from 'kepler.gl/src';
import { FilterField, Option, createFilterComponent } from './keplerGl/factories';
import { Filter, FiltersConfigInterface, SetFilter } from '@datatlas/models';

export const MenuIconButton = styled(({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <MenuIcon as="button" {...props} />
))`
  cursor: pointer;
  border-radius: 50%;
`;

export const MenuIcon = styled((props) => <div {...props} />)`
  align-self: center;
  justify-self: flex-end;
  padding: 3px;
`;

export const ToggleMenuButton = ({ open, ...props }) => <MenuIconButton {...props}>{open ? '⨯' : '☰'}</MenuIconButton>;

interface FilterFactoryProps {
  idx: number;
  filter: Filter;
  setFilter: SetFilter;
  layer: Layer;
  style?: React.CSSProperties;
}

export const FilterComponentFactory = (props: FilterFactoryProps) => {
  const FilterComponent = createFilterComponent(props.filter);

  return FilterComponent && <FilterComponent {...props} />;
};

export type LayerConfigChange = (oldLayer: Layer, newConfig: Partial<Layer>) => void;

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
              <FilterComponentFactory idx={idx} setFilter={setFilter} filter={filters[idx]} layer={layer} />
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuProps {
  datasets: Datasets;
  filtersConfig?: FiltersConfigInterface;
  filters: Filter[];
  layers: Layer[];
  setFilter: SetFilter;
  layerConfigChange: LayerConfigChange;
}

export const MenuSectionHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Menu = styled(
  ({ datasets, filters = [], layers, layerConfigChange, filtersConfig, setFilter, ...props }: MenuProps) => {
    const [open, setOpen] = useState<boolean>(true);
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
    }, [layers.length, filters]);

    return (
      <ul {...props}>
        <li className="first-element">
          <MenuSectionHeading>
            <span>Recherche & filtres</span>
            <ToggleMenuButton open={open} onClick={() => setOpen(!open)} />
          </MenuSectionHeading>
          {open && (
            <ul>
              {Object.keys(reversedIndexGroupedByLayerIdx).map((layerIdx) => (
                <DatasetMenu
                  datasets={datasets}
                  reversedIndex={reversedIndexGroupedByLayerIdx[layerIdx]}
                  filters={filters}
                  layer={layers[layerIdx]}
                  setFilter={setFilter}
                  layerConfigChange={layerConfigChange}
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
  }
)`
  display: flex;
  color: white;

  // @todo remove when custom filters interfaces are implemented
  .side-panel-panel__label {
    padding-left: 13px;
    color: white;
  }

  ul,
  ul > ul {
    padding: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    line-height: initial;
  }

  li.first-element > ${MenuSectionHeading} {
    margin-bottom: 13px;
    border-bottom: 0;
    text-transform: uppercase;
  }

  li.first-element > ${MenuSectionHeading} :first-child {
    font-size: 16px;
  }

  li.first-element > ${MenuSectionHeading}, li.first-element > ul > li {
    background-color: black;
    border-radius: 7px;
    margin-bottom: 7px;
  }

  ${MenuSectionHeading}, ${Option} {
    display: flex;
    column-gap: 13px;
    padding: 13px 15px 13px 17px;
    border-bottom: 1px solid white;
  }
  ${MenuSectionHeading} :first-child {
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 500;
    line-height: 130%;
  }

  li.first-element > ${MenuSectionHeading} :first-child,
  ${MenuSectionHeading}:last-child h3,
  ${Option} {
    text-transform: uppercase;
  }

  ul li ${MenuSectionHeading}:last-child :first-child {
    font-size: 12px;
  }

  ul li ${MenuSectionHeading}:last-child > * {
    display: none;
  }

  ul li ${MenuSectionHeading} + .range-slider__container {
    padding: 1px 9px 13px 11px;
  }

  .kg-range-slider {
  }

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
