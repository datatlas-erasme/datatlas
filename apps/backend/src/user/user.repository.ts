import { EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from './entities/user.entity';

export class UserRepository extends EntityRepository<UserEntity> {}
