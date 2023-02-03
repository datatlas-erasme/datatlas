import { Entity, EntityRepositoryType, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { UserRepository } from '../user.repository';

@Entity({ customRepository: () => UserRepository })
export class UserEntity {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  username: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  role: string;

  @Property()
  active: boolean;

  constructor(username: string, password: string, role = 'editor', active = false) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.active = active;
  }
}
