import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserEntity } from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async createAdmin(userAdmin: CreateAdminDto): Promise<boolean> {
    const user = new UserEntity(userAdmin.username, userAdmin.password, 'admin', true);
    await this.userRepository.persistAndFlush(user);
    return true;
  }
}
