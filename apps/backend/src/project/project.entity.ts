import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class Project {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  draft: boolean;

  @Property()
  datasets: string;

  @Property()
  owner: string;
}
