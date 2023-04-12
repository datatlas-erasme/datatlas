import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, CreateUserDto, Roles, UserDto } from '@datatlas/shared/models';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async createUser(userToCreate: CreateUserDto): Promise<number> {
    const userEntity = new UserEntity(
      userToCreate.username,
      await this.hashString(userToCreate.password),
      userToCreate.role,
      userToCreate.active
    );
    return (await this.isUsernameAlreadyInDatabase(userEntity.username))
      ? 0
      : this.userRepository.persistAndFlush(userEntity).then(async () => {
          const { id } = await this.getUserByUserName(userToCreate.username);
          return id;
        });
  }

  async isUsernameAlreadyInDatabase(username: string): Promise<boolean> {
    return this.userRepository.findOne({ username }).then((user) => {
      return user != null;
    });
  }

  async getUser(id = 0): Promise<UserDto> {
    return this.userRepository.findOne({ id }).then(
      (dataUser) =>
        new UserDto({
          id: dataUser.id,
          username: dataUser.username,
          role: Roles[dataUser.role],
          active: dataUser.active,
        })
    );
  }

  async getUserEntity(id = 0): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  async updateUser(user: UpdateUserDto): Promise<void> {
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

  async getUserByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username }).then((user) => {
      if (user !== null) {
        return user;
      }
      throw new Error('Unknown username');
    });
  }

  async createUsersOnStartUp(
    userAdmin: Pick<CreateUserDto, 'username' | 'password'>,
    userDummyEditor: Pick<CreateUserDto, 'username' | 'password'>
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
