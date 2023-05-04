import { UserInterface } from './UserInterface';
import { DatasetInterface } from './DatasetInterface';
import { KeplerVersionedMapConfigInterface } from './kepler';
import { SavedMapState, SavedMapStyle, SavedVisState } from 'kepler.gl/src/schemas/schema-manager';

export interface ProjectInterface extends KeplerVersionedMapConfigInterface {
  id: number;
  createdAt: Date;
  title: string;
  draft: boolean;
  datasets: DatasetInterface[];
  description?: string;
  owner: UserInterface;
  contributors: UserInterface[];
  version: 'v1';
  config: {
    visState: SavedVisState;
    mapState: SavedMapState;
    mapStyle: SavedMapStyle;
  };
}
