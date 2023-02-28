import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class ProjectEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;
}