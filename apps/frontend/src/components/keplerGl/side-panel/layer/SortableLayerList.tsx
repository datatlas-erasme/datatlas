import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps } from 'react-sortable-hoc';
import classnames from 'classnames';
import styled from 'styled-components';
import { Layer } from 'kepler.gl';
import { arrayMove } from 'kepler.gl/dist/utils/data-utils';
import { PanelComponentPropsInterface } from '../../types/PanelComponentPropsInterface';

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

const SortableItem: React.ComponentClass<SortableElementProps & PropsWithChildren<{ isSorting: boolean }>> =
  SortableElement(({ children, isSorting }) => (
    <SortableStyledItem className={classnames('sortable-layer-items', { sorting: isSorting })}>
      {children}
    </SortableStyledItem>
  ));

const WrappedSortableContainer: React.ComponentClass<SortableContainerProps & PropsWithChildren> = SortableContainer(
  ({ children }) => <div>{children}</div>
);

export interface SortableLayerPanelPropsInterface {
  layers: PanelComponentPropsInterface['layers'];
  layerOrder: PanelComponentPropsInterface['layerOrder'];
  reorderLayer: PanelComponentPropsInterface['visStateActions']['reorderLayer'];
  layerConfigChange: PanelComponentPropsInterface['visStateActions']['layerConfigChange'];
  renderLayerListItem: (layer: Layer, layerIdx: number) => ReactNode;
}
export const SortableLayerList = ({
  layers,
  layerOrder,
  reorderLayer,
  layerConfigChange,
  renderLayerListItem,
}: SortableLayerPanelPropsInterface) => {
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const _handleSort = ({ oldIndex, newIndex }) => {
    reorderLayer(arrayMove(layerOrder, oldIndex, newIndex));
    setIsSorting(false);
  };

  const _onSortStart = () => {
    setIsSorting(true);
  };

  const _updateBeforeSortStart = ({ index }) => {
    // if layer config is active, close it
    const layerIdx = layerOrder[index];
    if (layers[layerIdx].config.isConfigActive) {
      layerConfigChange(layers[layerIdx], { isConfigActive: false });
    }
  };

  return (
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
              {renderLayerListItem(layers[layerIdx], layerIdx)}
            </SortableItem>
          )
      )}
    </WrappedSortableContainer>
  );
};
