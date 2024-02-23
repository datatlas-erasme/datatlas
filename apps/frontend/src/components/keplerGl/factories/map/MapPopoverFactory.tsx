// Try to keep imports in same order for a more readable diff.
import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import classNames from 'classnames';
import {
  MapPopoverFactory as KeplerMapPopoverFactory,
  LayerHoverInfoFactory,
  CoordinateInfoFactory
} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
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
  FloatingFocusManager
} from '@floating-ui/react';
import {darkTheme} from '../../../../style/theme';
import {LayerHoverInfoProps} from './LayerHoverInfo';
import {useIsMobile} from '../../../../hooks';

const MAX_WIDTH = 500;
const MAX_HEIGHT = 600;

const StyledMapPopover = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MAX_WIDTH}px;
  max-height: ${MAX_HEIGHT}px;
  margin: 13px;
  z-index: 1000;

  &.full-width {
    width: calc(100% - 26px);
  }

  &.expanded {
    height: 100%;
    max-height: 100%;
  }
`;

const PopoverContent = styled.div<{expandable: boolean; maxTooltipFields: number}>`
  display: flex;
  flex-direction: column;
  padding: 22px;
  & > * + * {
    margin-top: 6px;
  }
  ${props => props.theme.scrollBar};
  border-radius: ${props => props.theme.primaryBtnRadius};
  font-family: ${props => props.theme.fontFamily};
  font-size: 11px;
  font-weight: 500;
  background-color: ${props => props.theme.panelBackground};
  color: ${props => props.theme.textColor};
  overflow-x: auto;
  box-shadow: ${props => props.theme.panelBoxShadow};

  :hover {
    background-color: ${props => `${props.theme.panelBackground}`};
  }

  .map-popover__layer-info,
  .coordinate-hover-info {
    & > * + * {
      margin-top: 7px;
    }
  }

  .map-popover__actions {
    display: ${({expandable}) => (expandable ? 'flex' : 'none')};
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
      gap: 13px;
      padding-bottom: 3px;
    }

    .row:not(.aggregated):nth-child(1) .row__value,
    .row .row__value h3 {
      font-size: 32px;
      text-transform: uppercase;
      padding-bottom: 13px;
      font-weight: 700;
    }

    .row.image-container {
      padding: 13px 0;
      justify-content: center;
      overflow: hidden;

      img {
        max-width: 100%;
      }
    }

    // This doesn't work as you would expect.
    // It targets the 5 first elements no matters what's in the not selector content.
    .row:nth-of-type(-n + ${({maxTooltipFields}) => maxTooltipFields + 1}) {
    }

    .row:not(.aggregated):nth-child(1) .row__name,
    .row.image-container,
    .row.empty,
    .row:nth-child(n + ${({maxTooltipFields}) => maxTooltipFields + 1}) {
      display: none;
    }

    .row__name,
    .row__value {
      color: ${props => props.theme.textColorHl};
      font-family: 'Roboto', Verdana, 'Helvetica Neue', Helvetica, sans-serif;
      font-size: 16px;
      line-height: 1.4;
    }

    .row__name {
      color: ${props => props.theme.textColor};
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

    .row {
      flex-direction: column;
      gap: 0;
      padding-bottom: 13px;
    }

    .row__value {
      transition: all 0.3s;
    }

    .map-popover__layer-info {
      .map-popover__topbar {
        display: flex;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .map-popover__content .row.empty {
        display: none;
      }

      .row.image-container,
      .map-popover__content
        .row:not(.empty):nth-child(n + ${({maxTooltipFields}) => maxTooltipFields + 1}) {
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

interface UseMapPointOptions {
  container: Element;
  x: number;
  y: number;
  size?: number;
  enabled: boolean;
}

const useMapPoint = (
  context: FloatingContext,
  {container, x, y, size = 0, enabled = true}: UseMapPointOptions
) => {
  const bounds =
    container && container.getBoundingClientRect
      ? container.getBoundingClientRect()
      : {left: 0, top: 0};
  const left = bounds.left + (enabled ? x : 0) - size / 2;
  const top = bounds.top + (enabled ? y : 0) - size / 2;

  return useClientPoint(context, {x: left, y: top});
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

function MapPopoverFactory(LayerHoverInfo, CoordinateInfo) {
  const MapPopover = ({
    x,
    y,
    frozen,
    coordinate,
    layerHoverProp,
    zoom,
    container
  }: MapPopoverProps) => {
    const maxTooltipFields = parseInt(process.env.REACT_APP_MAX_TOOLIP_FIELDS || '3', 10);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [expandable, setExpandable] = useState<boolean>(false);
    const [isMobile] = useIsMobile();
    const {refs, floatingStyles, context} = useFloating({
      open: true,
      placement: expanded || isMobile ? 'top-start' : 'left-end',
      whileElementsMounted: autoUpdate,
      middleware: [
        expanded
          ? offset(({rects}) => ({
              alignmentAxis: 0,
              mainAxis: -rects.floating.height
            }))
          : offset(isMobile ? 13 : 30)
      ]
    });
    const hover = useHover(context, {move: false});
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, {role: 'tooltip'});
    const clientPoint = useMapPoint(context, {
      container,
      x: isMobile ? 0 : x,
      y,
      enabled: !expanded
    });
    const {getFloatingProps} = useInteractions([hover, focus, dismiss, role, clientPoint]);

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
            className={classNames([
              'map-popover-container',
              expanded && 'expanded',
              (expanded || isMobile) && 'full-width'
            ])}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <PopoverContent
              className={classNames(['map-popover', expanded && 'expanded'])}
              expandable={expandable}
              maxTooltipFields={maxTooltipFields}
            >
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

export function replaceMapPopoverFactory(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerMapPopoverFactory, MapPopoverFactory];
}
