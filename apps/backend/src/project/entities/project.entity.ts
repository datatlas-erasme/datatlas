import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class ProjectEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  //createdAt: Date; // It seems that Nest does not transfer a proper Date type to the database.
  createdAt: Date;

  /*
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
*/
  constructor(
    title: string,
    createdAt: Date /*
    description: string,
    draft: boolean,
    datasets: string,
    owner: string,
    contributors: string,
    config: string,
    version: string,*/
  ) {
    this.title = title;
    this.createdAt = createdAt; /*
    this.description = description;
    this.draft = draft;
    this.datasets = datasets;
    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;*/
  }
  /*

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  contributors: [UserEntity];
   */
}
