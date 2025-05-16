import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IDeleteUserUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<any> {
    try {
      return this.userRepository.deleteUser(id);
    } catch (e) {
      throw e;
    }
  }
}
