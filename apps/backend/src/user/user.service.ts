import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserDto, UserPublicDTO } from '@datatlas/shared/models';
import { EntityRepository } from '@mikro-orm/core';
import * as util from 'util';

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

  async updateUser(user: { user_id: number } & UserDto): Promise<void> {
    /*
      How I proceed (not sure the correct way).
      -> Create new UserEntity with old data already stored (get them with the user id given in args).
      -> Update this object with new data given in args.
      -> Persist.
     */
    const id = user.user_id;
    return this.userRepository.findOne({ id }).then((data_user) => {
      Logger.log('avant');
      Logger.log(util.inspect(user, false, null, true));
      Logger.log(util.inspect(data_user, false, null, true));
      Logger.log('après');
      data_user.username = user.username;
      Logger.log('nouvel utilisateur');
      Logger.log(util.inspect(data_user, false, null, true));
      return; //new UserPublicDTO(data_user.id, data_user.username, data_user.role, data_user.active);
    });

    /*
    this.getUser(user.user_id).then((userInDB) => {
      const updated_user = new UserEntity(userInDB.username, userInDB.password, userInDB.role, userInDB.active);
      Logger.log(util.inspect(userInDB, false, null, true));
    });
    //const user = new UserEntity(userDto.username, userDto.password, userDto.role, userDto.active);

    //Logger.log(userData);
    /*return this.userRepository.nativeDelete(user_id).then(() => {
      // Should we really do nothing ?
      //Logger.log(util.inspect(data, false, null, true));
      return;
    });

     */
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
}