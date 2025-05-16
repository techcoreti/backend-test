import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { CreateUserDto } from '../api/dtos/create.user.dto';
import { CreateUserUseCase } from './create.user.use-case';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
    } as Partial<IUserRepository> as jest.Mocked<IUserRepository>;

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user successfully', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      username: 'johndoe',
      profile: ProfileUserEnum.USER,
    };

    const responseUserDataDto: ResponseUserDataDto = {
      data: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          username: 'johndoe',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profile: ProfileUserEnum.USER,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          password: 'password123',
        },
      ],
      totalRecords: 1,
    };

    userRepository.createUser.mockResolvedValue(responseUserDataDto);

    const result = await createUserUseCase.execute(createUserDto);

    expect(result).toEqual(responseUserDataDto);
    expect(userRepository.createUser).toHaveBeenCalledWith(createUserDto);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user creation fails', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      username: 'johndoe',
      profile: ProfileUserEnum.USER,
    };

    const error = new Error('User creation failed');
    userRepository.createUser.mockRejectedValue(error);

    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      error,
    );
    expect(userRepository.createUser).toHaveBeenCalledWith(createUserDto);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });
});
