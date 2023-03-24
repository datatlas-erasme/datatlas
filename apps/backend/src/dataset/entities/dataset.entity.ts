import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class DatasetEntity {
  @PrimaryKey()
  id: number;

  @Property()
  url: string;

  @Property()
  //updatedAt: Date;
  updatedAt: string;

  @Property()
  checksum: string;

  @Property()
  warning: string;


  constructor(
    url : string,
    updatedAt: string,
    checksum: string,
    warning: string

  ) {
    this.url = url;
    this.updatedAt = updatedAt;
    this.checksum = checksum;
    this.warning = warning;
  }
  /*

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  contributors: [UserEntity];
   */
}
