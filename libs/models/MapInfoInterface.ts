import { SavedMap } from 'kepler.gl/schemas/schema-manager';
import { NormalizedProjectProperties } from './NormalizedProjectInterface';

export type MapInfoInterface = Omit<Partial<SavedMap['info']>, 'created_at'> &
  NormalizedProjectProperties & {
    createdAt: Date;
    description?: string;
  };
