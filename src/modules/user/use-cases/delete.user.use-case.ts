import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IDeleteUserUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<any> {
    try {
      return this.userRepository.deleteUser(id);
    } catch (error) {
      this.logger.error(`STATUS: ${error.status} | MESSAGE: ${error.message}`);
    }
  }
}
