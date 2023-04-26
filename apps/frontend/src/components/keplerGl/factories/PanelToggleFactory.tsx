import React, { useCallback } from 'react';
import { PanelToggleFactory as KeplerPanelToggleFactory } from 'kepler.gl/components';
import PanelTabFactory from 'kepler.gl/dist/components/side-panel';
import styled from 'styled-components';

const PanelHeaderBottom = styled.div.attrs({
  className: 'side-side-panel__header__bottom',
})`
  background-color: ${(props) => props.theme.sidePanelHeaderBg};
  border-bottom: 1px solid ${(props) => props.theme.sidePanelHeaderBorder};
  padding: 0 16px;
  display: flex;
  min-height: 30px;
`;

PanelToggleFactory.deps = [PanelTabFactory];
function PanelToggleFactory() {
  return null;
}

PanelToggleFactory.deps = KeplerPanelToggleFactory.deps;
export function replacePanelTab() {
  return [KeplerPanelToggleFactory, PanelToggleFactory];
}
