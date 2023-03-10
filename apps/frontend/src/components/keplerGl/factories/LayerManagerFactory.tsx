import { Action } from '@reduxjs/toolkit';
import React, { PropsWithChildren, UIEventHandler, useState } from 'react';
import { createSelector } from 'reselect';
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps } from 'react-sortable-hoc';
import classnames from 'classnames';
import styled from 'styled-components';
import { LayerManagerFactory as KeplerLayerManagerFactory } from 'kepler.gl/components';
import { SidePanelSection } from 'kepler.gl/dist/components/common/styled-components';
import { arrayMove } from 'kepler.gl/dist/utils/data-utils';
import { Layer, layerConfigChange } from 'kepler.gl/src';
import { DatasetInterface } from '@datatlas/models';

// make sure the element is always visible while is being dragged
// item being dragged is appended in body, here to reset its global style
const SortableStyledItem = styled.div`
  z-index: ${(props) => props.theme.dropdownWrapperZ + 1};

  &.sorting {
    pointer-events: none;
  }

  &.sorting-layers .layer-panel__header {
    background-color: ${(props) => props.theme.panelBackgroundHover};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${(props) => props.theme.fontWeight};
    font-size: ${(props) => props.theme.fontSize};
    line-height: ${(props) => props.theme.lineHeight};
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }
    .layer__drag-handle {
      opacity: 1;
      color: ${(props) => props.theme.textColorHl};
    }
  }
`;
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

const SortableItem: React.ComponentClass<SortableElementProps & PropsWithChildren<{ isSorting: boolean }>> =
  SortableElement(({ children, isSorting }) => (
    <SortableStyledItem className={classnames('sortable-layer-items', { sorting: isSorting })}>
      {children}
    </SortableStyledItem>
  ));

const WrappedSortableContainer: React.ComponentClass<SortableContainerProps & PropsWithChildren> = SortableContainer(
  ({ children }) => <div>{children}</div>
);

interface LayerManagerProps {
  datasets: Record<string, DatasetInterface>;
  layerBlending: string;
  layerClasses: Record<string, Layer>;
  layers: Layer[];
  layerOrder: number[];
  uiStateActions: Record<string, Action>;
  visStateActions: {
    addLayer: UIEventHandler;
    reorderLayer: UIEventHandler;
    layerColorUIChange: UIEventHandler;
    layerConfigChange: typeof layerConfigChange;
    layerVisualChannelConfigChange: UIEventHandler;
    layerTypeChange: UIEventHandler;
    layerVisConfigChange: UIEventHandler;
    layerTextLabelChange: UIEventHandler;
    removeLayer: UIEventHandler;
    duplicateLayer: UIEventHandler;
  };
  // functions
  removeDataset: UIEventHandler;
  showDatasetTable: UIEventHandler;
  showAddDataModal: UIEventHandler;
}

const LayerManagerFactory = (AddDataButton, LayerPanel) => {
  // To restore original behavior, you may return this component instead :
  // const KeplerLayerManager = KeplerLayerManagerFactory(AddDataButton, LayerPanel, SourceDataCatalog);

  return ({
    datasets,
    layerOrder,
    layerClasses,
    layers,
    uiStateActions,
    visStateActions,
    showAddDataModal,
  }: LayerManagerProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const { toggleModal: openModal } = uiStateActions;
    const defaultDataset = Object.keys(datasets)[0];

    const layerTypeOptions = layerTypeOptionsSelector({ layerClasses });

    const layerActions = {
      layerColorUIChange: visStateActions.layerColorUIChange,
      layerConfigChange: visStateActions.layerConfigChange,
      layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
      layerTypeChange: visStateActions.layerTypeChange,
      layerVisConfigChange: visStateActions.layerVisConfigChange,
      layerTextLabelChange: visStateActions.layerTextLabelChange,
      removeLayer: visStateActions.removeLayer,
      duplicateLayer: visStateActions.duplicateLayer,
    };

    const panelProps = {
      datasets,
      openModal,
      layerTypeOptions,
    };

    const _handleSort = ({ oldIndex, newIndex }) => {
      visStateActions.reorderLayer(arrayMove(layerOrder, oldIndex, newIndex));
      setIsSorting(false);
    };

    const _onSortStart = () => {
      setIsSorting(true);
    };

    const _updateBeforeSortStart = ({ index }) => {
      // if layer config is active, close it
      const layerIdx = layerOrder[index];
      if (layers[layerIdx].config.isConfigActive) {
        visStateActions.layerConfigChange(layers[layerIdx], { isConfigActive: false });
      }
    };

    return (
      <div className="layer-manager">
        <SidePanelSection>
          <WrappedSortableContainer
            onSortEnd={_handleSort}
            onSortStart={_onSortStart}
            updateBeforeSortStart={_updateBeforeSortStart}
            lockAxis="y"
            helperClass="sorting-layers"
            useDragHandle
          >
            {layerOrder.map(
              (layerIdx, index) =>
                !layers[layerIdx].config.hidden && (
                  <SortableItem key={`layer-${layerIdx}`} index={index} isSorting={isSorting}>
                    <LayerPanel
                      {...panelProps}
                      {...layerActions}
                      sortData={layerIdx}
                      key={layers[layerIdx].id}
                      idx={layerIdx}
                      layer={layers[layerIdx]}
                    />
                  </SortableItem>
                )
            )}
          </WrappedSortableContainer>
        </SidePanelSection>
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
