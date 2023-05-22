import { BaseMapStyle } from 'kepler.gl/reducers';
import { SavedMapStyle } from 'kepler.gl/schemas/schema-manager';
import { hexToRgb } from 'kepler.gl/dist/utils';
import { DEFAULT_LAYER_GROUPS, ICON_PREFIX } from 'kepler.gl/dist/constants/default-settings';
import { SavedCustomMapStyle } from 'kepler.gl/src/schemas/schema-manager';
import { getInitialInputStyle } from 'kepler.gl/dist/reducers/map-style-updaters';

export class KeplerMapStyle implements SavedMapStyle {
  public static readonly DEFAULT_MAP_STYLES: BaseMapStyle[] = [
    {
      id: 'dark',
      label: 'Sombre',
      url: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
      icon: `${ICON_PREFIX}/UBER_DARK_V2.png`,
      layerGroups: DEFAULT_LAYER_GROUPS,
    },
    {
      id: 'light',
      label: 'Clair',
      url: 'mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4',
      icon: `${ICON_PREFIX}/UBER_LIGHT_V2.png`,
      layerGroups: DEFAULT_LAYER_GROUPS,
    },
    {
      id: 'muted',
      label: 'Clair tamisé',
      url: 'mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4',
      icon: `${ICON_PREFIX}/UBER_MUTED_LIGHT.png`,
      layerGroups: DEFAULT_LAYER_GROUPS,
    },
    {
      id: 'muted_night',
      label: 'Nuit tamisé',
      url: 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs',
      icon: `${ICON_PREFIX}/UBER_MUTED_NIGHT.png`,
      layerGroups: DEFAULT_LAYER_GROUPS,
    },
    {
      id: 'satellite',
      label: 'Satellite',
      url: `mapbox://styles/mapbox/satellite-v9`,
      icon: `${ICON_PREFIX}/UBER_SATELLITE.png`,
      layerGroups: [],
    },
  ];

  mapStyles = {};
  styleType = 'dark';
  topLayerGroups = {};
  threeDBuildingColor = hexToRgb('#D1CEC7');
  visibleLayerGroups = {};

  // save mapbox access token
  mapboxApiAccessToken?: string = '';
  mapboxApiUrl = 'https://api.mapbox.com';
  mapStylesReplaceDefault = false;
  inputStyle = getInitialInputStyle();
  custom3DBuildingColor = false;

  constructor(mapStyle: Partial<KeplerMapStyle> = {}) {
    Object.assign(this, mapStyle);

    if (!this.mapboxApiAccessToken) {
      console.warn('A mapbox API access token must be provided.');
    }

    this.mapStyles = KeplerMapStyle.createMapStyles(this.mapStyles, this.mapboxApiAccessToken || '');
  }

  public static enhance(mapStyle: KeplerMapStyle, accessToken?: string): KeplerMapStyle {
    return {
      ...mapStyle,
      mapStyles: KeplerMapStyle.enhanceMapStyles(mapStyle.mapStyles, accessToken),
    };
  }

  static enhanceMapStyles(mapStyles: SavedCustomMapStyle = {}, accessToken?: string): SavedCustomMapStyle {
    const defaultMapStylesMap = KeplerMapStyle.getDefaultMapStylesMap();
    return Object.values(mapStyles).reduce((mapStyles: SavedCustomMapStyle, mapStyle: SavedCustomMapStyle[string]) => {
      return {
        [mapStyle.id]: Object.assign({ accessToken, custom: false }, defaultMapStylesMap[mapStyle.id], mapStyle),
      };
    }, {});
  }

  static createMapStyles(previousMapStyles: SavedCustomMapStyle = {}, accessToken: string) {
    return KeplerMapStyle.DEFAULT_MAP_STYLES.reduce(
      (accu: SavedCustomMapStyle, curr: BaseMapStyle) => ({
        ...accu,
        [curr.id]: Object.assign(
          curr,
          { accessToken, custom: false },
          previousMapStyles[curr.id] ? { accessToken: previousMapStyles[curr.id].accessToken } : {}
        ),
      }),
      {}
    );
  }

  static getDefaultMapStylesMap() {
    return KeplerMapStyle.DEFAULT_MAP_STYLES.reduce(
      (accu: SavedCustomMapStyle, curr: BaseMapStyle) => ({
        ...accu,
        [curr.id]: Object.assign(curr),
      }),
      {}
    );
  }
}
