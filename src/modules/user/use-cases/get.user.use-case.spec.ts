import { IQueryRequest } from '@/domain/interfaces/commons/query.request';
import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { GetUserUseCase } from './get.user.use-case';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let query: IQueryRequest;

  beforeEach(() => {
    userRepository = {
      getUsers: jest.fn(),
    } as Partial<IUserRepository> as jest.Mocked<IUserRepository>;

    getUserUseCase = new GetUserUseCase(userRepository);
  });

  it('should return a list of users successfully', async () => {
    const userData: ResponseUserDataDto = {
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

    userRepository.getUsers.mockResolvedValue(userData);

    const result = await getUserUseCase.execute(query);

    expect(result).toEqual(userData);
    expect(userRepository.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user retrieval fails', async () => {
    const error = new Error('Failed to retrieve users');

    userRepository.getUsers.mockRejectedValue(error);

    await expect(getUserUseCase.execute(query)).rejects.toThrow(error);
    expect(userRepository.getUsers).toHaveBeenCalledTimes(1);
  });
});
