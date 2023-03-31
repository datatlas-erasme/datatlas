import { PanelToggleFactory as KeplerPanelToggleFactory } from 'kepler.gl/components';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  panels: PropTypes.arrayOf(PropTypes.object),
  activePanel: PropTypes.string,
  togglePanel: PropTypes.func,
};

const PanelHeaderBottom = styled.div.attrs({
  className: 'side-side-panel__header__bottom',
})`
  background-color: ${(props) => props.theme.sidePanelHeaderBg};
  border-bottom: 1px solid ${(props) => props.theme.sidePanelHeaderBorder};
  display: flex;
  min-height: 80px;
`;

function PanelToggleFactory(PanelTab) {
  const PanelToggle = ({ activePanel, panels, togglePanel }) => {
    const onClick = useCallback(
      (panel) => {
        const callback = panel.onClick || togglePanel;
        callback(panel.id);
      },
      [togglePanel]
    );
    return (
      <PanelHeaderBottom>
        {panels.map((panel) => (
          <PanelTab key={panel.id} panel={panel} isActive={activePanel === panel.id} onClick={() => onClick(panel)} />
        ))}
      </PanelHeaderBottom>
    );
  };

  PanelToggle.propTypes = propTypes;
  return PanelToggle;
}

PanelToggleFactory.deps = KeplerPanelToggleFactory.deps;

export function replacePanelToggleFactory() {
  return [KeplerPanelToggleFactory, PanelToggleFactory];
}
