export class ProjectDto {
  constructor(
    public title: string,
    public description: string,
    public draft: boolean,
    public datasets: string,
    public owner: string,
    public contributors: string,
    public config: string,
    public version: string,
    public createdAt: string
  ) {
    this.title = title;
    this.description = description;
    this.draft = draft;
    this.datasets = datasets;
    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;
    this.createdAt = createdAt;
  }
}
