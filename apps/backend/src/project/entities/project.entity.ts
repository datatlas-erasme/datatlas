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

  @Property({ type: 'json' })
  datasets: object;

  @Property()
  description: string;

  /*



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
    createdAt: Date,
    draft: boolean,
    datasets: object,
    description: string

    /*
        owner: string,
        contributors: string,
        config: string,
        version: string,*/
  ) {
    this.title = title;
    this.createdAt = createdAt;
    this.draft = draft;
    this.datasets = datasets;
    this.description = description;
    /*

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
