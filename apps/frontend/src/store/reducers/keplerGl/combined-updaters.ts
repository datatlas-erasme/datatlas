import {
  merge_,
  pick_,
  apply_,
  compose_,
  findMapBounds,
  if_,
  payload_,
  with_,
  combinedUpdaters,
  uiStateUpdaters,
  visStateUpdaters,
  mapStateUpdaters,
  mapStyleUpdaters
} from '@kepler.gl/reducers';
import {AddDataToMapPayload} from '@kepler.gl/types';
import {DatatlasGlState, VisState} from '@datatlas/models';
import {Layer} from '@kepler.gl/layers';
import {loadFilesSuccessUpdaterAction, VisStateActions} from '@kepler.gl/actions';
import {filesToDataPayload} from '@kepler.gl/processors';
import {VisState as KeplerVisState} from '@kepler.gl/schemas';
import {updateVisDataUpdater} from './vis-state-updaters';

/**
 * Combine data and full configuration update in a single action
 *
 * @memberof combinedUpdaters
 * @param {Object} state kepler.gl instance state, containing all subreducer state
 * @param {Object} action
 * @param {Object} action.payload `{datasets, options, config}`
 * @param action.payload.datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param [action.payload.options] option object `{centerMap: true}`
 * @param [action.payload.config] map config
 * @param [action.payload.info] map info contains title and description
 * @returns nextState
 *
 * @typedef {Object} Dataset
 * @property info -info of a dataset
 * @property info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @property info.label - A display name of this dataset
 * @property data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @property data.fields - ***required** Array of fields,
 * @property data.fields.name - ***required** Name of the field,
 * @property data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`
 *
 * @public
 */
export const addDataToMapUpdater = (
  state: DatatlasGlState,
  {payload}: {payload: AddDataToMapPayload}
): DatatlasGlState => {
  const {datasets, config, info} = payload;

  const options = {
    ...combinedUpdaters.defaultAddDataToMapOptions,
    ...payload.options
  };

  // check if proggresive loading dataset by bataches, and update visState directly
  const isProgressiveLoading =
    Array.isArray(datasets) &&
    datasets[0]?.info.format === 'arrow' &&
    datasets[0]?.info.id &&
    datasets[0]?.info.id in state.visState.datasets;
  if (isProgressiveLoading) {
    return compose_<DatatlasGlState>([
      pick_('visState')(
        apply_<VisState, any>(updateVisDataUpdater, {
          datasets,
          options,
          config
        })
      )
    ])(state);
  }

  // @ts-expect-error
  let parsedConfig: ParsedConfig = config;

  if (combinedUpdaters.isValidConfig(config)) {
    // if passed in saved config
    // @ts-expect-error
    parsedConfig = state.visState.schema.parseSavedConfig(config);
  }
  const oldLayers = state.visState.layers;
  const filterNewlyAddedLayers = (layers: Layer[]) =>
    layers.filter(nl => !oldLayers.find(ol => ol === nl));

  // Returns undefined if not found, to make typescript happy
  const findMapBoundsIfCentered = (layers: Layer[]) => {
    const bounds = options.centerMap && findMapBounds(layers);
    return bounds ? bounds : undefined;
  };

  return compose_<DatatlasGlState>([
    pick_('visState')(
      apply_<VisState, any>(updateVisDataUpdater, {
        datasets,
        options,
        config: parsedConfig
      })
    ),

    if_(
      Boolean(info),
      pick_('visState')(
        apply_<VisState, any>(
          (state: VisState, action: VisStateActions.SetMapInfoUpdaterAction) =>
            visStateUpdaters.setMapInfoUpdater(state as KeplerVisState, action) as VisState,
          {info}
        )
      )
    ),
    with_(({visState}) =>
      pick_('mapState')(
        apply_(
          mapStateUpdaters.receiveMapConfigUpdater,
          payload_({
            config: parsedConfig,
            options,
            bounds: findMapBoundsIfCentered(filterNewlyAddedLayers(visState.layers))
          })
        )
      )
    ),
    pick_('mapStyle')(
      apply_(mapStyleUpdaters.receiveMapConfigUpdater, payload_({config: parsedConfig, options}))
    ),
    pick_('uiState')(apply_(uiStateUpdaters.loadFilesSuccessUpdater, payload_(null))),
    pick_('uiState')(apply_(uiStateUpdaters.toggleModalUpdater, payload_(null))),
    pick_('uiState')(merge_(options.hasOwnProperty('readOnly') ? {readOnly: options.readOnly} : {}))
  ])(state);
};

export const loadFilesSuccessUpdater = (
  state: DatatlasGlState,
  action: loadFilesSuccessUpdaterAction
): DatatlasGlState => {
  // still more to load
  const payloads = filesToDataPayload(action.result);
  const nextState = compose_([
    pick_('visState')(
      merge_({
        fileLoading: false,
        fileLoadingProgress: {}
      })
    )
  ])(state);
  // make multiple add data to map calls
  const stateWithData = compose_(payloads.map(p => apply_(addDataToMapUpdater, payload_(p))))(
    nextState
  );
  return stateWithData;
};
