import {ProtoDataset} from '@kepler.gl/types';
import {Datasets, getNewDatasetColor} from '@kepler.gl/table';
import {validateInputData} from '@kepler.gl/utils';
import {DatatlasTable} from '../table/DatatlasTable';

/**
 * Take datasets payload from addDataToMap, create datasets entry save to visState
 */
export function createNewDataEntry(
  {info, data, ...opts}: ProtoDataset,
  datasets: Datasets = {}
): Datasets {
  const validatedData = validateInputData(data);
  if (!validatedData) {
    return {};
  }

  // check if dataset already exists, and update it when loading data by batches incrementally
  if (info && info.id && datasets[info.id]) {
    // get keplerTable from datasets
    const keplerTable = datasets[info.id];
    // update the data in keplerTable
    keplerTable.update(validatedData);
    return {
      [keplerTable.id]: keplerTable
    };
  }

  info = info || {};
  const color = info.color || getNewDatasetColor(datasets);

  const keplerTable = new DatatlasTable({info, data: validatedData, color, ...opts});
  return {
    [keplerTable.id]: keplerTable
  };
}
