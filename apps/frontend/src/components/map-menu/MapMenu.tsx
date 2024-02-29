import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { KeplerTable, Datasets } from '@kepler.gl/table';
import { Layer, LayerBaseConfig } from '@kepler.gl/layers';
import { Filter, FiltersConfigInterface, SetFilter } from '@datatlas/models';
import { MenuIcon } from './MenuIcon';
import { DatasetMenu } from './DatasetMenu';
import { MultiSelectFilterOption } from './MultiSelectFillter';

export const ToggleMenuIcon = ({ open, ...props }) => <MenuIcon {...props}>{open ? '⨯' : '☰'}</MenuIcon>;

interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  datasets: Datasets;
  filtersConfig?: FiltersConfigInterface;
  filters: Filter[];
  layers: Layer[];
  setFilter: SetFilter;
  layerConfigChange: (oldLayer: Layer, newConfig: Partial<LayerBaseConfig>) => void;
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

    const reversedIndexGroupedByLayerIdx: Record<number, number[]> = useMemo(() => {
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
        <li className="map-menu__list-item-container">
          <MenuSectionHeading as="button" className="map-menu__header" onClick={() => setOpen(!open)}>
            <span>
              <FormattedMessage id={'map_menu.title'} defaultMessage={'Datasets'} />
            </span>
            <ToggleMenuIcon open={open} />
          </MenuSectionHeading>
          {open && (
            <ul>
              {Object.keys(reversedIndexGroupedByLayerIdx).map((layerIdx) => (
                <DatasetMenu
                  idx={parseInt(layerIdx)}
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
  justify-content: end;

  ul,
  ul > ul {
    padding: 0;
  }

  li.map-menu__list-item-container {
    width: 350px;
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
    padding: 19px 21px 19px 23px;
  }

  .map-menu__header span,
  ${MultiSelectFilterOption}, .dataset-menu__show-dataset span,
  .dataset-menu__dataset-infos span {
    font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 15px;
    font-weight: 500;
  }

  .dataset-menu__dataset-infos > * {
    display: none;
  }

  ${MenuSectionHeading} {
    display: flex;
    padding: 23px 21px 21px 23px;
    h2,
    h3 {
      font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
      font-size: 24px;
      font-weight: 400;
      text-transform: capitalize;
      line-height: 130%;
    }
  }

  button${MenuSectionHeading} {
    :hover {
      color: rgba(255, 255, 255, 0.9);
      background-color: #202020;
    }

    :active {
      color: rgba(255, 255, 255, 0.8);
      background-color: #383838;
    }
  }

  li.map-menu__list-item-container > ${MenuSectionHeading}, li.map-menu__list-item-container > ul > li {
    background-color: #0c0c0c;
    border-radius: 7px;
    margin-bottom: 7px;
  }

  ${MenuSectionHeading}, ${MultiSelectFilterOption} {
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
