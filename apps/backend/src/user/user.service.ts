import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserDto } from '@datatlas/shared/models';
import { EntityRepository } from '@mikro-orm/core';

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

  async createUser(userDto: UserDto): Promise<boolean> {
    // TODO VÉRIFICATIONS: seul un admin peut créer un admin - Username non existant en base
    const user = new UserEntity(userDto.username, userDto.password, userDto.role, userDto.active);
    await this.userRepository.persistAndFlush(user);
    return true; // todo changer valeur retour
  }

  async getUserById(userDto: UserDto): Promise<boolean> {
    // TODO VÉRIFICATIONS: Username non existant en base - restrictions supplémentaires sur comptes externes au grandlyon ?
    const user = new UserEntity(userDto.username, userDto.password, userDto.role, userDto.active);
    await this.userRepository.persistAndFlush(user);
    return true; // todo changer valeur retour
  }

  async DeleteUserById(user_id: number): Promise<number> {
    return this.userRepository.nativeDelete(user_id);
  }
}
