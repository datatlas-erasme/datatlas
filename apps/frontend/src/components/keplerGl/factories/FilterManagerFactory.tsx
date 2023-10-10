import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  FilterManagerFactory as KeplerFilterManagerFactory,
  PanelHeaderActionFactory,
  LayerTitleSectionFactory,
} from 'kepler.gl/dist/components';
import { SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';
import { Add, Table } from 'kepler.gl/dist/components/common/icons';
import { PanelComponentPropsInterface } from '../types/PanelComponentPropsInterface';
import { SortableLayerList } from '../side-panel/layer/SortableLayerList';
import { LayerPanel } from '../side-panel/layer/LayerPanel';
import { LayerPanelHeader } from '../side-panel/layer/LayerPanelHeader';
import { StyledLayerConfigurator } from './configurator';

function FilterManagerFactory(SourceDataCatalog, FilterPanel) {
  const PanelHeaderAction = PanelHeaderActionFactory();
  const LayerTitleSection = LayerTitleSectionFactory();

  const FilterManager = ({
    filters = [],
    datasets,
    layers,
    layerOrder,
    showDatasetTable,
    visStateActions: {
      reorderLayer,
      layerConfigChange,
      addFilter,
      enlargeFilter,
      removeFilter,
      setFilter,
      toggleAnimation,
      toggleFilterFeature,
    },
  }: PanelComponentPropsInterface) => {
    const isAnyFilterAnimating = filters.some((f) => f.isAnimating);
    const hadEmptyFilter = (reversedIndex) => reversedIndex.map((idx) => filters[idx]).some((f) => !f.name);
    const reversedIndexGroupedByLayerIdx = useMemo(() => {
      return layers.reduce(
        (filtersGroupedByLayerIdx, layer, layerIdx) => ({
          ...filtersGroupedByLayerIdx,
          [layerIdx]: filters.reduce((reversedIndex, filter, filterIdx) => {
            if (filter.dataId.includes(layer.config.dataId)) {
              reversedIndex.unshift(filterIdx);
            }

            return reversedIndex;
          }, []),
        }),
        {}
      );
      // eslint-disable-next-line
    }, [layers.length, filters.length]);

    const handleUpdateLayerLabel =
      (layer) =>
      ({ target: { value } }) => {
        layerConfigChange(layer, { label: value });
      };

    const handleToggleLayerPanel = (layer) => (e) => {
      e.stopPropagation();
      const {
        config: { isConfigActive },
      } = layer;
      layerConfigChange(layer, { isConfigActive: !isConfigActive });
    };

    return (
      <div className="filter-manager">
        <SidePanelSection>
          <SortableLayerList
            layers={layers}
            layerOrder={layerOrder}
            reorderLayer={reorderLayer}
            layerConfigChange={layerConfigChange}
            renderLayerListItem={(layer, layerIdx) => (
              <LayerPanel
                isActive={layer.config.isConfigActive}
                header={
                  <LayerPanelHeader
                    isActive={layer.config.isConfigActive}
                    isDragNDropEnabled={true}
                    labelRCGColorValues={layer.config.color}
                    onToggleEnableConfig={handleToggleLayerPanel(layer)}
                    layerTitleSection={
                      <LayerTitleSection
                        layerId={layer.id}
                        label={layer.config.label}
                        onUpdateLayerLabel={handleUpdateLayerLabel(layer)}
                        layerType={layer.type}
                      />
                    }
                  >
                    <PanelHeaderAction
                      className="layer__show-data-table"
                      id={layer.id}
                      tooltip={'datasetTitle.showDataTable'}
                      onClick={(e) => {
                        e.preventDefault();
                        showDatasetTable(layer.config.dataId);
                      }}
                      IconComponent={Table}
                    />

                    <PanelHeaderAction
                      className="layer__add-filter"
                      id={layer.id}
                      tooltip={'filterManager.addFilter'}
                      inactive={hadEmptyFilter(reversedIndexGroupedByLayerIdx[layerIdx])}
                      onClick={(e) => {
                        e.preventDefault();
                        addFilter(layer.config.dataId);
                      }}
                      IconComponent={Add}
                    />
                  </LayerPanelHeader>
                }
              >
                <StyledLayerConfigurator>
                  {reversedIndexGroupedByLayerIdx[layerIdx].map((idx) => (
                    <FilterPanel
                      key={`${filters[idx].id}-${idx}`}
                      idx={idx}
                      filters={filters}
                      filter={filters[idx]}
                      datasets={datasets}
                      layers={layers}
                      isAnyFilterAnimating={isAnyFilterAnimating}
                      removeFilter={() => removeFilter(idx)}
                      enlargeFilter={() => enlargeFilter(idx)}
                      toggleAnimation={() => toggleAnimation(idx)}
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

  FilterManager.propTypes = {
    datasets: PropTypes.object,
    layers: PropTypes.arrayOf(PropTypes.any).isRequired,
    filters: PropTypes.arrayOf(PropTypes.any).isRequired,
    showDatasetTable: PropTypes.func.isRequired,
    visStateActions: PropTypes.object.isRequired,

    // fields can be undefined when dataset is not selected
    fields: PropTypes.arrayOf(PropTypes.any),
  };

  return FilterManager;
}

FilterManagerFactory.deps = KeplerFilterManagerFactory.deps;

export function replaceFilterManager() {
  return [KeplerFilterManagerFactory, FilterManagerFactory];
}
