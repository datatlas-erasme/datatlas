import React, {PropsWithChildren, ReactNode, useState} from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import {
  DragHandle,
  LayerPanelHeaderProps as KeplerLayerPanelHeaderProps,
  StyledPanelHeader
} from '@kepler.gl/components';
import {VertDots} from '@kepler.gl/components/dist/common/icons';

const StyledLayerPanelHeader = styled(StyledPanelHeader)`
  height: ${({theme}) => theme.layerPanelHeaderHeight}px;
  background-color: ${({theme}) => theme.panelBackground};

  .layer__remove-layer {
    opacity: 0;
  }
  :hover {
    cursor: pointer;
    background-color: ${({theme}) => theme.sidePanelHeaderBg};

    .layer__drag-handle {
      opacity: 1;
    }

    .layer__remove-layer {
      opacity: 1;
    }
  }
  :active {
    background-color: ${({theme}) => theme.sidePanelHeaderBg};
  }
`;

const HeaderLabelSection = styled.div`
  display: flex;
  color: ${({theme}) => theme.textColor};
`;

const HeaderActionSection = styled.div`
  display: flex;
`;

export type LayerPanelHeaderPropsInterface = Pick<
  KeplerLayerPanelHeaderProps,
  | 'isConfigActive'
  | 'isDragNDropEnabled'
  | 'labelRCGColorValues'
  | 'onToggleEnableConfig'
  | 'listeners'
> &
  PropsWithChildren & {layerTitleSection: ReactNode};

export const LayerPanelHeader = ({
  isConfigActive,
  isDragNDropEnabled,
  labelRCGColorValues,
  onToggleEnableConfig,
  children,
  layerTitleSection,
  listeners
}: LayerPanelHeaderPropsInterface) => {
  const [isOpen, setOpen] = useState(false);
  const toggleLayerConfigurator = e => {
    setOpen(!isOpen);
    onToggleEnableConfig(e);
  };
  return (
    <StyledLayerPanelHeader
      className={classnames('layer-panel__header', {
        'sort--handle': !isConfigActive
      })}
      active={isConfigActive}
      labelRCGColorValues={labelRCGColorValues}
      onClick={toggleLayerConfigurator}
    >
      <HeaderLabelSection className="layer-panel__header__content">
        {isDragNDropEnabled ? (
          <DragHandle className="layer__drag-handle" listeners={listeners}>
            <VertDots height="20px" />
          </DragHandle>
        ) : (
          <div className="layer__drag-handle__placeholder" />
        )}
        {layerTitleSection}
      </HeaderLabelSection>
      <HeaderActionSection className="layer-panel__header__actions">{children}</HeaderActionSection>
    </StyledLayerPanelHeader>
  );
};
