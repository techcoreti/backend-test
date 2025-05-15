import { ISignOutRequest } from '@/domain/commons/interfaces/auth.interface';
import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import { ISignOutUseCase } from '@/domain/interfaces/use-cases/auth/signout.user.use-case';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SignOutUseCase implements ISignOutUseCase {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  /**
   * @description Método responsável por deslogar o usuário
   * @param data
   */
  async execute(data: ISignOutRequest): Promise<void> {
    try {
      // Desloga o usuário
      await this.authRepository.signOut(data);
    } catch (e) {
      throw e;
    }
  }
}
