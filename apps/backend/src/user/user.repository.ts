import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';

export class UserRepository extends EntityRepository<User> {}
