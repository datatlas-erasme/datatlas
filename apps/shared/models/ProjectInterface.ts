import { UserInterface } from './UserInterface';
import { DatasetInterface } from './DatasetInterface';
import { KeplerVersionedMapConfigInterface } from './kepler';

export interface ProjectInterface extends KeplerVersionedMapConfigInterface {
  id: number | string;
  createdAt: Date;
  title: string;
  draft: boolean;
  datasets: DatasetInterface[];
  description: string;
  owner: UserInterface;
  contributors: UserInterface[];
  copyEnabled: boolean;
}
