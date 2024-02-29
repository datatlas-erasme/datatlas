import {MapStyle, getInitialInputStyle} from '@kepler.gl/reducers';
import {hexToRgb} from '@kepler.gl/utils';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BLDG_COLOR,
  DEFAULT_MAPBOX_API_URL
} from '@kepler.gl/constants';
import {SavedMapStyle} from '@datatlas/models';

const getDefaultState = (): MapStyle => {
  const visibleLayerGroups = {};
  const styleType = 'dark-matter';
  const topLayerGroups = {};

  return {
    styleType,
    visibleLayerGroups,
    topLayerGroups,
    mapStyles: SavedMapStyle.DEFAULT_MAP_STYLES.reduce(
      (accu, curr) => ({
        ...accu,
        [curr.id]: curr
      }),
      {}
    ),
    // save mapbox access token
    mapboxApiAccessToken: null,
    mapboxApiUrl: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || DEFAULT_MAPBOX_API_URL,
    mapStylesReplaceDefault: false,
    inputStyle: getInitialInputStyle(),
    threeDBuildingColor: hexToRgb(DEFAULT_BLDG_COLOR),
    custom3DBuildingColor: false,
    backgroundColor: hexToRgb(DEFAULT_BACKGROUND_COLOR),
    isLoading: {},
    bottomMapStyle: undefined,
    topMapStyle: undefined
  };
};

export const INITIAL_MAP_STYLE: MapStyle = getDefaultState();
