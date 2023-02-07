import { UserInterface } from './UserInterface';
import { DatasetInterface } from './DatasetInterface';

export interface ProjectInterface {
  id: number | string;
  name: string;
  draft: boolean;
  datasets: DatasetInterface[];
  owner: UserInterface;
  updatedAt: Date;
}
