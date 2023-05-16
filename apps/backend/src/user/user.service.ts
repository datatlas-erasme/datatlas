import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '@datatlas/dtos';
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

  async getUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  async getUserDto(id: number): Promise<GetUserDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...getUserDto } = await this.userRepository.findOne({ id });
    return new GetUserDto(getUserDto);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    // Function to remove ?
    return await this.userRepository.findOne({ email }).then((user) => {
      if (user !== null) {
        return user;
      }
      throw new Error('Unknown email');
    });
  }

  async findAll(): Promise<GetUserDto[]> {
    const userEntities: UserEntity[] = await this.userRepository.findAll();
    const userDtos: GetUserDto[] = [];
    for (const userEntity of userEntities) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...getUserDto } = userEntity;
      userDtos.push(getUserDto);
    }
    return userDtos;
  }

  async updateUser(updateUserDto: UpdateUserDto & { id: number }): Promise<GetUserDto> {
    const alreadyExists = await this.isEmailAlreadyInDatabase(updateUserDto.email);
    if (alreadyExists) {
      throw new HttpException(`User already exists.`, 400);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashString(updateUserDto.password);
    }

    const user: UserEntity = await this.userRepository.upsert(updateUserDto);
    await this.userRepository.flush();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...getUserDto } = user;
    return new GetUserDto(getUserDto);
  }

  async deleteUserById(userId: number): Promise<void> {
    return this.userRepository.nativeDelete(userId).then(() => {
      return;
    });
  }

  async createUsersOnStartUp(
    userAdmin: Pick<CreateUserDto, 'email' | 'password'>,
    userDummyEditor: Pick<CreateUserDto, 'email' | 'password'>
  ) {
    try {
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

  async isEmailAlreadyInDatabase(email: string): Promise<boolean> {
    return this.userRepository.findOne({ email }).then((user) => {
      return user != null;
    });
  }

  async hashString(textToHash: string): Promise<string> {
    return await bcrypt.hash(textToHash, 16);
  }
}
