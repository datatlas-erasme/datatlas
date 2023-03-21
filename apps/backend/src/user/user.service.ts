import { Injectable, Logger } from '@nestjs/common';
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

  async createUser(userDto: UserDto): Promise<number> {
    const user = new UserEntity(
      userDto.username,
      await this.hashString(userDto.password),
      userDto.role,
      userDto.active
    );
    return (await this.isUsernameAlreadyInDatabase(user.username))
      ? 0
      : this.userRepository.persistAndFlush(user).then(() => {
          return this.getUserIDByUserName(user.username);
        });
  }

  async isUsernameAlreadyInDatabase(username: string): Promise<boolean> {
    return this.userRepository.findOne({ username }).then((user) => {
      return user != null;
    });
  }

  async getUser(id = 0): Promise<Omit<UserDto, 'password'>> {
    return this.userRepository.findOne({ id }).then(
      (dataUser) =>
        new UserDto({
          userId: dataUser.id,
          userName: dataUser.username,
          userRole: (<never>Roles)[dataUser.role],
          userIsActive: dataUser.active,
        })
    );
  }

  async updateUser(user: UserDto): Promise<void> {
    /*
      How to proceed.
      -> Create new UserEntity with old data already stored (get them with the user id given in args).
      -> Update this object with new data given in args.
      -> Flush.
     */
    const id = user.id;
    return this.userRepository.findOne({ id }).then(async (dataUser) => {
      dataUser.username = user.username;
      dataUser.password = await this.hashString(user.password);
      dataUser.role = user.role;
      dataUser.active = user.active;
      return this.userRepository.flush();
    });
  }

  async hashString(textToHash: string): Promise<string> {
    return await bcrypt.hash(textToHash, 16);
  }

  async deleteUserById(userId: number): Promise<void> {
    return this.userRepository.nativeDelete(userId).then(() => {
      return;
    });
  }

  // todo BELOW : to check for rework.
  async getCompleteUserByUserName(username: string): Promise<{ id; username; role; active }> {
    return await this.userRepository.findOne({ username }).then((user) => {
      if (user !== null) {
        return {
          id: user.id,
          username: user.username,
          role: user.role,
          active: user.active,
        };
      }
      throw new Error('Unknown username');
    });
  }

  async getUserByUserName(username: string): Promise<Pick<UserDto, 'username' | 'password'>> {
    return await this.userRepository.findOne({ username }).then((user) => {
      if (user !== null) {
        return {
          username: user.username,
          password: user.password,
        };
      }
      throw new Error('Unknown username');
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

  async createUsersOnStartUp(
    userAdmin: Pick<UserDto, 'username' | 'password'>,
    userDummyEditor: Pick<UserDto, 'username' | 'password'>
  ) {
    const admin = new UserEntity(userAdmin.username, await this.hashString(userAdmin.password), Roles.ADMIN, true); // todo optimization, doing later
    if (await this.isUsernameAlreadyInDatabase(admin.username)) {
      Logger.log('Admin already in database.');
    } else {
      await this.userRepository.persistAndFlush(admin);
    }
    const editor = new UserEntity(
      userDummyEditor.username,
      await this.hashString(userDummyEditor.password),
      Roles.EDITOR,
      true
    );
    if (await this.isUsernameAlreadyInDatabase(editor.username)) {
      Logger.log('Editor already in database.');
    } else {
      await this.userRepository.persistAndFlush(editor);
    }
  }
}
