import React, { ComponentType, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Switch from 'kepler.gl/dist/components/common/switch';
import KeplerInteractionPanelFactory from 'kepler.gl/dist/components/side-panel/interaction-panel/interaction-panel';
import {
  StyledPanelHeader,
  PanelHeaderTitle,
  PanelHeaderContent,
  PanelContent,
} from 'kepler.gl/dist/components/common/styled-components';
import { Datasets, InteractionConfig } from 'kepler.gl/src/reducers/vis-state-updaters';
import { FiltersConfigFactory } from './FiltersConfigFactory';

const StyledInteractionPanel = styled.div`
  padding-bottom: 6px;
`;

interface InteractionPanelFactoryProps {
  datasets: Datasets;
  config: InteractionConfig[keyof InteractionConfig];
  onConfigChange: (config: Partial<InteractionConfig[keyof InteractionConfig]>) => void;
}
const InteractionPanelFactory =
  (TooltipConfig: ComponentType<any>, BrushConfig: ComponentType<any>, FiltersConfig: ComponentType<any>) =>
  ({ datasets, config, onConfigChange }: InteractionPanelFactoryProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isConfigActive, setConfigActive] = useState<boolean>(false);

    const _updateConfig = (newProp) => {
      onConfigChange({
        ...config,
        ...newProp,
      });
    };

    const enableConfig = () => {
      setConfigActive(!isConfigActive);
    };

    const renderConfig = () => {
      const onChange = (newConfig) => _updateConfig({ config: newConfig });
      switch (config.id) {
        case 'tooltip':
          return <TooltipConfig datasets={datasets} config={config.config} onChange={onChange} />;

        case 'brush':
          return <BrushConfig config={config.config} onChange={onChange} />;

        case 'filters':
          return <FiltersConfig datasets={datasets} config={config.config} onChange={onChange} />;

        default:
          return null;
      }
    };

    return (
      <StyledInteractionPanel className="interaction-panel">
        <StyledPanelHeader className="interaction-panel__header" onClick={enableConfig}>
          <PanelHeaderContent className="interaction-panel__header__content">
            <div className="interaction-panel__header__icon icon">
              <config.iconComponent height="16px" />
            </div>
            <div className="interaction-panel__header__title">
              <PanelHeaderTitle>
                <FormattedMessage id={config.label} />
              </PanelHeaderTitle>
            </div>
          </PanelHeaderContent>
          <div className="interaction-panel__header__actions">
            <Switch
              checked={config.enabled}
              id={`${config.id}-toggle`}
              onChange={() => _updateConfig({ enabled: !config.enabled })}
              secondary
            />
          </div>
        </StyledPanelHeader>
        {config.enabled && <PanelContent className="interaction-panel__content">{renderConfig()}</PanelContent>}
      </StyledInteractionPanel>
    );
  };

InteractionPanelFactory.deps = KeplerInteractionPanelFactory.deps.concat(FiltersConfigFactory);

export function replaceInteractionPanel() {
  return [KeplerInteractionPanelFactory, InteractionPanelFactory];
}
