export class ProjectDto {
  id?: number;
  readonly title?: string;
  createdAt?: Date;
  draft?:boolean;
  datasets?:object;
  description?:string;

  constructor(userData: { id?: number; title?: string, draft?:boolean, datasets?: object, description?: string }) {
    this.id = userData.id;
    this.title = userData.title;
    this.draft = userData.draft;
    this.datasets = userData.datasets;
    this.description = userData.description;
    /*

    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;*/
  }
}
