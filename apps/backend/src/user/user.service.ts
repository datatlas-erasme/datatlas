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
   * @param userDto Private user data.
   * @return number New user_id or 0 if user already exists.
   */
  async createUser(userDto: UserDto): Promise<number> {
    const user = new UserEntity(userDto.username, userDto.password, userDto.role, userDto.active);
    return await this.isUsernameAlreadyInDatabase(user.username).then((isItIn) => {
      if (isItIn) {
        // User already in database.
        return 0;
      }
      return this.userRepository.persistAndFlush(user).then(() => {
        return this.getUserIDByUserName(user.username);
      });
    });
  }

  /**
   * Get public user data from its user_id
   * @param id
   * @return UserPublicDTO public user data {id, username, role, is_active}
   */
  async getUser(id = 0): Promise<UserPublicDTO> {
    return this.userRepository.findOne({ id }).then((data_user) => {
      //Logger.log(util.inspect(data_user, false, null, true));
      return new UserPublicDTO(data_user.id, data_user.username, data_user.role, data_user.active);
    });
  }

  /**
   * Sends the user id when given user name. Sends 0 if username not found or incoherent.
   * @param username The user_name
   * @return number The user_id
   */
  async getUserIDByUserName(username: string): Promise<number> {
    return await this.userRepository.findOne({ username }).then((user) => {
      //Logger.log(util.inspect(user, false, null, true));
      if (user === null) {
        return 0;
      } else {
        return user.id;
      }
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
   * Deletes user. Returns void.
   * @param user_id
   * @return void
   */
  async deleteUserById(user_id: number): Promise<void> {
    return this.userRepository.nativeDelete(user_id).then(() => {
      // Should we really do nothing ?
      //Logger.log(util.inspect(data, false, null, true));
      return;
    });
  }
}
