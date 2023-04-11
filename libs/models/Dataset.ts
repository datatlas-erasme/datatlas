import { DatasetInterface } from './DatasetInterface';
import { KeplerVersionedDatasetInterface } from './kepler';

export class Dataset implements DatasetInterface {
  id: string;
  url: string;
  updatedAt: Date;
  checksum: string;
  warning: string;
  data: KeplerVersionedDatasetInterface['data'];
  version: 'v1';

  constructor(dataset: Dataset) {
    this.id = dataset.id;
    this.url = dataset.url;
    this.data = dataset.data;
    this.version = dataset.version;
    this.updatedAt = dataset.updatedAt;
    this.checksum = dataset.checksum;
    this.warning = dataset.warning;
  }
}
