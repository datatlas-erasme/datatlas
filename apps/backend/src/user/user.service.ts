import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserDto, UserPublicDTO } from '@datatlas/shared/models';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  /**
   * Adds a user into the database.
   * TODO : passwords are stored clearly in database -> hash them !
   * @param userDto Private user data.
   * @return number New user_id or 0 if user already exists.
   */
  async createUser(userDto: UserDto): Promise<number> {
    const user = new UserEntity(userDto.username, userDto.password, userDto.role, userDto.active);
    return (await this.isUsernameAlreadyInDatabase(user.username))
      ? 0
      : this.userRepository.persistAndFlush(user).then(() => {
          return this.getUserIDByUserName(user.username);
        });
  }

  /**
   * Get public user data from its user_id
   * @param id
   * @return UserPublicDTO public user data {id, username, role, is_active}
   */
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

  /**
   * Deletes user. Returns void.
   * @param userId
   * @return void
   */
  async deleteUserById(userId: number): Promise<void> {
    return this.userRepository.nativeDelete(userId).then(() => {
      return;
    });
  }

  /**
   * Is the username already in database ?
   * @param username
   * @return boolean
   */
  async isUsernameAlreadyInDatabase(username: string): Promise<boolean> {
    return this.userRepository.findOne({ username }).then((user) => {
      return user != null;
    });
  }

  /**
   * Returns the user id for given username. Returns 0 if the username isn't found or incoherent.
   * @param username The user_name
   * @return number The user_id
   */
  async getUserIDByUserName(username: string): Promise<number> {
    return await this.userRepository.findOne({ username }).then((user) => {
      if (user === null) {
        return 0;
      } else {
        return user.id;
      }
    });
  }
}
