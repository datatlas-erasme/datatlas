import { createTransform } from 'redux-persist';
import { KeplerGlState } from '@kepler.gl/reducers';
import { createDataContainer } from '@kepler.gl/utils';

export const DataContainerTransform = createTransform(
  (inboundState: KeplerGlState) => inboundState,
  (outboundState: KeplerGlState) => {
    return Object.keys(outboundState).reduce((inboundState, id) => {
      inboundState[id] = {
        ...outboundState[id],
        visState: {
          ...outboundState[id].visState,
          datasets: Object.keys(outboundState[id].visState.datasets).reduce((datasets, datasetId) => {
            const dataset = outboundState[id].visState.datasets[datasetId];
            datasets[datasetId] = {
              ...dataset,
              dataContainer: createDataContainer(dataset.dataContainer),
            };
            return datasets;
          }, {}),
        },
      };
      return inboundState;
    }, {}) as KeplerGlState;
  },
  { whitelist: ['keplerGl'] }
);
