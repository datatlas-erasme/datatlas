import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import { KeplerTable, Layer } from 'kepler.gl/src';
import { Filter, FiltersConfigInterface, SetFilter } from '@datatlas/models';
import { MenuIconButton } from './MenuIcon';
import { DatasetMenu } from './DatasetMenu';
import { MultiSelectFilterOption } from './MultiSelectFillter';

export const ToggleMenuButton = ({ open, ...props }) => <MenuIconButton {...props}>{open ? '⨯' : '☰'}</MenuIconButton>;

export type LayerConfigChange = (oldLayer: Layer, newConfig: Partial<Layer>) => void;

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

export const MapMenu = styled(
  ({ datasets, filters = [], layers, layerConfigChange, filtersConfig, setFilter, ...props }: MenuProps) => {
    const [open, setOpen] = useState<boolean>(true);
    const [unfoldedDataset, setUnfoldedDataset] = useState<KeplerTable['id']>();

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
            <span>
              <FormattedMessage id={'map_menu.title'} defaultMessage={'Datasets'} />
            </span>
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

  ${MenuSectionHeading}, ${MultiSelectFilterOption} {
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
  ${MultiSelectFilterOption} {
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
`;
