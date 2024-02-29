import { UserInterface } from './UserInterface';
import { DatasetInterface } from './DatasetInterface';
import { VersionedSavedMapConfig } from './kepler';

export interface ProjectInterface extends VersionedSavedMapConfig {
  id: number;
  createdAt: Date;
  title: string;
  draft: boolean;
  datasets: DatasetInterface[];
  description?: string;
  owner: UserInterface;
  contributors: UserInterface[];
}
