import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class ProjectEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  createdAt: Date;

  @Property()
  draft: boolean;

  @Property()
  datasets: string;

  @Property()
  description: string;

  @Property()
  owner: string;

  @Property()
  contributors: string;

  @Property()
  config: string;

  @Property()
  version: string;

  constructor(
    title: string,
    description: string,
    draft: boolean,
    datasets: string,
    owner: string,
    contributors: string,
    config: string,
    version: string
  ) {
    this.title = title;
    this.description = description;
    this.draft = draft;
    this.datasets = datasets;
    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;
  }
}
