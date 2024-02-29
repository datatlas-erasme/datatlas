import React, {useMemo} from 'react';
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import {
  AddDataButtonFactory,
  SidePanelSection,
  LayerManagerFactory as KeplerLayerManagerFactory,
  LayerPanelFactory as KeplerLayerPanelFactory
} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
import {Warning} from '@kepler.gl/components/dist/common/icons';
import {HintText} from '../base';
import {themeColors} from '../../../style/constants';
import {LayerManagerProps} from '../types/LayerManagerProps';
import {SortableLayerListFactory} from '../side-panel/layer/SortableLayerList';
import {LayerTypeOptionInterface, PanelComponentPropsInterface} from '../types';
import {UiStateActionHandlers, VisStateActionHandlers} from './FilterManagerFactory';

const StyledSidePanelSection = styled(SidePanelSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background-color: ${({theme}) => theme.sidePanelHeaderBg};

  p {
    font-size: ${({theme}) => theme.fontSizeXsmall};
    margin: 5px 0;
  }

  a {
    font-weight: 700;
  }
`;

export type LayerActionsInterface = Pick<
  VisStateActionHandlers,
  | 'layerColorUIChange'
  | 'layerConfigChange'
  | 'layerVisualChannelConfigChange'
  | 'layerTypeChange'
  | 'layerVisConfigChange'
  | 'layerTextLabelChange'
  | 'removeLayer'
  | 'duplicateLayer'
  | 'removeDataset'
  | 'showDatasetTable'
  | 'layerSetIsValid'
> & {
  openModal: UiStateActionHandlers['toggleModal'];
};

export interface PanelPropsInterface {
  datasets: PanelComponentPropsInterface['datasets'];
  layerTypeOptions: LayerTypeOptionInterface[];
}

LayerManagerFactory.deps = [
  SortableLayerListFactory,
  AddDataButtonFactory,
  KeplerLayerPanelFactory
];

function LayerManagerFactory(
  SortableLayerList: ReturnType<typeof SortableLayerListFactory>,
  AddDataButton: ReturnType<typeof AddDataButtonFactory>,
  LayerPanel: ReturnType<typeof KeplerLayerPanelFactory>
) {
  return ({
    datasets,
    layerOrder,
    layerClasses,
    layers,
    uiStateActions,
    visStateActions,
    showAddDataModal
  }: LayerManagerProps) => {
    const defaultDataset = Object.keys(datasets)[0];

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

    const layerActions: LayerActionsInterface = {
      layerColorUIChange: visStateActions.layerColorUIChange,
      layerConfigChange: visStateActions.layerConfigChange,
      layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
      layerTypeChange: visStateActions.layerTypeChange,
      layerVisConfigChange: visStateActions.layerVisConfigChange,
      layerTextLabelChange: visStateActions.layerTextLabelChange,
      removeLayer: visStateActions.removeLayer,
      duplicateLayer: visStateActions.duplicateLayer,
      showDatasetTable: visStateActions.showDatasetTable,
      removeDataset: visStateActions.removeDataset,
      layerSetIsValid: visStateActions.layerSetIsValid,
      openModal: uiStateActions.toggleModal
    };

    return (
      <div className="layer-manager">
        <StyledSidePanelSection>
          <AddDataButton onClick={showAddDataModal} isInactive={!defaultDataset} />
          <HintText>
            <Warning stroke={themeColors.greyMedium} />
            <FormattedMessage id={'layerManager.dataWeight'} />
          </HintText>
        </StyledSidePanelSection>
        <SortableLayerList
          layers={layers}
          layerOrder={layerOrder}
          datasets={datasets}
          layerClasses={layerClasses}
          uiStateActions={uiStateActions}
          visStateActions={visStateActions}
          renderLayerListItem={(layer, layerIdx: number) => (
            <LayerPanel
              {...layerActions}
              key={layer.id}
              idx={layerIdx}
              layer={layer}
              layerTypeOptions={layerTypeOptions}
              datasets={datasets}
            />
          )}
        />
      </div>
    );
  };
}

export function replaceLayerManager(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerLayerManagerFactory, LayerManagerFactory];
}
