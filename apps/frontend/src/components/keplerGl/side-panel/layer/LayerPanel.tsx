import React, {
  ComponentProps,
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  UIEventHandler
} from 'react';
import styled from 'styled-components';

export const PanelWrapper = styled.div<{active: boolean} & ComponentProps<'div'>>`
  font-size: 12px;
  border-radius: 1px;
  margin-bottom: 8px;
  z-index: 1000;

  &.dragging {
    cursor: move;
  }
`;

export interface LayerPanelPropsInterface extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  onMouseDown?: UIEventHandler;
  onTouchStart?: UIEventHandler;
  isActive: boolean;
  header: ReactNode;
}

export const LayerPanel = ({
  isActive,
  onTouchStart,
  style,
  onMouseDown,
  className,
  children,
  header
}: LayerPanelPropsInterface) => {
  return (
    <PanelWrapper
      active={isActive}
      className={`layer-panel ${className}`}
      style={style}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {header}
      {isActive && children}
    </PanelWrapper>
  );
};
