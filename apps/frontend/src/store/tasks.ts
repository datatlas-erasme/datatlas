import Task from 'react-palm/tasks';
import { readFileInBatches } from '../kepler';

export const LOAD_FILE_TASK = Task.fromPromise(
  ({ file, fileCache, loaders, loadOptions }) => readFileInBatches({ file, fileCache, loaders, loadOptions }),
  'LOAD_FILE_TASK'
);
