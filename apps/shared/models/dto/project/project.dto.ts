// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserEntity } from '@datatlas/shared/models';

export class ProjectDto {
  id?: number;
  readonly title?: string;
  createdAt?: Date;
  draft?: boolean;
  datasets?: object;
  description?: string;
  owner?: object; // Either id number or user entity.
  contributors?: UserEntity[] | number[];
  config?: object;
  version?: string;

  constructor(projectData: {
    id?: number;
    title?: string;
    draft?: boolean;
    datasets?: object;
    description?: string;
    owner?: object;
    contributors?: UserEntity[] | number[]; // Either id number or user entity.
    config?: object;
    version?: string;
  }) {
    this.id = projectData.id;
    this.title = projectData.title;
    this.draft = projectData.draft;
    this.datasets = projectData.datasets;
    this.description = projectData.description;
    this.owner = projectData.owner;
    this.contributors = projectData.contributors;
    this.config = projectData.config;
    this.version = projectData.version;
  }
}
