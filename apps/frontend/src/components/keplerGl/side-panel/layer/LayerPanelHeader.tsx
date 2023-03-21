import React, { PropsWithChildren, ReactNode, UIEventHandler, useState } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { DragHandle } from 'kepler.gl/dist/components/side-panel/layer-panel/layer-panel-header';
import { VertDots } from 'kepler.gl/dist/components/common/icons';
import { StyledPanelHeader } from 'kepler.gl/dist/components/common/styled-components';

const StyledLayerPanelHeader = styled(StyledPanelHeader)`
  height: ${(props) => props.theme.layerPanelHeaderHeight}px;
  .layer__remove-layer {
    opacity: 0;
  }
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.panelBackgroundHover};

    .layer__drag-handle {
      opacity: 1;
    }

    .layer__remove-layer {
      opacity: 1;
    }
  }
`;

const HeaderLabelSection = styled.div`
  display: flex;
  color: ${(props) => props.theme.textColor};
`;

const HeaderActionSection = styled.div`
  display: flex;
`;

export interface LayerPanelHeaderPropsInterface extends PropsWithChildren {
  layerTitleSection: ReactNode;
  isActive: boolean;
  isDragNDropEnabled: boolean;
  labelRCGColorValues: number[];
  onToggleEnableConfig: UIEventHandler;
}

export const LayerPanelHeader = ({
  isActive,
  isDragNDropEnabled,
  labelRCGColorValues,
  onToggleEnableConfig,
  children,
  layerTitleSection,
}: LayerPanelHeaderPropsInterface) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setOpen] = useState(false);
  const toggleLayerConfigurator = (e) => {
    setOpen(!isOpen);
    onToggleEnableConfig(e);
  };
  return (
    <StyledLayerPanelHeader
      className={classnames('layer-panel__header', {
        'sort--handle': !isActive,
      })}
      active={isActive}
      labelRCGColorValues={labelRCGColorValues}
      onClick={toggleLayerConfigurator}
    >
      <HeaderLabelSection className="layer-panel__header__content">
        {isDragNDropEnabled && (
          <DragHandle className="layer__drag-handle">
            <VertDots height="20px" />
          </DragHandle>
        )}
        {layerTitleSection}
      </HeaderLabelSection>
      <HeaderActionSection className="layer-panel__header__actions">{children}</HeaderActionSection>
    </StyledLayerPanelHeader>
  );
};
