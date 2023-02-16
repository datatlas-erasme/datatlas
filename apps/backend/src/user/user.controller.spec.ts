/*
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {UserService} from "./user.service";

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('ACCESS TO USER API.', async () => {
      const result = ['test'];
      //jest.spyOn(userService, 'findAll').mockImplementation(() => result);

      //expect(await userController.findAll()).toBe(result);
    });
  });
});
*/
