import React from 'react';
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import {
  AddDataButtonFactory,
  LayerListFactory,
  SidePanelSection,
  LayerManagerFactory as KeplerLayerManagerFactory
} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
import {Warning} from '@kepler.gl/components/dist/common/icons';
import {HintText} from '../base';
import {themeColors} from '../../../style/constants';
import {LayerManagerProps} from '../types/LayerManagerProps';

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

LayerManagerFactory.deps = [LayerListFactory, AddDataButtonFactory];

function LayerManagerFactory(
  LayerList: ReturnType<typeof LayerListFactory>,
  AddDataButton: ReturnType<typeof AddDataButtonFactory>
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
    return (
      <div className="layer-manager">
        <StyledSidePanelSection>
          <AddDataButton onClick={showAddDataModal} isInactive={!defaultDataset} />
          <HintText>
            <Warning stroke={themeColors.greyMedium} />
            <FormattedMessage id={'layerManager.dataWeight'} />
          </HintText>
        </StyledSidePanelSection>
        <LayerList
          layers={layers}
          datasets={datasets}
          layerOrder={layerOrder}
          uiStateActions={uiStateActions}
          visStateActions={visStateActions}
          layerClasses={layerClasses}
        />
      </div>
    );
  };
}

export function replaceLayerManager(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerLayerManagerFactory, LayerManagerFactory];
}
