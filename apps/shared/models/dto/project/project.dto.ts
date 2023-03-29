export class ProjectDto {
  id?: number;
  readonly title?: string;
  createdAt?: Date;
  draft?: boolean;
  datasets?: object;
  description?: string;
  owner?: object;

  constructor(userData: {
    id?: number;
    title?: string;
    draft?: boolean;
    datasets?: object;
    description?: string;
    owner?: object;
  }) {
    this.id = userData.id;
    this.title = userData.title;
    this.draft = userData.draft;
    this.datasets = userData.datasets;
    this.description = userData.description;
    this.owner = userData.owner;
    /*

    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;*/
  }
}
