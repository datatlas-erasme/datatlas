/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { createSelector } from 'reselect';
import styled from 'styled-components';
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
import { HintText } from '../base';
import { Warning } from 'kepler.gl/dist/components/common/icons';
import { themeColors } from '../../../style/constants';
import { FormattedMessage } from 'react-intl';

const StyledSidePanelSection = styled(SidePanelSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.sidePanelHeaderBg};

  p {
    font-size: ${({ theme }) => theme.fontSizeXsmall};
    margin: 5px 0;
  }
  a {
    font-weight: 700;
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
        <StyledSidePanelSection>
          <AddDataButton onClick={showAddDataModal} isInactive={!defaultDataset} width={'auto'} />
          <HintText>
            <Warning stroke={themeColors.greyMedium} />
            <FormattedMessage id={'layerManager.dataWeight'} />
          </HintText>

          <p>
            <FormattedMessage id={'layerManager.fileFormat'} />
          </p>
          <p>
            <FormattedMessage
              id={'layerManager.contactUs'}
              values={{ link: <a href={'https://data.grandlyon.com/'}>Contactez-nous</a> }}
            />
          </p>
        </StyledSidePanelSection>
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
      </div>
    );
  };
};

LayerManagerFactory.deps = KeplerLayerManagerFactory.deps;

export function replaceLayerManager() {
  return [KeplerLayerManagerFactory, LayerManagerFactory];
}
