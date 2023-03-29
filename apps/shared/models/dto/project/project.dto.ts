export class ProjectDto {
  id?: number;
  readonly title?: string;
  createdAt?: Date;

  constructor(userData: { id?: number; title?: string }) {
    this.id = userData.id;
    this.title = userData.title; /*
    this.description = description;
    this.draft = draft;
    this.datasets = datasets;
    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;*/
  }
}
