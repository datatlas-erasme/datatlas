import { KeplerVersionedDataset } from './kepler';

export interface DatasetInterface extends KeplerVersionedDataset {
  id: string;
  url: string;
  updatedAt: Date;
  checksum: string;
  warning: string;
}
