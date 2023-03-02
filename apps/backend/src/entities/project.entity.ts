import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { DatasetInterface } from '@datatlas/models';
import { UserEntity } from '../user/entities/user.entity';

@Entity()
export class ProjectEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  draft: boolean;

  @Property()
  datasets: DatasetInterface[] = [];

  @Property()
  description: string;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  contributors: [UserEntity];
}
