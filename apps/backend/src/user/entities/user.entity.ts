import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRepository } from '../user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property({ hidden: true })
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = crypto.createHmac('sha256', password).digest('hex');
  }
}
