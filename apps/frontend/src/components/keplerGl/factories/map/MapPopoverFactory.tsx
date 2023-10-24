// Try to keep imports in same order for more readable diff with Kepler.gl sources.

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import KeplerMapPopoverFactory from 'kepler.gl/dist/components/map/map-popover';
import LayerHoverInfoFactory from 'kepler.gl/dist/components/map/layer-hover-info';
import CoordinateInfoFactory from 'kepler.gl/dist/components/map/coordinate-info';
import { ArrowLeft, ArrowRight, Pin } from 'kepler.gl/dist/components/common/icons';
import { FormattedMessage, injectIntl } from 'react-intl';
import Tippy from '@tippyjs/react/headless';
import { darkTheme } from '../../../../style/theme';
import { Row, StyledTable } from './LayerHoverInfo';

const MAX_WIDTH = 500;
const MAX_HEIGHT = 600;

const StyledMapPopover = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${MAX_WIDTH}px;
  max-height: ${MAX_HEIGHT}px;
  padding: 14px;
  & > * + * {
    margin-top: 6px;
  }
  ${(props) => props.theme.scrollBar};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 11px;
  font-weight: 500;
  background-color: ${(props) => props.theme.panelBackground};
  color: ${(props) => props.theme.textColor};
  z-index: 1000;
  overflow-x: auto;
  box-shadow: ${(props) => props.theme.panelBoxShadow};

  :hover {
    background-color: ${(props) => `${props.theme.panelBackground}dd`};
  }

  .primary-label {
    color: ${(props) => props.theme.notificationColors.success};
    font-size: 10px;
  }

  .map-popover__layer-info,
  .coordingate-hover-info {
    & > * + * {
      margin-top: 7px;
    }
  }

  ${StyledTable} {
    display: flex;
    flex-direction: column;
  }

  .coordingate-hover-info > ${StyledTable} {
  }
  .map-popover__layer-info > ${StyledTable} {
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .row img {
    max-width: 100%;
    height: auto;
  }

  .row > * {
    color: ${(props) => props.theme.textColor};
  }

  .row__name {
  }

  .row__value {
    text-align: right;
    font-weight: 500;
    color: ${(props) => props.theme.textColorHl};
  }
`;

const PinnedButtons = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-items: center;
  & > * + * {
    margin-left: 10px;
  }
`;

const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 12px;
  }
`;

const StyledIcon = styled.div`
  color: ${(props) => props.theme.activeColor};

  &.popover-pin {
    transform: rotate(30deg);
  }

  :hover {
    cursor: pointer;
    color: ${(props) => props.theme.linkBtnColor};
  }
`;

function createVirtualReference(container, x, y, size = 0) {
  const bounds = container && container.getBoundingClientRect ? container.getBoundingClientRect() : {};
  const left = (bounds.left || 0) + x - size / 2;
  const top = (bounds.top || 0) + y - size / 2;
  return {
    left,
    top,
    right: left + size,
    bottom: top + size,
    width: size,
    height: size,
  };
}

function getOffsetForPlacement({ placement, reference, popper }, gap = 20) {
  switch (placement) {
    case 'top-start':
    case 'bottom-start':
      return [gap, gap];
    case 'top-end':
    case 'bottom-end':
      return [-gap, gap];
    default:
      return [0, 0];
  }
}

function getPopperOptions(container) {
  return {
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundary: container,
        },
      },
    ],
  };
}

export default function MapPopoverFactory(LayerHoverInfo, CoordinateInfo) {
  const MapPopover = ({ x, y, frozen, coordinate, layerHoverProp, isBase, zoom, container, onClose }) => {
    const [horizontalPlacement, setHorizontalPlacement] = useState('start');
    const moveLeft = () => setHorizontalPlacement('end');
    const moveRight = () => setHorizontalPlacement('start');
    return (
      <ThemeProvider theme={darkTheme}>
        <Tippy
          popperOptions={getPopperOptions(container)}
          zIndex={999} /* should be below Modal which has zIndex=1000 */
          visible={true}
          interactive={true}
          getReferenceClientRect={() => createVirtualReference(container, x, y)}
          // @ts-ignore
          placement={`bottom-${horizontalPlacement}`}
          // @ts-ignore
          offset={getOffsetForPlacement}
          appendTo={document.body}
          render={(attrs) => (
            <StyledMapPopover {...attrs} className="map-popover">
              {frozen ? (
                <PinnedButtons>
                  {horizontalPlacement === 'start' && (
                    <StyledIcon className="popover-arrow-left" onClick={moveLeft}>
                      <ArrowLeft />
                    </StyledIcon>
                  )}
                  <StyledIcon className="popover-pin" onClick={onClose}>
                    <Pin height="16px" />
                  </StyledIcon>
                  {horizontalPlacement === 'end' && (
                    <StyledIcon className="popover-arrow-right" onClick={moveRight}>
                      <ArrowRight />
                    </StyledIcon>
                  )}
                  {isBase && (
                    <div className="primary-label">
                      <FormattedMessage id="mapPopover.primary" />
                    </div>
                  )}
                </PinnedButtons>
              ) : null}
              <PopoverContent>
                {Array.isArray(coordinate) && <CoordinateInfo coordinate={coordinate} zoom={zoom} />}
                {layerHoverProp && <LayerHoverInfo {...layerHoverProp} />}
              </PopoverContent>
            </StyledMapPopover>
          )}
        />
      </ThemeProvider>
    );
  };
  return injectIntl(MapPopover);
}

MapPopoverFactory.deps = [LayerHoverInfoFactory, CoordinateInfoFactory];

export function replaceMapPopoverFactory() {
  return [KeplerMapPopoverFactory, MapPopoverFactory];
}
