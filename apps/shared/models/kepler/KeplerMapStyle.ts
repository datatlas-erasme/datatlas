import { BaseMapStyle } from 'kepler.gl/reducers';
import { SavedMapStyle } from 'kepler.gl/schemas/schema-manager';
import { hexToRgb } from 'kepler.gl/dist/utils';
import { DEFAULT_LAYER_GROUPS, ICON_PREFIX } from 'kepler.gl/dist/constants/default-settings';

export const DEFAULT_MAP_STYLES: BaseMapStyle[] = [
  {
    id: 'dark',
    label: 'Dark',
    url: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
    icon: `${ICON_PREFIX}/UBER_DARK_V2.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: 'light',
    label: 'Light',
    url: 'mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4',
    icon: `${ICON_PREFIX}/UBER_LIGHT_V2.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: 'muted',
    label: 'Muted Light',
    url: 'mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4',
    icon: `${ICON_PREFIX}/UBER_MUTED_LIGHT.png`,
    layerGroups: DEFAULT_LAYER_GROUPS,
  },
  {
    id: 'muted_night',
    label: 'Muted Night',
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

export class KeplerMapStyle implements SavedMapStyle {
  mapStyles = {};
  styleType = 'dark';
  topLayerGroups = {};
  threeDBuildingColor = hexToRgb('#D1CEC7');
  visibleLayerGroups = {};

  constructor(styleType: BaseMapStyle['id'] = 'dark') {
    this.styleType = styleType;
    this.mapStyles = KeplerMapStyle.createMapStyles();
  }

  static createMapStyles() {
    return DEFAULT_MAP_STYLES.reduce(
      (accu: Record<string, BaseMapStyle>, curr: BaseMapStyle) => ({
        ...accu,
        [curr.id]: { ...curr, accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN },
      }),
      {}
    );
  }
}
