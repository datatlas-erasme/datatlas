import { createTransform } from 'redux-persist';
import { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerMapStyle } from '@datatlas/models';

export const MapStylesTransform = createTransform(
  (inboundState: KeplerGlState) => inboundState,
  (outboundState: KeplerGlState) => {
    return Object.keys(outboundState).reduce((inboundState, id) => {
      inboundState[id] = {
        ...outboundState[id],
        mapStyle: {
          ...outboundState[id].mapStyle,
          mapStyles: KeplerMapStyle.createMapStyles({}, process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''),
        },
      };
      return inboundState;
    }, {});
  },
  { whitelist: ['keplerGl'] }
);
