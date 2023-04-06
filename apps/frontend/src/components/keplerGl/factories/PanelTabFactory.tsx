import React from 'react';
import KeplerPanelTabFactory, { StyledPanelTab } from 'kepler.gl/dist/components/side-panel/panel-tab';
import { Tooltip } from 'kepler.gl/dist/components/common/styled-components';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const DatatlasPanelTab = styled(StyledPanelTab)`
  width: auto;
`;

function PanelTabFactory() {
  return ({ isActive, onClick, panel }) => (
    <DatatlasPanelTab data-tip data-for={`${panel.id}-nav`} active={isActive} onClick={onClick}>
      <panel.iconComponent height="20px" />
      <FormattedMessage id={panel.label || panel.id} />
      <Tooltip id={`${panel.id}-nav`} effect="solid" delayShow={500} place="bottom">
        <span>
          <FormattedMessage id={panel.label || panel.id} />
        </span>
      </Tooltip>
    </DatatlasPanelTab>
  );
}

export function replacePanelTab() {
  return [KeplerPanelTabFactory, PanelTabFactory];
}
