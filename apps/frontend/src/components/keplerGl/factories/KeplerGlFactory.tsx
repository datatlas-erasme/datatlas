import React, {Component, createRef, Dispatch} from 'react';
import Console from 'global/console';
import styled, {ThemeProvider, withTheme} from 'styled-components';
import {createSelector} from 'reselect';
import {connect as keplerGlConnect} from '@kepler.gl/components/dist/connect/keplergl-connect';
import NestedIntlProvider from '../../i18n/NestedIntlProvider';
import {messages} from '@kepler.gl/localization';
import {
  CloudListProvider,
  DEFAULT_KEPLER_GL_PROPS,
  DndContextFactory,
  GeocoderPanelFactory,
  getVisibleDatasets,
  KeplerGlFactory,
  makeGetActionCreators,
  NotificationPanelFactory,
  RootContext
} from '@kepler.gl/components';

import {
  VisStateActions,
  MapStateActions,
  MapStyleActions,
  UIStateActions,
  ProviderActions
} from '@kepler.gl/actions';
import {Map} from 'mapbox-gl';

import {THEME, MISSING_MAPBOX_TOKEN} from '@kepler.gl/constants';

import {
  SidePanelFactory,
  MapContainerFactory,
  MapsLayoutFactory,
  BottomWidgetFactory,
  ModalContainerFactory,
  PlotContainerFactory
} from '@kepler.gl/components';

import {
  generateHashId,
  validateToken,
  observeDimensions,
  unobserveDimensions,
  hasPortableWidth
} from '@kepler.gl/utils';
import {mergeMessages} from '../../../i18n/utils';

import {theme as basicTheme, themeLT, themeBS, breakPointValues} from '@kepler.gl/styles';
import {KeplerGlState} from '@kepler.gl/reducers';
import {Provider} from '@kepler.gl/cloud-providers';
import {OnErrorCallBack, OnSuccessCallBack, Viewport} from '@kepler.gl/types';

import {
  mapFieldsSelector,
  plotContainerSelector,
  bottomWidgetSelector,
  geoCoderPanelSelector,
  isSplitSelector,
  mapStateToProps,
  modalContainerSelector,
  notificationPanelSelector,
  sidePanelSelector,
  isViewportDisjointed
} from '@kepler.gl/components/dist/kepler-gl';
import {getDefaultLocale} from '../../../i18n/utils';
import {FeatureFlags, FeatureFlagsContextProvider} from '@kepler.gl/components/dist/context';

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
  ({absolute}) => `
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
  onViewStateChange?: (viewState: Viewport) => void;
  onDeckInitialized?: () => void;
  onKeplerGlInitialized?: () => void;
  getMapboxRef?: () => React.RefObject<Map>;
  mapStyles?: {id: string; style?: object}[];
  mapStylesReplaceDefault?: boolean;
  appName?: string;
  version?: string;
  sidePanelWidth?: number;
  theme?: object;
  cloudProviders?: Provider[];
  deckGlProps?: object;
  onLoadCloudMapSuccess?: OnSuccessCallBack;
  onLoadCloudMapError?: OnErrorCallBack;
  onMouseMove?: (event: React.MouseEvent & {lngLat?: [number, number]}) => void;
  onExportToCloudSuccess?: OnSuccessCallBack;
  onExportToCloudError?: OnErrorCallBack;
  readOnly?: boolean;
  featureFlags?: FeatureFlags;

  localeMessages?: {[key: string]: {[key: string]: string}};
  dispatch: Dispatch<any>;

  topMapContainerProps?: object;
  bottomMapContainerProps?: object;
};

type KeplerGLProps = KeplerGlState & KeplerGlActions & KeplerGLBasicProps;
type KeplerGLCompState = {
  dimensions: {width: number; height: number} | null;
};

DatatlasGLFactory.deps = KeplerGlFactory.deps;

function DatatlasGLFactory(
  BottomWidget: ReturnType<typeof BottomWidgetFactory>,
  GeoCoderPanel: ReturnType<typeof GeocoderPanelFactory>,
  MapContainer: ReturnType<typeof MapContainerFactory>,
  MapsLayout: ReturnType<typeof MapsLayoutFactory>,
  ModalContainer: ReturnType<typeof ModalContainerFactory>,
  SidePanel: ReturnType<typeof SidePanelFactory>,
  PlotContainer: ReturnType<typeof PlotContainerFactory>,
  NotificationPanel: ReturnType<typeof NotificationPanelFactory>,
  DndContext: ReturnType<typeof DndContextFactory>
): React.ComponentType<KeplerGLBasicProps & {selector: (...args: any[]) => KeplerGlState}> {
  /** @typedef {import('./kepler-gl').UnconnectedKeplerGlProps} KeplerGlProps */
  /** @augments React.Component<KeplerGlProps> */
  class DatatlasGL extends Component<
    KeplerGLProps & {selector: (...args: any[]) => KeplerGlState},
    KeplerGLCompState
  > {
    static defaultProps = DEFAULT_KEPLER_GL_PROPS;

    state: KeplerGLCompState = {
      dimensions: null
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

    _handleResize = dimensions => {
      this.setState({dimensions});
    };

    static contextType = RootContext;

    root = createRef<HTMLDivElement>();
    bottomWidgetRef = createRef<HTMLDivElement>();

    /* selectors */
    themeSelector = props => props.theme;
    availableThemeSelector = createSelector(this.themeSelector, theme =>
      typeof theme === 'object'
        ? {
            ...basicTheme,
            ...theme
          }
        : theme === THEME.light
        ? themeLT
        : theme === THEME.base
        ? themeBS
        : theme
    );

    datasetsSelector = props => props.visState.datasets;
    filteredDatasetsSelector = createSelector(this.datasetsSelector, getVisibleDatasets);

    availableProviders = createSelector(
      (props: KeplerGLProps) => props.cloudProviders,
      providers =>
        Array.isArray(providers) && providers.length
          ? {
              hasStorage: providers.some(p => p.hasPrivateStorage()),
              hasShare: providers.some(p => p.hasSharingUrl())
            }
          : {}
    );

    localeMessagesSelector = createSelector(
      (props: KeplerGLProps) => props.localeMessages,
      customMessages => (customMessages ? mergeMessages(messages, customMessages) : messages)
    );

    /* private methods */
    _validateMapboxToken() {
      const {mapboxApiAccessToken} = this.props;
      if (!validateToken(mapboxApiAccessToken)) {
        Console.warn(MISSING_MAPBOX_TOKEN);
      }
    }

    _loadMapStyle = () => {
      const defaultStyles = Object.values(this.props.mapStyle.mapStyles);
      // add id to custom map styles if not given
      const customStyles = (this.props.mapStyles || []).map(ms => ({
        ...ms,
        id: ms.id || generateHashId()
      }));

      const allStyles = [...customStyles, ...defaultStyles].reduce((accu, style) => {
        accu[style.id] = style;
        return accu;
      }, {});

      this.props.mapStyleActions.loadMapStyles(allStyles);
    };

    _deleteMapLabels = (containerId, layerId) => {
      this.props.visStateActions.toggleLayerForMap(containerId, layerId);
    };

    // eslint-disable-next-line complexity
    render() {
      const {
        id = 'map',
        width = DEFAULT_KEPLER_GL_PROPS.width,
        height = DEFAULT_KEPLER_GL_PROPS.height,
        uiState,
        visState,
        // readOnly override
        readOnly,

        // features
        featureFlags,

        // cloud providers
        cloudProviders = []
      } = this.props;

      const dimensions = this.state.dimensions || {width, height};
      const {
        splitMaps, // this will store support for split map view is necessary
        interactionConfig
      } = visState;

      const isSplit = isSplitSelector(this.props);
      const theme = this.availableThemeSelector(this.props);
      const localeMessages = this.localeMessagesSelector(this.props);
      const isExportingImage = uiState.exportImage.exporting;
      const availableProviders = this.availableProviders(this.props);

      const filteredDatasets = this.filteredDatasetsSelector(this.props);
      const sideFields = sidePanelSelector(this.props, availableProviders, filteredDatasets);
      const plotContainerFields = plotContainerSelector(this.props);
      const bottomWidgetFields = bottomWidgetSelector(this.props, theme);
      const modalContainerFields = modalContainerSelector(this.props, this.root.current);
      const geoCoderPanelFields = geoCoderPanelSelector(this.props, dimensions);
      const notificationPanelFields = notificationPanelSelector(this.props);
      const mapContainers = !isSplit
        ? [<MapContainer primary={true} key={0} index={0} {...mapFieldsSelector(this.props)} />]
        : splitMaps.map((settings, index) => (
            <MapContainer
              key={index}
              index={index}
              primary={index === 1}
              {...mapFieldsSelector(this.props, index)}
              containerId={index}
              deleteMapLabels={this._deleteMapLabels}
            />
          ));

      return (
        <RootContext.Provider value={this.root}>
          <FeatureFlagsContextProvider featureFlags={featureFlags}>
            <NestedIntlProvider
              locale={uiState.locale}
              defaultLocale={getDefaultLocale()}
              messages={localeMessages[uiState.locale]}
            >
              <ThemeProvider theme={theme}>
                <CloudListProvider providers={cloudProviders}>
                  <div
                    className="kepler-gl"
                    id={`kepler-gl__${id}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      width: `${width}px`,
                      height: `${height}px`
                    }}
                    ref={this.root}
                  >
                    <NotificationPanel {...notificationPanelFields} />
                    <DndContext>
                      {!uiState.readOnly && !readOnly && <SidePanel {...sideFields} />}
                      <MapsLayout className="maps" mapState={this.props.mapState}>
                        {mapContainers}
                      </MapsLayout>
                    </DndContext>
                    {isExportingImage && <PlotContainer {...plotContainerFields} />}
                    {/* 1 geocoder: single mode OR split mode and synced viewports */}
                    {!isViewportDisjointed(this.props) && interactionConfig.geocoder.enabled && (
                      <GeoCoderPanel {...geoCoderPanelFields} index={0} unsyncedViewports={false} />
                    )}
                    {/* 2 geocoders: split mode and unsynced viewports */}
                    {isViewportDisjointed(this.props) &&
                      interactionConfig.geocoder.enabled &&
                      mapContainers.map((_mapContainer, index) => (
                        <GeoCoderPanel
                          key={index}
                          {...geoCoderPanelFields}
                          index={index}
                          unsyncedViewports={true}
                        />
                      ))}
                    <BottomWidgetOuter absolute={!hasPortableWidth(breakPointValues)}>
                      <BottomWidget
                        rootRef={this.bottomWidgetRef}
                        {...bottomWidgetFields}
                        containerW={dimensions.width}
                        theme={theme}
                      />
                    </BottomWidgetOuter>
                    <ModalContainer
                      {...modalContainerFields}
                      containerW={dimensions.width}
                      containerH={dimensions.height}
                    />
                  </div>
                </CloudListProvider>
              </ThemeProvider>
            </NestedIntlProvider>
          </FeatureFlagsContextProvider>
        </RootContext.Provider>
      );
    }
  }

  return keplerGlConnect(
    mapStateToProps,
    makeMapDispatchToProps
  )(withTheme(DatatlasGL)) as ReturnType<typeof KeplerGlFactory>;
}

function makeMapDispatchToProps() {
  const getActionCreators = makeGetActionCreators();
  const mapDispatchToProps = (dispatch, ownProps) => {
    const groupedActionCreators = getActionCreators(dispatch, ownProps);

    return {
      ...groupedActionCreators,
      dispatch
    };
  };

  return mapDispatchToProps;
}

export function replaceKeplerGL() {
  return [KeplerGlFactory, DatatlasGLFactory];
}
