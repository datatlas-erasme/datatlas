// Try to keep imports in same order for a more readable diff.
import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import classNames from 'classnames';
import KeplerMapPopoverFactory from 'kepler.gl/dist/components/map/map-popover';
import LayerHoverInfoFactory from 'kepler.gl/dist/components/map/layer-hover-info';
import CoordinateInfoFactory from 'kepler.gl/dist/components/map/coordinate-info';
import {
  useFloating,
  autoUpdate,
  offset,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useClientPoint,
  FloatingContext,
  FloatingFocusManager,
} from '@floating-ui/react';
import { darkTheme } from '../../../../style/theme';
import { LayerHoverInfoProps } from './LayerHoverInfo';

const MAX_WIDTH = 500;
const MAX_HEIGHT = 600;

const StyledMapPopover = styled.div<{ expandable: boolean; maxTooltipFields: number }>`
  display: flex;
  flex-direction: column;
  width: ${MAX_WIDTH}px;
  max-height: ${MAX_HEIGHT}px;
  padding: 22px;
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

  .map-popover__layer-info,
  .coordinate-hover-info {
    & > * + * {
      margin-top: 7px;
    }
  }

  .map-popover__actions {
    display: ${({ expandable }) => (expandable ? 'flex' : 'none')};
  }

  .map-popover__layer-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .map-popover__topbar {
      display: none;
      position: sticky;
      top: 10px;
      flex-direction: row;
      justify-content: space-between;

      .map-popover__layer-name {
        font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 16px;
      }

      .button {
        margin: 0;
        background-color: initial;
        font-size: 36px;
      }
    }

    .map-popover__content {
      padding-bottom: 13px;
    }

    .entry-info {
      display: flex;
      flex-direction: column;
    }

    /* Testing pure CSS solution. */
    .row {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }

    .row:not(.aggregated):nth-child(1) .row__value,
    .row .row__value h3 {
      font-size: 32px;
      text-transform: uppercase;
      padding-bottom: 13px;
      font-weight: 700;
    }

    .row.image-container {
      justify-content: center;
    }

    // This doesn't work as you would expect.
    // It targets the 5 first elements no matters what's in the not selector content.
    .row:nth-of-type(-n + ${({ maxTooltipFields }) => maxTooltipFields + 1}) {
    }

    .row:not(.aggregated):nth-child(1) .row__name,
    .row.image-container,
    .row.empty,
    .row:nth-child(n + ${({ maxTooltipFields }) => maxTooltipFields + 1}) {
      display: none;
    }

    .row__name,
    .row__value {
      color: ${(props) => props.theme.textColorHl};
      font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
      font-size: 16px;
      line-height: 1.4;
    }

    .row__name {
      color: ${(props) => props.theme.textColor};
    }

    .row__value {
      text-align: left;
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* number of lines to show */
      line-clamp: 2;
    }
  }

  &.expanded {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 32px;
    transition: transform 0.3s;

    .row__value {
      transition: all 0.3s;
    }

    .map-popover__layer-info {
      .map-popover__topbar {
        display: flex;
      }

      .row.image-container,
      .row.empty,
      .map-popover__content .row:nth-child(n + ${({ maxTooltipFields }) => maxTooltipFields + 1}) {
        display: flex;
      }

      .row__value {
        -webkit-line-clamp: initial; /* number of lines to show */
        line-clamp: initial;
      }

      .map-popover__actions {
        display: none;
      }
    }
  }
`;

const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 12px;
  }
`;

interface UseMapPointOptions {
  container: Element;
  x: number;
  y: number;
  size?: number;
  enabled: boolean;
}

const useMapPoint = (context: FloatingContext, { container, x, y, size = 0, enabled = true }: UseMapPointOptions) => {
  const bounds = container && container.getBoundingClientRect ? container.getBoundingClientRect() : { left: 0, top: 0 };
  const left = bounds.left + (enabled ? x : 0) - size / 2;
  const top = bounds.top + (enabled ? y : 0) - size / 2;

  return useClientPoint(context, { x: left, y: top });
};

interface MapPopoverProps {
  x: number;
  y: number;
  frozen: boolean;
  coordinate: never;
  size: number;
  enabled: boolean;
  layerHoverProp: Omit<LayerHoverInfoProps, 'expanded' | 'setExpanded' | 'onClose'>;
  isBase: boolean;
  zoom: number;
  container: Element;
  onClose?: () => void;
}

const useCounter = (initialState = 0) => {
  const [visibleElements, setVisibleElements] = useState<number>(initialState);
  const incVisibleElements = () => setVisibleElements(visibleElements + 1);

  return [visibleElements, incVisibleElements];
};

function MapPopoverFactory(LayerHoverInfo, CoordinateInfo) {
  const MapPopover = ({ x, y, frozen, coordinate, layerHoverProp, zoom, container }: MapPopoverProps) => {
    const maxTooltipFields = (process.env.REACT_APP_MAX_TOOLIP_FIELDS || 3) as number;
    const [expanded, setExpanded] = useState<boolean>(false);
    const [expandable, setExpandable] = useState<boolean>(false);
    const { refs, floatingStyles, context } = useFloating({
      open: true,
      placement: expanded ? 'top-start' : 'left-end',
      whileElementsMounted: autoUpdate,
      middleware: [
        expanded
          ? offset(({ rects }) => {
              return {
                alignmentAxis: 0,
                mainAxis: -rects.floating.height,
              };
            })
          : offset(32),
      ],
    });
    const hover = useHover(context, { move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });
    const clientPoint = useMapPoint(context, { container, x, y, enabled: !expanded });
    const { getFloatingProps } = useInteractions([hover, focus, dismiss, role, clientPoint]);

    useEffect(() => {
      context.update();
    }, [context, expanded, frozen]);

    useEffect(() => {
      if (layerHoverProp.fieldsToShow.length > maxTooltipFields) {
        setExpandable(true);
      }
    }, [layerHoverProp.fieldsToShow, maxTooltipFields]);

    return (
      <ThemeProvider theme={darkTheme}>
        <FloatingFocusManager context={context} modal={frozen}>
          <StyledMapPopover
            className={classNames(['map-popover', expanded && 'expanded'])}
            ref={refs.setFloating}
            style={floatingStyles}
            maxTooltipFields={maxTooltipFields}
            expandable={expandable}
            {...getFloatingProps()}
          >
            <PopoverContent>
              {Array.isArray(coordinate) && <CoordinateInfo coordinate={coordinate} zoom={zoom} />}
              {layerHoverProp && (
                <LayerHoverInfo
                  {...layerHoverProp}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  setExpandable={setExpandable}
                />
              )}
            </PopoverContent>
          </StyledMapPopover>
        </FloatingFocusManager>
      </ThemeProvider>
    );
  };
  return MapPopover;
}

MapPopoverFactory.deps = [LayerHoverInfoFactory, CoordinateInfoFactory];

export function replaceMapPopoverFactory() {
  return [KeplerMapPopoverFactory, MapPopoverFactory];
}
