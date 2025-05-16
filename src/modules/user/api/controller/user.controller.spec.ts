import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserByIdUseCase,
  IGetUserUseCase,
  IUpdateUseCase,
  IUpdateUserUseCase,
} from '@/domain/interfaces/use-cases/user/user.use-case';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { ParamsRequestDTO } from '@/modules/commons/dtos/params.request.dto';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let createUserUseCase: ICreateUserUseCase;
  let deleteUserUseCase: IDeleteUserUseCase;
  let updateUserUseCase: IUpdateUserUseCase;
  let getUserByIdUseCase: IGetUserByIdUseCase;
  let getUserUseCase: IGetUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: ICreateUserUseCase, useValue: { execute: jest.fn() } },
        { provide: IDeleteUserUseCase, useValue: { execute: jest.fn() } },
        { provide: IUpdateUseCase, useValue: { execute: jest.fn() } },
        { provide: IGetUserByIdUseCase, useValue: { execute: jest.fn() } },
        { provide: IGetUserUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    createUserUseCase = module.get<ICreateUserUseCase>(ICreateUserUseCase);
    deleteUserUseCase = module.get<IDeleteUserUseCase>(IDeleteUserUseCase);
    updateUserUseCase = module.get<IUpdateUserUseCase>(IUpdateUseCase);
    getUserByIdUseCase = module.get<IGetUserByIdUseCase>(IGetUserByIdUseCase);
    getUserUseCase = module.get<IGetUserUseCase>(IGetUserUseCase);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        username: 'xpto@teste.com',
        profile: ProfileUserEnum.USER,
      };
      const result: ResponseUserDataDto = { data: [], totalRecords: 1 };

      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(result);

      expect(await userController.createUser(dto)).toEqual(result);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const id = '123';
      const dto: UpdateUserDto = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        username: '',
        password: '',
        profile: ProfileUserEnum.USER,
      };
      const result = null;

      jest.spyOn(updateUserUseCase, 'execute').mockResolvedValue(result);

      expect(await userController.updateUser(id, dto)).toEqual(result);
      expect(updateUserUseCase.execute).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const params: ParamsRequestDTO = { id: '123' };
      const result = null;

      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(result);

      expect(await userController.deleteUser(params)).toEqual(result);
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(params.id);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const params: ParamsRequestDTO = { id: '123' };
      const result: ResponseUserDataDto = { data: [], totalRecords: 1 };

      jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(result);

      expect(await userController.getUserById(params)).toEqual(result);
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith(params.id);
    });
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const result: ResponseUserDataDto = { data: [], totalRecords: 10 };

      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(result);

      expect(await userController.getUsers()).toEqual(result);
      expect(getUserUseCase.execute).toHaveBeenCalled();
    });
  });
});
