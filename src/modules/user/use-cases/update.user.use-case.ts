import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IUpdateUserUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from '../api/dtos/update.user.dto';

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdateUserDto): Promise<void> {
    try {
      this.userRepository.updateUser(id, data);
    } catch (error) {
      this.logger.error(`Error updating user: ${error}`);
      throw new Error('Error updating user');
    }
  }
}
