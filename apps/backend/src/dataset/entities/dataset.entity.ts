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

  @Property({type: 'json', nullable: true})
  urlData : object;


  constructor(url: string, updatedAt: string, checksum: string, warning: string, urlData: object) {
    this.url = url;
    this.updatedAt = updatedAt;
    this.checksum = checksum;
    this.warning = warning;
    this.urlData = urlData;
  }
  /*

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  contributors: [UserEntity];
   */
}
