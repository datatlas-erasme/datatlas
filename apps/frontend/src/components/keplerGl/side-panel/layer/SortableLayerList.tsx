import React, {ReactNode, useMemo} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import {Layer} from '@kepler.gl/layers';

import {useSortable, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {findById} from '@kepler.gl/utils';
import {dataTestIds, SORTABLE_LAYER_TYPE, SORTABLE_SIDE_PANEL_TYPE} from '@kepler.gl/constants';
import {LayerListProps} from '@kepler.gl/components';
import {UiStateActionHandlers, VisStateActionHandlers} from '../../factories';
import {Factory} from '@kepler.gl/components/dist/injector';

export type SortableLayerListProps = Omit<LayerListProps, 'uiStateActions' | 'visStateActions'> & {
  renderLayerListItem: (layer: Layer, layerIdx: number) => ReactNode;
  uiStateActions: UiStateActionHandlers;
  visStateActions: VisStateActionHandlers;
};

// make sure the element is always visible while is being dragged
// item being dragged is appended in body, here to reset its global style

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface SortableStyledItemProps {
  transition?: string;
  transform?: string;
}

const SortableStyledItem = styled.div<SortableStyledItemProps>`
  z-index: ${props => props.theme.dropdownWrapperZ + 1};
  transition: ${props => props.transition};
  transform: ${props => props.transform};
  &.sorting {
    opacity: 0.3;
    pointer-events: none;
  }
  &.sorting-layers .layer-panel__header {
    background-color: ${props => props.theme.panelBackgroundHover};
    font-family: ${props => props.theme.fontFamily};
    font-weight: ${props => props.theme.fontWeight};
    font-size: ${props => props.theme.fontSize};
    line-height: ${props => props.theme.lineHeight};
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }
    .layer__drag-handle {
      opacity: 1;
      color: ${props => props.theme.textColorHl};
    }
  }
`;

const INITIAL_LAYERS_TO_SHOW: Layer[] = [];

SortableLayerListFactory.deps = [];

export function SortableLayerListFactory() {
  // By wrapping layer panel using a sortable element we don't have to implement the drag and drop logic into the panel itself;
  // Developers can provide any layer panel implementation and it will still be sortable
  const SortableItem = ({layer, idx, panelProps, layerActions, disabled, children}) => {
    const {attributes, setNodeRef, isDragging, transform, transition} = useSortable({
      id: layer.id,
      data: {
        type: SORTABLE_LAYER_TYPE,
        parent: SORTABLE_SIDE_PANEL_TYPE
      },
      disabled
    });

    return (
      <SortableStyledItem
        ref={setNodeRef}
        className={classnames(
          {[dataTestIds.sortableLayerItem]: !disabled},
          {[dataTestIds.staticLayerItem]: disabled},
          {sorting: isDragging}
        )}
        data-testid={disabled ? dataTestIds.staticLayerItem : dataTestIds.sortableLayerItem}
        transform={CSS.Transform.toString(transform)}
        transition={transition}
        {...attributes}
      >
        {children}
      </SortableStyledItem>
    );
  };

  const SortableLayerList: React.FC<SortableLayerListProps> = props => {
    const {
      layers,
      datasets,
      layerOrder,
      uiStateActions,
      visStateActions,
      layerClasses,
      isSortable = true,
      renderLayerListItem
    } = props;
    const {toggleModal: openModal} = uiStateActions;

    const layersToShow = useMemo(() => {
      return layerOrder.reduce((acc, layerId) => {
        const layer = findById(layerId)(layers.filter(Boolean));
        if (!layer) {
          return acc;
        }
        return !layer.config.hidden ? [...acc, layer] : acc;
      }, INITIAL_LAYERS_TO_SHOW);
    }, [layers, layerOrder]);

    const sidePanelDndItems = useMemo(() => {
      return layersToShow.map(({id}) => id);
    }, [layersToShow]);

    const layerTypeOptions = useMemo(
      () =>
        Object.keys(layerClasses).map(key => {
          const layer = new layerClasses[key]({dataId: ''});
          return {
            id: key,
            label: layer.name,
            icon: layer.layerIcon,
            requireData: layer.requireData
          };
        }),
      [layerClasses]
    );

    const layerActions = useMemo(
      () => ({
        layerColorUIChange: visStateActions.layerColorUIChange,
        layerConfigChange: visStateActions.layerConfigChange,
        layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
        layerTypeChange: visStateActions.layerTypeChange,
        layerVisConfigChange: visStateActions.layerVisConfigChange,
        layerTextLabelChange: visStateActions.layerTextLabelChange,
        removeLayer: visStateActions.removeLayer,
        duplicateLayer: visStateActions.duplicateLayer,
        layerSetIsValid: visStateActions.layerSetIsValid
      }),
      [visStateActions]
    );

    const panelProps = useMemo(
      () => ({
        datasets,
        openModal,
        layerTypeOptions
      }),
      [datasets, openModal, layerTypeOptions]
    );

    return (
      <Container>
        <SortableContext
          id={SORTABLE_SIDE_PANEL_TYPE}
          items={sidePanelDndItems}
          strategy={verticalListSortingStrategy}
          disabled={!isSortable}
        >
          {/* warning: containerId should be similar to the first key in dndItems defined in kepler-gl.js*/}
          {layersToShow.map(layer => (
            <SortableItem
              key={layer.id}
              layer={layer}
              idx={layers.findIndex(l => l?.id === layer.id)}
              panelProps={panelProps}
              layerActions={layerActions}
              disabled={!isSortable}
            >
              {renderLayerListItem(
                layer,
                layers.findIndex(l => l?.id === layer.id)
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </Container>
    );
  };
  return SortableLayerList;
}

export function provideSortableLayerListFactory(): [Factory, Factory] {
  // @ts-ignore
  return [SortableLayerListFactory, SortableLayerListFactory];
}
