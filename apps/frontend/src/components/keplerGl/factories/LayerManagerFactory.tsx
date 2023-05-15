/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { createSelector } from 'reselect';
import {
  LayerManagerFactory as KeplerLayerManagerFactory,
  LayerPanelFactory as KeplerLayerPanelFactory,
  AddDataButtonFactory as KeplerAddDataButtonFactory,
} from 'kepler.gl/components';
import { SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';
import { PanelComponentPropsInterface } from '../types/PanelComponentPropsInterface';
import { uiStateActions, visStateActions } from 'kepler.gl/actions';
import { LayerTypeOptionInterface } from '../types/LayerTypeOptionInterface';
import { SortableLayerList } from '../side-panel/layer/SortableLayerList';

const layerClassSelector = (props) => props.layerClasses;
const layerTypeOptionsSelector = createSelector(layerClassSelector, (layerClasses) =>
  Object.keys(layerClasses).map((key) => {
    const layer = new layerClasses[key]();
    return {
      id: key,
      label: layer.name,
      icon: layer.layerIcon,
      requireData: layer.requireData,
    };
  })
);

export type LayerActionsInterface = Pick<
  visStateActions,
  | 'layerColorUIChange'
  | 'layerConfigChange'
  | 'layerVisualChannelConfigChange'
  | 'layerTypeChange'
  | 'layerVisConfigChange'
  | 'layerTextLabelChange'
  | 'removeLayer'
  | 'duplicateLayer'
> &
  Pick<PanelComponentPropsInterface, 'showDatasetTable' | 'removeDataset'>;

export interface PanelPropsInterface {
  datasets: PanelComponentPropsInterface['datasets'];
  openModal: uiStateActions['toggleModal'];
  layerTypeOptions: LayerTypeOptionInterface[];
}

const LayerManagerFactory = (
  AddDataButton: ReturnType<KeplerAddDataButtonFactory>,
  LayerPanel: ReturnType<KeplerLayerPanelFactory>
) => {
  // Uncomment next line to restore original behavior:
  // return KeplerLayerManagerFactory(...KeplerLayerManagerFactory.deps);

  return ({
    datasets,
    layerOrder,
    layerClasses,
    layers,
    uiStateActions,
    visStateActions,
    showAddDataModal,
    showDatasetTable,
    removeDataset,
  }: PanelComponentPropsInterface) => {
    const { toggleModal: openModal } = uiStateActions;

    const defaultDataset = Object.keys(datasets)[0];

    const layerTypeOptions = layerTypeOptionsSelector({ layerClasses });

    const layerActions: LayerActionsInterface = {
      layerColorUIChange: visStateActions.layerColorUIChange,
      layerConfigChange: visStateActions.layerConfigChange,
      layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
      layerTypeChange: visStateActions.layerTypeChange,
      layerVisConfigChange: visStateActions.layerVisConfigChange,
      layerTextLabelChange: visStateActions.layerTextLabelChange,
      removeLayer: visStateActions.removeLayer,
      duplicateLayer: visStateActions.duplicateLayer,
      showDatasetTable,
      removeDataset,
    };

    const panelProps: PanelPropsInterface = {
      datasets,
      openModal,
      layerTypeOptions,
    };

    return (
      <div className="layer-manager">
        <SortableLayerList
          layers={layers}
          layerOrder={layerOrder}
          reorderLayer={visStateActions.reorderLayer}
          layerConfigChange={visStateActions.layerConfigChange}
          renderLayerListItem={(layer, layerIdx: number) => (
            <LayerPanel
              {...panelProps}
              {...layerActions}
              sortData={layerIdx}
              key={layer.id}
              idx={layerIdx}
              layer={layer}
            />
          )}
        />
        <SidePanelSection>
          <AddDataButton onClick={showAddDataModal} isInactive={!defaultDataset} width="105px" />
        </SidePanelSection>
      </div>
    );
  };
};

LayerManagerFactory.deps = KeplerLayerManagerFactory.deps;

export function replaceLayerManager() {
  return [KeplerLayerManagerFactory, LayerManagerFactory];
}
