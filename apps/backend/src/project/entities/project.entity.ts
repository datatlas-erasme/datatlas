import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserEntity } from '../../user/entities/user.entity';
import { DatasetInterface, ProjectInterface, SavedMapConfig, UserInterface } from '@datatlas/models';

@Entity()
export class ProjectEntity implements ProjectInterface {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  createdAt: Date;

  @Property()
  draft: boolean;

  @Property({ type: 'json' })
  datasets: DatasetInterface[];

  @Property()
  description: string;

  @ManyToOne(() => UserEntity)
  owner!: UserInterface;

  @ManyToMany(() => UserEntity)
  contributors: UserInterface[];

  @Property({ type: 'json' })
  config: SavedMapConfig;

  @Property()
  version: 'v1';

  constructor({
    title,
    createdAt,
    draft,
    datasets,
    description,
    owner,
    contributors,
    config,
    version,
  }: ProjectInterface) {
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

  isOwnedBy({ id }: Pick<UserInterface, 'id'>) {
    return this.owner.id === id;
  }
}
