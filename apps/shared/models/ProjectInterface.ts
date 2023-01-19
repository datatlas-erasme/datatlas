import { UserInterface } from './UserInterface';
import { DatasetInterface } from './DatasetInterface';

export interface ProjectInterface {
  id: number;
  name: string;
  published: boolean;
  datasets: DatasetInterface[];
  owner: UserInterface;
}
