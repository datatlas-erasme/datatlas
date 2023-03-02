import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { Roles, UserDto, UserPublicDTO } from '@datatlas/shared/models';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  /**
   * TODO : passwords are stored clearly in database -> hash them !
   */
  async createUser(userDto: UserDto): Promise<number> {
    const user = new UserEntity(userDto.username, userDto.password, userDto.role, userDto.active);
    return (await this.isUsernameAlreadyInDatabase(user.username))
      ? 0
      : this.userRepository.persistAndFlush(user).then(() => {
          return this.getUserIDByUserName(user.username);
        });
  }

  async getUser(id = 0): Promise<UserPublicDTO> {
    return this.userRepository
      .findOne({ id })
      .then((dataUser) => new UserPublicDTO(dataUser.id, dataUser.username, dataUser.role, dataUser.active));
  }

  async updateUser(user: { userId: number } & UserDto): Promise<void> {
    /*
      How to proceed.
      -> Create new UserEntity with old data already stored (get them with the user id given in args).
      -> Update this object with new data given in args.
      -> Flush.
     */
    const id = user.userId;
    return this.userRepository.findOne({ id }).then((dataUser) => {
      dataUser.username = user.username;
      dataUser.password = user.password;
      dataUser.role = user.role;
      dataUser.active = user.active;
      return this.userRepository.flush();
    });
  }

  async deleteUserById(userId: number): Promise<void> {
    return this.userRepository.nativeDelete(userId).then(() => {
      return;
    });
  }

  async isUsernameAlreadyInDatabase(username: string): Promise<boolean> {
    return this.userRepository.findOne({ username }).then((user) => {
      return user != null;
    });
  }

  async getUserIDByUserName(username: string): Promise<number> {
    return await this.userRepository.findOne({ username }).then((user) => {
      if (user !== null) {
        return user.id;
      }
      throw new Error('Unknown username');
    });
  }

  async createUsersOnStartUp(userAdmin: Pick<UserDto, 'username' | 'password'>) {
    const hashPW = await bcrypt.hash(userAdmin.password, 16);
    const user = new UserEntity(userAdmin.username, hashPW, Roles.ADMIN, true);
    await this.userRepository.persistAndFlush(user);
    /*
    return (await this.isUsernameAlreadyInDatabase(user.username))
      ? 0
      : this.userRepository.persistAndFlush(user).then(() => {
        return this.getUserIDByUserName(user.username);
      });*/
  }
}
