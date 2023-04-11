import { KeplerVersionedDatasetInterface } from './KeplerVersionedDatasetInterface';

export class KeplerVersionedDataset implements KeplerVersionedDatasetInterface {
  data: KeplerVersionedDatasetInterface['data'];
  version = 'v1' as const;

  constructor(data: KeplerVersionedDatasetInterface['data']) {
    this.data = data;
  }
}
