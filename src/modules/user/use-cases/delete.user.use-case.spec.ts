import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { DeleteUserUseCase } from './delete.user.use-case';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      deleteUser: jest.fn(),
    } as Partial<IUserRepository> as jest.Mocked<IUserRepository>;

    deleteUserUseCase = new DeleteUserUseCase(userRepository);
  });

  it('should delete a user successfully', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const deleteResult = null;

    userRepository.deleteUser.mockResolvedValue(deleteResult);

    const result = await deleteUserUseCase.execute(userId);

    expect(result).toEqual(deleteResult);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(userId);
    expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user deletion fails', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const error = new Error('User deletion failed');

    userRepository.deleteUser.mockRejectedValue(error);

    await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(error);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(userId);
    expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
  });
});
