import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
  PanelTabFactory,
  PanelToggleFactory as KeplerPanelToggleFactory
} from '@kepler.gl/components';
import {PanelItem} from '@kepler.gl/components/dist/side-panel/panel-tab';
import {toggleSidePanel, ActionHandler} from '@kepler.gl/actions';

type PanelToggleProps = {
  panels: PanelItem[];
  activePanel: string | null;
  togglePanel: ActionHandler<typeof toggleSidePanel>;
};

const PanelHeaderBottom = styled.div.attrs({
  className: 'side-side-panel__header__bottom'
})`
  background-color: ${props => props.theme.sidePanelHeaderBg};
  border-bottom: 1px solid ${props => props.theme.sidePanelHeaderBorder};
  display: flex;
  min-height: 80px;
`;

PanelToggleFactory.deps = KeplerPanelToggleFactory.deps;

function PanelToggleFactory(PanelTab: ReturnType<typeof PanelTabFactory>) {
  const PanelToggle: React.FC<PanelToggleProps> = ({activePanel, panels, togglePanel}) => {
    const onClick = useCallback(
      panel => {
        const callback = panel.onClick || togglePanel;
        callback(panel.id);
      },
      [togglePanel]
    );

    return (
      <PanelHeaderBottom>
        {panels.map(panel => (
          <PanelTab
            key={panel.id}
            panel={panel}
            isActive={activePanel === panel.id}
            onClick={() => onClick(panel)}
          />
        ))}
      </PanelHeaderBottom>
    );
  };

  return PanelToggle;
}

export function replacePanelToggleFactory() {
  return [KeplerPanelToggleFactory, PanelToggleFactory];
}
