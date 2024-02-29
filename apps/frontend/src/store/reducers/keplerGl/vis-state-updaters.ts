import {withTask} from 'react-palm/tasks';
import {UNWRAP_TASK, DELAY_TASK} from '@kepler.gl/tasks';
import {LOAD_FILE_TASK} from '../../tasks';
import {
  initialFileLoadingProgress,
  merge_,
  parseProgress,
  pick_,
  updateFileLoadingProgressUpdater,
  applyMergersUpdater,
  mergeDatasetsByOrder,
  receiveMapConfigUpdater
} from '@kepler.gl/reducers';
import {
  loadFilesSuccess,
  loadFilesErr,
  nextFileBatch,
  processFileContent,
  loadNextFile,
  wrapTo,
  VisStateActions
} from '@kepler.gl/actions';
import {wrapCreatorTo} from '../../actions';
import {createNewDataEntry, VisState} from '@datatlas/models';
import {toArray} from '@kepler.gl/utils';
import {VisState as KeplerVisState} from '@kepler.gl/schemas';

/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateUpdaters
 * @public
 */
// eslint-disable-next-line complexity
export const updateVisDataUpdater = (
  state: VisState,
  action: VisStateActions.UpdateVisDataUpdaterAction
): VisState => {
  // datasets can be a single data entries or an array of multiple data entries
  const {config, options} = action;

  // apply config if passed from action
  // TODO: we don't handle asyn mergers here yet
  const previousState = config
    ? receiveMapConfigUpdater(state as KeplerVisState, {
        payload: {config, options}
      })
    : state;

  const datasets = toArray(action.datasets);

  const newDataEntries = datasets.reduce(
    // @ts-expect-error  Type '{}' is missing the following properties from type 'ProtoDataset': data, info
    (accu, {info = {}, ...rest} = {}) => ({
      ...accu,
      ...(createNewDataEntry({info, ...rest}, state.datasets) || {})
    }),
    {}
  );

  // save new dataset entry to state
  const mergedState = {
    ...previousState,
    datasets: mergeDatasetsByOrder(previousState as KeplerVisState, newDataEntries)
  };

  // merge state with config to be merged
  const layerMergers = state.mergers.filter(m => m.waitForLayerData);
  const datasetMergers = state.mergers.filter(m => !layerMergers.includes(m));

  const newDataIds = Object.keys(newDataEntries);
  const postMergerPayload = {
    newDataIds,
    options,
    layerMergers
  };

  return applyMergersUpdater(mergedState as KeplerVisState, {
    mergers: datasetMergers,
    postMergerPayload
  }) as VisState;
};

export const loadFilesUpdater = (state, action) => {
  const instanceId = action.meta._id_;
  const {files, onFinish = wrapCreatorTo(instanceId, loadFilesSuccess)} = action;

  if (!files.length) {
    return state;
  }

  const fileLoadingProgress = Array.from(files).reduce(
    (accu, f, i) => merge_(initialFileLoadingProgress(f, i))(accu),
    {}
  );

  const fileLoading = {
    fileCache: [],
    filesToLoad: files,
    onFinish
  };

  const nextState = merge_({fileLoadingProgress, fileLoading})(state);

  return loadNextFileUpdater(nextState, instanceId);
};

export function loadNextFileUpdater(state, instanceId?: number) {
  if (!state.fileLoading) {
    return state;
  }
  const {filesToLoad} = state.fileLoading;
  const [file, ...remainingFilesToLoad] = filesToLoad;

  // save filesToLoad to state
  const nextState = pick_('fileLoading')(merge_({filesToLoad: remainingFilesToLoad}))(state);

  const stateWithProgress = updateFileLoadingProgressUpdater(nextState, {
    fileName: file.name,
    progress: {percent: 0, message: 'loading...'}
  });

  const {loaders, loadOptions} = state;
  return withTask(
    stateWithProgress,
    makeLoadFileTask(file, nextState.fileLoading.fileCache, loaders, loadOptions, instanceId)
  );
}

export function makeLoadFileTask(
  file,
  fileCache,
  loaders = [],
  loadOptions = {},
  instanceId?: number
) {
  return LOAD_FILE_TASK({file, fileCache, loaders, loadOptions}).bimap(
    // prettier ignore
    // success
    gen =>
      wrapTo(instanceId)(
        nextFileBatch({
          gen,
          fileName: file.name,
          onFinish: result =>
            wrapTo(instanceId)(
              processFileContent({
                content: result,
                fileCache
              })
            )
        })
      ),

    // error
    err => loadFilesErr(file.name, err)
  );
}

export const nextFileBatchUpdater = (
  state,
  {payload: {gen, fileName, progress, accumulated, onFinish}, meta: {_id_}}
) => {
  const stateWithProgress = updateFileLoadingProgressUpdater(state, {
    fileName,
    progress: parseProgress(state.fileLoadingProgress[fileName], progress)
  });
  return withTask(
    stateWithProgress,
    UNWRAP_TASK(gen.next()).bimap(
      ({value, done}) => {
        return done
          ? onFinish(accumulated)
          : wrapTo(_id_)(
              nextFileBatch({
                gen,
                fileName,
                progress: value.progress,
                accumulated: value,
                onFinish
              })
            );
      },
      err => wrapTo(_id_)(loadFilesErr(fileName, err))
    )
  );
};

export const loadFilesErrUpdater = (state, {error, fileName, meta: {_id_}}) => {
  // update ui with error message
  console.warn(error);
  if (!state.fileLoading) {
    return state;
  }
  const {filesToLoad, onFinish, fileCache} = state.fileLoading;

  const nextState = updateFileLoadingProgressUpdater(state, {
    fileName,
    progress: {error}
  });

  // kick off next file or finish
  return withTask(
    nextState,
    DELAY_TASK(200).map(
      filesToLoad.length ? wrapCreatorTo(_id_, loadNextFile) : () => onFinish(fileCache)
    )
  );
};
