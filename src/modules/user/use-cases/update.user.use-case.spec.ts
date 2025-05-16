import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { UpdateUserDto } from '../api/dtos/update.user.dto';
import { UpdateUserUseCase } from './update.user.use-case';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      updateUser: jest.fn(),
    } as Partial<IUserRepository> as jest.Mocked<IUserRepository>;

    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });

  it('should update a user successfully', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const updateUserDto: UpdateUserDto = {
      name: 'Updated Name',
      email: 'updated.email@example.com',
      username: 'updatedUsername',
      password: 'updatedPassword',
      profile: ProfileUserEnum.ADMIN,
    };

    userRepository.updateUser.mockResolvedValue(undefined);

    await expect(
      updateUserUseCase.execute(userId, updateUserDto),
    ).resolves.toBeUndefined();
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      userId,
      updateUserDto,
    );
    expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user update fails', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const updateUserDto: UpdateUserDto = {
      name: 'Updated Name',
      email: 'updated.email@example.com',
      username: 'updatedUsername',
      password: 'updatedPassword',
      profile: ProfileUserEnum.ADMIN,
    };

    // Simula um erro ao chamar o método updateUser
    const error = new Error('User update failed');
    userRepository.updateUser.mockRejectedValueOnce(error);

    // Verifica se o erro é lançado corretamente
    await expect(
      updateUserUseCase.execute(userId, updateUserDto),
    ).rejects.toThrow(error);
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      userId,
      updateUserDto,
    );
    expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
  });
});
