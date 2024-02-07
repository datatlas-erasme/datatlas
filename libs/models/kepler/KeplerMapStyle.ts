import { BaseMapStyle, SavedCustomMapStyle, SavedMapStyle as KeplerSavedMapStyle } from '@kepler.gl/types';
import { hexToRgb } from '@kepler.gl/utils';

export class SavedMapStyle implements KeplerSavedMapStyle {
  public static readonly DEFAULT_MAP_STYLES: BaseMapStyle[] = [
    {
      id: 'klokantech-basic',
      label: 'Grand Lyon Basique',
      url: 'https://openmaptiles.data.grandlyon.com/styles/klokantech-basic/style.json',
      icon: 'https://openmaptiles.data.grandlyon.com/styles/klokantech-basic/11/1052/730.png',
      layerGroups: [],
    },
    {
      id: 'vector',
      label: 'Grand Lyon Claire',
      url: 'https://openmaptiles.data.grandlyon.com/styles/vector/style.json',
      icon: 'https://openmaptiles.data.grandlyon.com/styles/vector/11/1050/729.png',
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

  constructor(mapStyle: Partial<SavedMapStyle> = {}) {
    Object.assign(this, mapStyle);

    if (!this.mapboxApiAccessToken) {
      console.warn('A mapbox API access token must be provided.');
    }

    this.mapStyles = SavedMapStyle.createMapStyles(this.mapStyles, this.mapboxApiAccessToken || '');
  }

  public static enhance(mapStyle?: Partial<SavedMapStyle>, accessToken?: string): SavedMapStyle {
    return {
      styleType: 'dark',
      topLayerGroups: {},
      threeDBuildingColor: hexToRgb('#D1CEC7'),
      visibleLayerGroups: {},
      ...mapStyle,
      mapStyles: SavedMapStyle.enhanceMapStyles(mapStyle?.mapStyles, accessToken),
    };
  }

  static enhanceMapStyles(mapStyles: SavedCustomMapStyle = {}, accessToken?: string): SavedCustomMapStyle {
    const defaultMapStylesMap = SavedMapStyle.getDefaultMapStylesMap();
    return Object.values(mapStyles).reduce((mapStyles: SavedCustomMapStyle, mapStyle: SavedCustomMapStyle[string]) => {
      return {
        [mapStyle.id]: Object.assign({ accessToken, custom: false }, defaultMapStylesMap[mapStyle.id], mapStyle),
      };
    }, {});
  }

  static createMapStyles(previousMapStyles: SavedCustomMapStyle = {}, accessToken: string) {
    return SavedMapStyle.DEFAULT_MAP_STYLES.reduce(
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
    return SavedMapStyle.DEFAULT_MAP_STYLES.reduce(
      (accu: SavedCustomMapStyle, curr: BaseMapStyle) => ({
        ...accu,
        [curr.id]: Object.assign(curr),
      }),
      {}
    );
  }
}
