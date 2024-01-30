/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
// see node_modules/kepler.gl/src/components/kepler-gl.js
import React, { Component, createRef } from 'react';
import Console from 'global/console';
import { bindActionCreators } from 'redux';
import styled, { withTheme } from 'styled-components';
import { createSelector } from 'reselect';
import { connect as keplerGlConnect } from 'kepler.gl/dist/connect/keplergl-connect';
import NestedIntlProvider from '../../i18n/NestedIntlProvider';
import { messages } from 'kepler.gl/dist/localization';
import { RootContext } from 'kepler.gl/dist/components/context';

import * as VisStateActions from 'kepler.gl/dist/actions/vis-state-actions';
import * as MapStateActions from 'kepler.gl/dist/actions/map-state-actions';
import * as MapStyleActions from 'kepler.gl/dist/actions/map-style-actions';
import * as UIStateActions from 'kepler.gl/dist/actions/ui-state-actions';
import * as ProviderActions from 'kepler.gl/dist/actions/provider-actions';

import { THEME } from 'kepler.gl/dist/constants/default-settings';
import { MISSING_MAPBOX_TOKEN } from 'kepler.gl/dist/constants/user-feedbacks';
import { Map } from 'mapbox-gl';

import {
  SidePanelFactory,
  MapContainerFactory,
  MapsLayoutFactory,
  BottomWidgetFactory,
  ModalContainerFactory,
  PlotContainerFactory,
} from 'kepler.gl/dist/components';

import { generateHashId } from 'kepler.gl/dist/utils/utils';
import { validateToken } from 'kepler.gl/dist/utils/mapbox-utils';
import { mergeMessages } from '../../../i18n/utils';

import { theme as basicTheme, themeLT, themeBS } from 'kepler.gl/dist/styles';
import { observeDimensions, unobserveDimensions } from 'kepler.gl/dist/utils/observe-dimensions';

import { KeplerGlState } from 'kepler.gl/dist/reducers';
import { Provider } from 'kepler.gl/dist/cloud-providers';
import { OnErrorCallBack, OnSuccessCallBack } from 'kepler.gl/src/actions';

import KeplerGlFactory, {
  mapFieldsSelector,
  sidePanelSelector,
  plotContainerSelector,
  isSplitSelector,
  bottomWidgetSelector,
  modalContainerSelector,
  geoCoderPanelSelector,
  notificationPanelSelector,
  DEFAULT_KEPLER_GL_PROPS,
  mapStateToProps,
} from 'kepler.gl/dist/components/kepler-gl';
import { getDefaultLocale } from '../../../i18n/utils';
import { AppDispatch } from '../../../store';
import { KeplerGlExtraProps } from '../types';

export type KeplerGlActions = {
  visStateActions: typeof VisStateActions;
  mapStateActions: typeof MapStateActions;
  mapStyleActions: typeof MapStyleActions;
  uiStateActions: typeof UIStateActions;
  providerActions: typeof ProviderActions;
};

interface BottomWidgetOuterProps {
  absolute?: boolean;
}

const BottomWidgetOuter = styled.div<BottomWidgetOuterProps>(
  ({ absolute }) => `
  ${absolute ? 'position: absolute; bottom: 0; right: 0;' : ''}
  pointer-events: none; /* prevent padding from blocking input */
  & > * {
    /* all children should allow input */
    pointer-events: all;
  }`
);

export type KeplerGLBasicProps = {
  mapboxApiAccessToken: string;
  mapboxApiUrl?: string;
  id: string;
  width?: number;
  height?: number;

  appWebsite?: string;
  onSaveMap?: () => void;
  onViewStateChange?: () => void;
  onDeckInitialized?: () => void;
  onKeplerGlInitialized?: () => void;
  getMapboxRef?: () => React.RefObject<Map>;
  mapStyles?: { id: string; style?: object }[];
  mapStylesReplaceDefault?: boolean;
  appName?: string;
  version?: string;
  sidePanelWidth?: number;
  theme?: object;
  cloudProviders?: Provider[];
  deckGlProps?: object;
  onLoadCloudMapSuccess?: OnSuccessCallBack;
  onLoadCloudMapError?: OnErrorCallBack;
  onExportToCloudSuccess?: OnSuccessCallBack;
  onExportToCloudError?: OnErrorCallBack;
  readOnly?: boolean;
  localeMessages?: { [key: string]: { [key: string]: string } };
  dispatch: AppDispatch;

  topMapContainerProps?: object;
  bottomMapContainerProps?: object;
};

export type KeplerGLProps = KeplerGlState & KeplerGlActions & KeplerGLBasicProps & KeplerGlExtraProps;

// @ts-ignore
type KeplerGlSelector = (...args: any[]) => KeplerGlState;

function DatatlasGLFactory(
  BottomWidget: ReturnType<typeof BottomWidgetFactory>,
  GeoCoderPanel,
  MapContainer: ReturnType<typeof MapContainerFactory>,
  MapsLayout: ReturnType<typeof MapsLayoutFactory>,
  ModalContainer: ReturnType<typeof ModalContainerFactory>,
  SidePanel: ReturnType<typeof SidePanelFactory>,
  PlotContainer: ReturnType<typeof PlotContainerFactory>,
  NotificationPanel
): React.ComponentType<KeplerGLBasicProps & { selector: KeplerGlSelector }> {
  class DatatlasGL extends Component<KeplerGLProps & { selector: KeplerGlSelector }> {
    static defaultProps = DEFAULT_KEPLER_GL_PROPS;

    state = {
      dimensions: null,
    };

    componentDidMount() {
      this._validateMapboxToken();
      this._loadMapStyle();
      if (typeof this.props.onKeplerGlInitialized === 'function') {
        this.props.onKeplerGlInitialized();
      }
      if (this.root.current instanceof HTMLElement) {
        observeDimensions(this.root.current, this._handleResize);
      }
    }

    componentWillUnmount() {
      if (this.root.current instanceof HTMLElement) {
        unobserveDimensions(this.root.current);
      }
    }

    _handleResize = (dimensions) => {
      this.setState({ dimensions });
    };

    static contextType = RootContext;

    root = createRef<HTMLDivElement>();
    bottomWidgetRef = createRef<HTMLDivElement>();

    /* selectors */
    themeSelector = (props) => props.theme;
    availableThemeSelector = createSelector(this.themeSelector, (theme) =>
      typeof theme === 'object'
        ? {
            ...basicTheme,
            ...theme,
          }
        : theme === THEME.light
        ? themeLT
        : theme === THEME.base
        ? themeBS
        : theme
    );

    availableProviders = createSelector(
      (props: KeplerGLProps) => props.cloudProviders,
      (providers) =>
        Array.isArray(providers) && providers.length
          ? {
              hasStorage: providers.some((p) => p.hasPrivateStorage()),
              hasShare: providers.some((p) => p.hasSharingUrl()),
            }
          : {}
    );

    localeMessagesSelector = createSelector(
      (props: KeplerGLProps) => props.localeMessages,
      (customMessages) => (customMessages ? mergeMessages(messages, customMessages) : messages)
    );

    /* private methods */
    _validateMapboxToken() {
      const { mapboxApiAccessToken } = this.props;
      if (!validateToken(mapboxApiAccessToken)) {
        Console.warn(MISSING_MAPBOX_TOKEN);
      }
    }

    _loadMapStyle = () => {
      const defaultStyles = Object.values(this.props.mapStyle.mapStyles);
      // add id to custom map styles if not given
      const customStyles = (this.props.mapStyles || []).map((ms) => ({
        ...ms,
        id: ms.id || generateHashId(),
      }));

      const allStyles = [...customStyles, ...defaultStyles].reduce(
        (accu, style) => {
          const hasStyleObject = style.style && typeof style.style === 'object';
          accu[hasStyleObject ? 'toLoad' : 'toRequest'][style.id] = style;

          return accu;
        },
        { toLoad: {}, toRequest: {} }
      );

      this.props.mapStyleActions.loadMapStyles(allStyles.toLoad);
      this.props.mapStyleActions.requestMapStyles(allStyles.toRequest);
    };

    render() {
      const {
        id = 'map',
        width = DEFAULT_KEPLER_GL_PROPS.width,
        height = DEFAULT_KEPLER_GL_PROPS.height,
        uiState,
        visState,
        // readOnly override
        readOnly,
      } = this.props;

      const dimensions = this.state.dimensions || { width, height };
      const {
        splitMaps, // this will store support for split map view is necessary
        interactionConfig,
      } = visState;

      const isSplit = isSplitSelector(this.props);
      const theme = this.availableThemeSelector(this.props);
      const localeMessages = this.localeMessagesSelector(this.props);
      const isExportingImage = uiState.exportImage.exporting;
      const availableProviders = this.availableProviders(this.props);

      const mapFields = mapFieldsSelector(this.props);
      const sideFields = sidePanelSelector(this.props, availableProviders);
      const plotContainerFields = plotContainerSelector(this.props);
      const bottomWidgetFields = bottomWidgetSelector(this.props, theme);
      const modalContainerFields = modalContainerSelector(this.props, this.root.current);
      const geoCoderPanelFields = geoCoderPanelSelector(this.props);
      const notificationPanelFields = notificationPanelSelector(this.props);

      const mapContainers = !isSplit
        ? [<MapContainer primary={true} key={0} index={0} {...mapFields} mapLayers={null} />]
        : splitMaps.map((settings, index) => (
            <MapContainer
              key={index}
              index={index}
              primary={index === 1}
              {...mapFields}
              mapLayers={splitMaps[index].layers}
            />
          ));

      return (
        <RootContext.Provider value={this.root}>
          <NestedIntlProvider
            locale={uiState.locale}
            defaultLocale={getDefaultLocale()}
            messages={localeMessages[uiState.locale]}
          >
            <div
              className="kepler-gl"
              id={`kepler-gl__${id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: `${width}px`,
                height: `${height}px`,
              }}
              ref={this.root}
            >
              <NotificationPanel {...notificationPanelFields} />
              {!uiState.readOnly && !readOnly && <SidePanel {...sideFields} />}
              <MapsLayout className="maps">{mapContainers}</MapsLayout>
              {isExportingImage && <PlotContainer {...plotContainerFields} />}
              {interactionConfig.geocoder.enabled && <GeoCoderPanel {...geoCoderPanelFields} />}
              <BottomWidgetOuter absolute>
                <BottomWidget ref={this.bottomWidgetRef} {...bottomWidgetFields} containerW={dimensions.width} />
              </BottomWidgetOuter>
              <ModalContainer {...modalContainerFields} containerW={dimensions.width} containerH={dimensions.height} />
            </div>
          </NestedIntlProvider>
        </RootContext.Provider>
      );
    }
  }

  return keplerGlConnect(mapStateToProps, makeMapDispatchToProps)(withTheme(DatatlasGL));
}

const defaultUserActions = {};

const getDispatch = (dispatch, props) => dispatch;
const getUserActions = (dispatch, props) => props.actions || defaultUserActions;

/** @type {() => import('reselect').OutputParametricSelector<any, any, any, any>} */
function makeGetActionCreators() {
  return createSelector([getDispatch, getUserActions], (dispatch, userActions) => {
    const [visStateActions, mapStateActions, mapStyleActions, uiStateActions, providerActions] = [
      VisStateActions,
      MapStateActions,
      MapStyleActions,
      UIStateActions,
      ProviderActions,
    ].map((actions) => bindActionCreators(mergeActions(actions, userActions), dispatch));

    return {
      visStateActions,
      mapStateActions,
      mapStyleActions,
      uiStateActions,
      providerActions,
      dispatch,
    };
  });
}

function makeMapDispatchToProps() {
  const getActionCreators = makeGetActionCreators();
  const mapDispatchToProps = (dispatch, ownProps) => {
    const groupedActionCreators = getActionCreators(dispatch, ownProps);

    return {
      ...groupedActionCreators,
      dispatch,
    };
  };

  return mapDispatchToProps;
}

/**
 * Override default kepler.gl actions with user defined actions using the same key
 */
function mergeActions(actions, userActions) {
  const overrides = {};
  for (const key in userActions) {
    if (Object.prototype.hasOwnProperty.call(userActions, key) && Object.prototype.hasOwnProperty.call(actions, key)) {
      overrides[key] = userActions[key];
    }
  }

  return { ...actions, ...overrides };
}

DatatlasGLFactory.deps = KeplerGlFactory.deps;

export function replaceKeplerGL() {
  return [KeplerGlFactory, DatatlasGLFactory];
}
