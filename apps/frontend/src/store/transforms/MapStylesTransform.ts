import { createTransform } from 'redux-persist';
import { SavedMapStyle, DatatlasGlState } from '@datatlas/models';

export const MapStylesTransform = createTransform(
  (inboundState: DatatlasGlState) => inboundState,
  (outboundState: DatatlasGlState) => {
    return Object.keys(outboundState).reduce((inboundState, id) => {
      inboundState[id] = {
        ...outboundState[id],
        mapStyle: {
          ...outboundState[id].mapStyle,
          mapStyles: SavedMapStyle.createMapStyles({}, process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''),
        },
      };
      return inboundState;
    }, {}) as DatatlasGlState;
  },
  { whitelist: ['keplerGl'] }
);
