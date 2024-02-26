/* eslint-disable @typescript-eslint/no-empty-function */
import React, {ChangeEventHandler, MouseEventHandler, useCallback, useMemo} from 'react';
import {
  FilterManagerFactory as KeplerFilterManagerFactory,
  FilterManagerProps as KeplerFilterManagerProps,
  PanelHeaderActionFactory,
  SidePanelSection,
  LayerTitleSectionFactory,
  FilterPanelFactory
} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
import {Add, DataTable} from '@kepler.gl/components/dist/common/icons';
import {LayerPanel} from '../side-panel/layer/LayerPanel';
import {LayerPanelHeader} from '../side-panel/layer/LayerPanelHeader';
import {StyledLayerConfigurator} from '../configurator/StyledLayerConfigurator';
import {isSideFilter} from '@kepler.gl/utils';
import {FILTER_VIEW_TYPES} from '@kepler.gl/constants';
import {SortableLayerListFactory} from '../side-panel/layer/SortableLayerList';
import {Layer, LayerClassesType} from '@kepler.gl/layers';
import {ActionHandlers, UIStateActions, VisStateActions} from '@kepler.gl/actions';

FilterManagerFactory.deps = [
  FilterPanelFactory,
  LayerTitleSectionFactory,
  PanelHeaderActionFactory,
  SortableLayerListFactory
];

export type VisStateActionHandlers = ActionHandlers<typeof VisStateActions>;
export type UiStateActionHandlers = ActionHandlers<typeof UIStateActions>;

type FilterManagerProps = KeplerFilterManagerProps & {
  layerOrder: string[];
  layerClasses: LayerClassesType;
  uiStateActions: UiStateActionHandlers;
  visStateActions: VisStateActionHandlers;
};

function FilterManagerFactory(
  FilterPanel: ReturnType<typeof FilterPanelFactory>,
  LayerTitleSection: ReturnType<typeof LayerTitleSectionFactory>,
  PanelHeaderAction: ReturnType<typeof PanelHeaderActionFactory>,
  SortableLayerList: ReturnType<typeof SortableLayerListFactory>
) {
  const FilterManager: React.FC<FilterManagerProps> = ({
    filters = [],
    datasets,
    layers,
    layerOrder,
    layerClasses,
    showDatasetTable,
    visStateActions,
    uiStateActions
  }) => {
    const {
      layerConfigChange,
      addFilter,
      removeFilter,
      setFilter,
      toggleFilterFeature,
      setFilterView,
      toggleFilterAnimation
    } = visStateActions;
    const isAnyFilterAnimating = filters.some(f => f.isAnimating);
    const hadEmptyFilter = (reversedIndex: number[]) =>
      reversedIndex.map(idx => filters[idx]).some(f => !f.name);
    const reversedIndexGroupedByLayerIdx: Record<number, number[]> = useMemo(() => {
      return layers.reduce(
        (filtersGroupedByLayerIdx, layer, layerIdx) => ({
          ...filtersGroupedByLayerIdx,
          [layerIdx]: filters.reduce((reversedIndex: number[], filter, filterIdx) => {
            if (filter.dataId.includes(layer.config.dataId)) {
              reversedIndex.unshift(filterIdx);
            }

            return reversedIndex;
          }, [])
        }),
        {}
      );
      // eslint-disable-next-line
    }, [layers.length, filters]);

    const handleAddFilter = (layer: Layer) => e => {
      e?.stopPropagation();
      addFilter(layer.config.dataId);
      layerConfigChange(layer, {isConfigActive: true});
    };

    const handleUpdateLayerLabel =
      (layer): ChangeEventHandler<HTMLInputElement> =>
      ({target: {value}}) => {
        layerConfigChange(layer, {label: value});
      };

    const _toggleEnableConfig =
      (layer): MouseEventHandler =>
      e => {
        e?.stopPropagation();
        const {
          config: {isConfigActive}
        } = layer;
        layerConfigChange(layer, {isConfigActive: !isConfigActive});
      };

    const _enlargeFilter = (idx, filter) => () =>
      setFilterView(
        idx,
        isSideFilter(filter) ? FILTER_VIEW_TYPES.enlarged : FILTER_VIEW_TYPES.side
      );

    const _toggleAnimation = idx => () => toggleFilterAnimation(idx);

    return (
      <div className="filter-manager">
        <SidePanelSection>
          <SortableLayerList
            layers={layers}
            layerOrder={layerOrder}
            layerClasses={layerClasses}
            datasets={datasets}
            visStateActions={visStateActions}
            uiStateActions={uiStateActions}
            renderLayerListItem={(layer, layerIdx) => (
              <LayerPanel
                isActive={layer.config.isConfigActive}
                header={
                  <LayerPanelHeader
                    isConfigActive={layer.config.isConfigActive}
                    isDragNDropEnabled={true}
                    labelRCGColorValues={layer.config.color}
                    onToggleEnableConfig={_toggleEnableConfig(layer)}
                    layerTitleSection={
                      <LayerTitleSection
                        layerId={layer.id}
                        label={layer.config.label}
                        onUpdateLayerLabel={handleUpdateLayerLabel(layer)}
                        layerType={layer.type}
                        onFocus={() => {}}
                        onBlur={() => {}}
                      />
                    }
                  >
                    <PanelHeaderAction
                      className="layer__show-data-table"
                      id={layer.id}
                      tooltip={'datasetTitle.showDataTable'}
                      onClick={e => {
                        e?.stopPropagation();
                        showDatasetTable(layer.config.dataId);
                      }}
                      IconComponent={DataTable}
                    />

                    <PanelHeaderAction
                      className="layer__add-filter"
                      id={layer.id}
                      tooltip={'filterManager.addFilter'}
                      active={!hadEmptyFilter(reversedIndexGroupedByLayerIdx[layerIdx])}
                      onClick={handleAddFilter(layer)}
                      IconComponent={Add}
                    />
                  </LayerPanelHeader>
                }
              >
                <StyledLayerConfigurator>
                  {reversedIndexGroupedByLayerIdx[layerIdx].map(idx => (
                    <FilterPanel
                      key={`${filters[idx].id}-${idx}`}
                      idx={idx}
                      filters={filters}
                      filter={filters[idx]}
                      datasets={datasets}
                      layers={layers}
                      isAnyFilterAnimating={isAnyFilterAnimating}
                      removeFilter={() => removeFilter(idx)}
                      enlargeFilter={_enlargeFilter(idx, filters[idx])}
                      toggleAnimation={_toggleAnimation(idx)}
                      toggleFilterFeature={() => toggleFilterFeature(idx)}
                      setFilter={setFilter}
                    />
                  ))}
                </StyledLayerConfigurator>
              </LayerPanel>
            )}
          />
        </SidePanelSection>
      </div>
    );
  };

  return FilterManager;
}

export function replaceFilterManager(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerFilterManagerFactory, FilterManagerFactory];
}
