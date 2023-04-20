import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserEntity } from '../../user/entities/user.entity';

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

  @ManyToOne(() => UserEntity)
  owner!: UserEntity;

  @ManyToMany(() => UserEntity)
  contributors: UserEntity[] | null;

  @Property({ type: 'json' })
  config: object;

  @Property()
  version: string;

  constructor(
    title: string,
    createdAt: Date,
    draft: boolean,
    datasets: object,
    description: string,
    owner: UserEntity,
    contributors: UserEntity[],
    config: object,
    version: string
  ) {
    this.title = title;
    this.createdAt = createdAt;
    this.draft = draft;
    this.datasets = datasets;
    this.description = description;
    this.owner = owner;
    this.contributors = contributors;
    this.config = config;
    this.version = version;
  }
}
