/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions, @typescript-eslint/consistent-type-assertions */
import { Loader, parseInBatches } from '@loaders.gl/core';
import { _JSONPath, JSONLoader } from '@loaders.gl/json';
import { FileCacheItem, isArrowTable, makeProgressIterator } from '@kepler.gl/processors';

const BATCH_TYPE = {
  METADATA: 'metadata',
  PARTIAL_RESULT: 'partial-result',
  FINAL_RESULT: 'final-result',
};

const CSV_LOADER_OPTIONS = {
  shape: 'object-row-table',
  dynamicTyping: false, // not working for now
};

const ARROW_LOADER_OPTIONS = {
  shape: 'arrow-table',
  batchDebounceMs: 10, // time to delay between batches, for incremental loading
};

const JSON_LOADER_OPTIONS = {
  shape: 'object-row-table',
  // instruct loaders.gl on what json paths to stream
  jsonpaths: [
    '$', // JSON Row array
    '$.features', // GeoJSON
    '$.datasets', // KeplerGL JSON
  ],
};

// eslint-disable-next-line complexity
export async function* readBatch(asyncIterator: AsyncIterable<any>, fileName: string): AsyncGenerator {
  let result = null;
  const batches = <any>[];
  for await (const batch of asyncIterator) {
    // Last batch will have this special type and will provide all the root
    // properties of the parsed document.
    // Only json parse will have `FINAL_RESULT`
    if (batch.batchType === BATCH_TYPE.FINAL_RESULT) {
      if (batch.container) {
        result = { ...batch.container };
      }
      // Set the streamed data correctly is Batch json path is set
      // and the path streamed is not the top level object (jsonpath = '$')
      if (batch.jsonpath && batch.jsonpath.length > 1) {
        const streamingPath = new _JSONPath(batch.jsonpath);
        streamingPath.setFieldAtPath(result, batches);
      } else if (batch.jsonpath && batch.jsonpath.length === 1) {
        // The streamed object is a ROW JSON-batch (jsonpath = '$')
        // row objects
        result = batches;
      }
    } else {
      const batchData = isArrowTable(batch.data) ? batch.data.batches : batch.data;
      for (let i = 0; i < batchData?.length; i++) {
        batches.push(batchData[i]);
      }
    }

    yield {
      ...batch,
      ...(batch.schema ? { headers: Object.keys(batch.schema) } : {}),
      fileName,
      // if dataset is CSV, data is set to the raw batches
      data: result ? result : batches,
    };
  }
}

export async function readFileInBatches({
  file,
  loaders = [],
  loadOptions = {},
}: {
  file: File;
  fileCache: FileCacheItem[];
  loaders: Loader[];
  loadOptions: any;
}): Promise<AsyncGenerator> {
  loaders = [JSONLoader, ...loaders];
  loadOptions = {
    csv: CSV_LOADER_OPTIONS,
    arrow: ARROW_LOADER_OPTIONS,
    json: JSON_LOADER_OPTIONS,
    metadata: true,
    ...loadOptions,
  };

  const batchIterator = await parseInBatches(file, loaders, loadOptions);
  const progressIterator = makeProgressIterator(batchIterator, { size: file.size });

  return readBatch(progressIterator, file.name);
}
