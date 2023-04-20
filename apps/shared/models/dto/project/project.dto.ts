//import { UserEntity } from '@datatlas/shared/models';

export class ProjectDto {
  id?: number;
  readonly title?: string;
  createdAt?: Date;
  draft?: boolean;
  datasets?: object;
  description?: string;
  owner?: object; // Either id number or user entity. object[] represents UserEntity[].
  contributors?: object[] | number[];
  config?: object;
  version?: string;

  constructor(projectData: {
    id?: number;
    title?: string;
    draft?: boolean;
    datasets?: object;
    description?: string;
    owner?: object;
    contributors?: object[] | number[]; // Either id number or user entity. object[] represents UserEntity[].
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
