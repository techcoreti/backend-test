import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IUpdateUserUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../api/dtos/update.user.dto';

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, data: UpdateUserDto): Promise<void> {
    try {
      return this.userRepository.updateUser(id, data);
    } catch (e) {
      throw e;
    }
  }
}
