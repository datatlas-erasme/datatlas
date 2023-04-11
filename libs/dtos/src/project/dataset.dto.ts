import { DatasetInterface, KeplerVersionedDatasetInterface } from '@datatlas/models';

export class DatasetDto implements DatasetInterface {
  id: string;
  url: string;
  updatedAt: Date;
  checksum: string;
  warning: string;
  data: KeplerVersionedDatasetInterface['data'];
  version = 'v1' as const;
}
