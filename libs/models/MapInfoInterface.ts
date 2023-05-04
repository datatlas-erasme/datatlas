import { SavedMap } from 'kepler.gl/schemas/schema-manager';
import { UserInterface } from './UserInterface';

export type MapInfoInterface = Omit<Partial<SavedMap['info']>, 'created_at'> & {
  createdAt: Date;
  ownerId: UserInterface['id'];
  description?: string;
};
