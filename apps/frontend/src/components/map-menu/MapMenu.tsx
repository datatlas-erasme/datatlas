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
    const [open, setOpen] = useState<boolean>(false);
    const [unfoldedDataset, setUnfoldedDataset] = useState<KeplerTable['id'] | null>(null);

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
          <MenuSectionHeading as="a" className="map-menu__header" onClick={() => setOpen(!open)}>
            <span>
              <FormattedMessage id={'map_menu.title'} defaultMessage={'Datasets'} />
            </span>
            <ToggleMenuButton open={open} />
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
                  setUnfolded={() => setUnfoldedDataset(unfoldedDataset === layerIdx ? null : layerIdx)}
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
  font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
  min-width: 333px;
  justify-content: end;

  ul,
  ul > ul {
    padding: 0;
  }

  li {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    line-height: initial;
  }

  .map-menu__header {
    margin-bottom: 13px;
    border-bottom: 0;
  }

  .map-menu__header,
  ${MultiSelectFilterOption}, .dataset-menu__show-dataset {
    padding: 13px 15px 13px 17px;
  }

  .map-menu__header span,
  ${MultiSelectFilterOption}, .dataset-menu__show-dataset span,
  .dataset-menu__dataset-infos span {
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 14px;
    font-weight: 500;
  }

  .dataset-menu__dataset-infos > * {
    display: none;
  }

  ${MenuSectionHeading} h2, ${MenuSectionHeading} h3 {
    font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 24px;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 130%;
  }

  ${MenuSectionHeading} {
    padding: 17px 15px 15px 17px;
  }

  a${MenuSectionHeading} {
    user-select: none;
  }

  li.first-element > ${MenuSectionHeading}, li.first-element > ul > li {
    background-color: black;
    border-radius: 7px;
    margin-bottom: 7px;
  }

  ${MenuSectionHeading}, ${MultiSelectFilterOption} {
    display: flex;
    column-gap: 13px;
  }

  ul .unfolded ${MenuSectionHeading}, ${MultiSelectFilterOption} {
    border-bottom: 1px solid white;
  }

  ul li ${MenuSectionHeading}:last-child {
    border-bottom: 0;
  }

  ul li ${MenuSectionHeading} + .range-slider__container {
    padding: 1px 9px 13px 11px;
  }
`;
