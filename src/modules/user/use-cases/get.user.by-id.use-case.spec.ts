import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { ViewUserDto } from '../api/dtos/view.user.dto';
import { GetUserByIdUseCase } from './get.user.by-id.use-case';

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      getUserById: jest.fn(),
    } as Partial<IUserRepository> as jest.Mocked<IUserRepository>;

    getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  });

  it('should return user data successfully', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const userData: ResponseUserDataDto = {
      data: [
        {
          id: userId,
          username: 'johndoe',
          name: 'John Doe',
          email: 'john.doe@example.com',
          profile: ProfileUserEnum.USER,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        } as ViewUserDto,
      ],
      totalRecords: 1,
    };

    userRepository.getUserById.mockResolvedValue(userData);

    const result = await getUserByIdUseCase.execute(userId);

    expect(result).toEqual(userData);
    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user retrieval fails', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const error = new Error('User not found');

    userRepository.getUserById.mockRejectedValue(error);

    await expect(getUserByIdUseCase.execute(userId)).rejects.toThrow(error);
    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
  });
});
