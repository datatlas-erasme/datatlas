import React from 'react';
import {
  PanelTabFactory as KeplerPanelTabFactory,
  PanelTabProps,
  Tooltip
} from '@kepler.gl/components';
import {StyledPanelTab as KeplerStyledPanelTab} from '@kepler.gl/components/dist/side-panel/panel-tab';
import {FormattedMessage} from 'react-intl';
import styled from 'styled-components';

const StyledPanelTab = styled(KeplerStyledPanelTab)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: ${({theme}) => theme.fontSize};
  border-right: ${({theme}) => theme.panelBorderLT};
  padding: ${({theme}) => theme.panelToggleBottomPadding}px;
  text-align: center;
`;

export function PanelTabFactory() {
  const PanelTab: React.FC<PanelTabProps> = ({isActive, onClick, panel}) => (
    <StyledPanelTab data-tip data-for={`${panel.id}-nav`} active={isActive} onClick={onClick}>
      <panel.iconComponent height="20px" />
      <FormattedMessage id={panel.label || panel.id} />
      <Tooltip id={`${panel.id}-nav`} effect="solid" delayShow={500} place="bottom">
        <span>
          <FormattedMessage id={panel.label || panel.id} />
        </span>
      </Tooltip>
    </StyledPanelTab>
  );

  return PanelTab;
}

export function replacePanelTab() {
  return [KeplerPanelTabFactory, PanelTabFactory];
}
