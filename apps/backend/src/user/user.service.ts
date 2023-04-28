import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@datatlas/dtos';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async createUser(userToCreate: CreateUserDto): Promise<UserEntity> {
    const alreadyExists = await this.isEmailAlreadyInDatabase(userToCreate.email);

    if (alreadyExists) {
      throw new HttpException(`User already exists.`, 400);
    }

    const hashedPassword = await this.hashString(userToCreate.password);
    const user = this.userRepository.create({ ...userToCreate, password: hashedPassword });

    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async isEmailAlreadyInDatabase(email: string): Promise<boolean> {
    return this.userRepository.findOne({ email }).then((user) => {
      return user != null;
    });
  }

  async getUser(id = 0): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashString(updateUserDto.password);
    }

    const user = this.userRepository.upsert(updateUserDto);

    await this.userRepository.flush();

    return user;
  }

  async hashString(textToHash: string): Promise<string> {
    console.log('textToHash', textToHash);
    return await bcrypt.hash(textToHash, 16);
  }

  async deleteUserById(userId: number): Promise<void> {
    return this.userRepository.nativeDelete(userId).then(() => {
      return;
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email }).then((user) => {
      if (user !== null) {
        return user;
      }
      throw new Error('Unknown email');
    });
  }

  async createUsersOnStartUp(
    userAdmin: Pick<CreateUserDto, 'email' | 'password'>,
    userDummyEditor: Pick<CreateUserDto, 'email' | 'password'>
  ) {
    console.log('dans le create on startup');
    try {
      console.log('userAdmin', userAdmin);
      await this.createUser(userAdmin);
    } catch (e) {
      console.log(e);
      Logger.log('Admin already in database.');
    }

    try {
      await this.createUser(userDummyEditor);
    } catch (e) {
      console.log(e);
      Logger.log('Editor already in database.');
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }
}
