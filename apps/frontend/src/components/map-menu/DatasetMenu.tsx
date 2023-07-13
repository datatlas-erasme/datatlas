import React, { LiHTMLAttributes, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import classNames from 'classnames';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import type { Layer } from 'kepler.gl/src';
import { Filter, SetFilter } from '@datatlas/models';
import { FilterField } from '../keplerGl/factories';
import { MenuIcon, MenuIconButton } from './MenuIcon';
import { FilterFactory } from './FilterFactory';
import { LayerConfigChange, MenuSectionHeading } from './MapMenu';

const FoldableItem = styled.div<Pick<DatasetMenuProps, 'unfolded'>>`
  display: ${({ unfolded }) => (unfolded ? 'initial' : 'none')};
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

  return (
    <li {...props} className={classNames(['dataset-menu', unfolded ? 'unfolded' : ''])}>
      <MenuSectionHeading as="a" onClick={setUnfolded}>
        <h2>{layer.config.label}</h2>
        <MenuIcon style={{ backgroundColor: `rgb(${layer.config.color})`, height: 13, width: 13 }} />
      </MenuSectionHeading>
      <FoldableItem unfolded={unfolded}>
        <MenuSectionHeading as="a" className="dataset-menu__show-dataset" onClick={toggleLayerVisibility}>
          <span>
            <FormattedMessage id={'map_menu.dataset.show_dataset'} defaultMessage={'Show dataset'} />
          </span>
          <MenuIconButton>{layer.config.isVisible ? '👁' : '🕶'}</MenuIconButton>
        </MenuSectionHeading>
        {reversedIndex.length > 0 && (
          <ul>
            {reversedIndex.map((idx) => (
              <li key={`filters-${idx}`}>
                <MenuSectionHeading
                  as="a"
                  style={{ backgroundColor: `rgb(${layer.config.color})` }}
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
