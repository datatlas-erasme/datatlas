import React, { LiHTMLAttributes, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import classNames from 'classnames';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import type { Layer } from 'kepler.gl/src';
import { Filter, SetFilter } from '@datatlas/models';
import { FilterField } from '../keplerGl/factories';
import { MenuIcon } from './MenuIcon';
import { FilterFactory } from './FilterFactory';
import { LayerConfigChange, MenuSectionHeading } from './MapMenu';
import { grayscale, rgbToHsl, toCss } from '../../utils/color';

const ToggleVisibilityMenuIcon = styled(({ visible, ...props }) => (
  <MenuIcon {...props}>{visible ? 'OUI' : 'NON'}</MenuIcon>
))`
  width: 52px;
  padding: 3px 7px 3px 7px;
  border: 1px solid white;
  border-radius: 17px;
  background-color: ${({ visible }) => (visible ? 'white' : 'black')};
  color: ${({ visible }) => (visible ? 'black' : 'white')};
  font-size: 10px;
`;

const FoldableItem = styled.div<Pick<DatasetMenuProps, 'unfolded'>>`
  display: ${({ unfolded }) => (unfolded ? 'flex' : 'none')};
  flex-direction: column;
`;

const DatasetMenuHeading = styled(MenuSectionHeading)<Pick<DatasetMenuProps, 'layer'>>`
  color: ${({ layer }) => (layer.config.isVisible ? 'white' : '#b2B2B2')};
  background-color: #0c0c0c;
  border-radius: 7px;

  :hover {
    color: ${({ layer }) => `rgba(255, 255, 255, ${layer.config.isVisible ? 1 : 0.9})`};
    background-color: #202020;
  }

  :active {
    color: ${({ layer }) => `rgba(255, 255, 255, ${layer.config.isVisible ? 1 : 0.8})`};
    background-color: #383838;
  }
`;

interface DatasetMenuProps extends LiHTMLAttributes<HTMLLIElement> {
  datasets: Datasets;
  fields?: FilterField[];
  filters: Filter[];
  layer: Layer;
  unfolded?: boolean;
  setUnfolded?: () => void;
  reversedIndex: number[]; // An array of filters index in reverse order.
  setFilter: SetFilter;
  layerConfigChange: LayerConfigChange;
}

export const DatasetMenu = ({
  datasets,
  filters,
  unfolded,
  setUnfolded,
  fields,
  reversedIndex,
  layer,
  setFilter,
  layerConfigChange,
  ...props
}: DatasetMenuProps) => {
  const [unfoldedFilter, setUnfoldedFilter] = useState<number | null>(null);
  const toggleLayerVisibility = (e) => {
    e.stopPropagation();
    const isVisible = !layer.config.isVisible;
    layerConfigChange(layer, { isVisible });
  };

  const hslLayerColor = rgbToHsl(layer.config.color);
  const hslColor = !layer.config.isVisible ? grayscale(hslLayerColor) : hslLayerColor;
  const hslCssColor = toCss(hslColor);

  return (
    <li {...props} className={classNames(['dataset-menu', unfolded ? 'unfolded' : ''])}>
      <DatasetMenuHeading as="button" onClick={setUnfolded} role="button" layer={layer}>
        <h2>{layer.config.label}</h2>
        <MenuIcon style={{ backgroundColor: `hsl(${hslCssColor})`, height: 13, width: 13 }} />
      </DatasetMenuHeading>
      <FoldableItem unfolded={unfolded}>
        <MenuSectionHeading
          as="button"
          className="dataset-menu__show-dataset"
          onClick={toggleLayerVisibility}
          tabIndex={layer.idx}
        >
          <span>
            <FormattedMessage id={'map_menu.dataset.show_dataset'} defaultMessage={'Show dataset'} />
          </span>
          <ToggleVisibilityMenuIcon visible={layer.config.isVisible} />
        </MenuSectionHeading>
        {reversedIndex.length > 0 && (
          <ul>
            {reversedIndex.map((idx) => (
              <li key={`filters-${idx}`}>
                <MenuSectionHeading
                  as="button"
                  style={{
                    backgroundColor: `hsl(${hslCssColor})`,
                  }}
                  onClick={() => setUnfoldedFilter(unfoldedFilter === idx ? null : idx)}
                >
                  <h3>{filters[idx].name}</h3>
                </MenuSectionHeading>
                <FoldableItem unfolded={unfoldedFilter === idx}>
                  <FilterFactory idx={idx} setFilter={setFilter} filter={filters[idx]} layer={layer} />
                </FoldableItem>
              </li>
            ))}
          </ul>
        )}
        <MenuSectionHeading className="dataset-menu__dataset-infos">
          <span>
            <FormattedMessage id={'map_menu.dataset.infos'} defaultMessage={'Dataset infos'} />
          </span>
          <MenuIcon>🛈</MenuIcon>
        </MenuSectionHeading>
      </FoldableItem>
    </li>
  );
};
