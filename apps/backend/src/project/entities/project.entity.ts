import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class ProjectEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
