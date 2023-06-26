import React from 'react';
import { createSelector } from 'reselect';
import styled from 'styled-components';
import get from 'lodash.get';
import { ALL_FIELD_TYPES, FILTER_TYPES } from 'kepler.gl/dist/constants/default-settings';
import KeplerFilterPanelFactory from 'kepler.gl/dist/components/side-panel/filter-panel/filter-panel';
import Switch from 'kepler.gl/dist/components/common/switch';
import { PanelLabel, StyledFilterContent } from 'kepler.gl/dist/components/common/styled-components';
import { Datasets } from 'kepler.gl/src/reducers/vis-state-updaters';
import { Filter, SetFilter } from '@datatlas/models';
import { FormattedMessage } from 'react-intl';
import InfoHelperFactory from 'kepler.gl/dist/components/common/info-helper';

const StyledFilterPanel = styled.div`
  margin-bottom: 12px;
  border-radius: 1px;
`;

const StyledConfigHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  background-color: ${(props) => props.theme.panelContentBackground};
  padding: 12px;

  :hover {
    cursor: pointer;
    .config__label {
      color: ${(props) => props.theme.textColorHl};
    }

    .config__action {
      color: ${(props) => props.theme.textColorHl};
    }
  }
`;

const ConfigLabelContainer = styled.div`
  line-height: 12px;
  margin-left: ${(props) => props.theme.layerConfigGroupLabelMargin};
  padding-left: ${(props) => props.theme.layerConfigGroupLabelPadding};

  display: flex;
  align-items: center;

  span {
    color: ${(props) => props.theme.textColor};
    font-weight: 500;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    margin-left: ${(props) => props.theme.layerConfigGroupLabelLabelMargin};
    font-size: ${(props) => props.theme.layerConfigGroupLabelLabelFontSize};
  }
`;

export const StyledConfigAction = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
`;

export interface FilterPanelProps {
  idx: number;
  filters: Filter[];
  filter: Filter;
  setFilter: SetFilter;
  removeFilter: () => void;
  enlargeFilter: () => void;
  toggleAnimation: () => void;
  toggleFilterFeature: () => void;
  datasets?: Datasets;
  showDatasetTable?: () => void;
  isAnyFilterAnimating?: boolean;
}

function FilterPanelFactory(
  NewFilterPanel,
  TimeRangeFilterPanel,
  SingleSelectFilterPanel,
  MultiSelectFilterPanel,
  RangeFilterPanel,
  PolygonFilterPanel,
  InfoHelper
) {
  const FilterPanelComponents = {
    default: NewFilterPanel,
    [FILTER_TYPES.timeRange]: TimeRangeFilterPanel,
    [FILTER_TYPES.select]: SingleSelectFilterPanel,
    [FILTER_TYPES.multiSelect]: MultiSelectFilterPanel,
    [FILTER_TYPES.range]: RangeFilterPanel,
    [FILTER_TYPES.polygon]: PolygonFilterPanel,
  };

  return ({ idx, setFilter, ...props }: FilterPanelProps) => {
    /* selectors */
    const fieldsSelector = (props) => {
      const datasetId = props.filter.dataId[0];
      if (!datasetId) {
        return [];
      }
      return get(props, ['datasets', datasetId, 'fields'], []);
    };

    const filterSelector = (props) => props.filters;
    const nameSelector = (props) => props.filter.name;
    const dataIdSelector = (props) => props.filter.dataId[0];

    // only show current field and field that's not already been used as a filter
    const availableFieldsSelector = createSelector(
      fieldsSelector,
      filterSelector,
      nameSelector,
      dataIdSelector,
      (fields, filters, name, dataId) =>
        fields.filter(
          (f) =>
            f.type &&
            f.type !== ALL_FIELD_TYPES.geojson &&
            (f.name === name || !filters.find((d) => d.name === f.name && d.dataId === dataId))
        )
    );

    const { filter } = props;
    const FilterFilterComponent = (filter.type && FilterPanelComponents[filter.type]) || FilterPanelComponents.default;
    const allAvailableFields = availableFieldsSelector(props);

    return (
      <StyledFilterPanel className="filter-panel">
        <FilterFilterComponent allAvailableFields={allAvailableFields} {...props} />
        <StyledConfigHeader className="layer-config-group__header">
          <ConfigLabelContainer className="config__label">
            <span>
              <FormattedMessage
                id={'filterManager.filter.make_public.label'}
                defaultMessage={'filterManager.filter.make_public.label'}
              />
            </span>
            <InfoHelper
              description={'filterManager.filter.make_public.tooltip'}
              id={'filterManager.filter.make_public.label'}
            />
          </ConfigLabelContainer>
          <StyledConfigAction className="layer-config-group__action">
            <Switch
              checked={filter.public}
              id={`${filter.id}-toggle`}
              onChange={() => setFilter(idx, 'public', !filter.public)}
              secondary
            />
          </StyledConfigAction>
        </StyledConfigHeader>
      </StyledFilterPanel>
    );
  };
}

FilterPanelFactory.deps = KeplerFilterPanelFactory.deps.concat(InfoHelperFactory);

export function replaceFilterPanel() {
  return [KeplerFilterPanelFactory, FilterPanelFactory];
}
