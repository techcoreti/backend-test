import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import { IHistorySignInUseCase } from '@/domain/interfaces/use-cases/auth/history.user.use-case';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseAuthDataDto } from '@/modules/commons/dtos/response.auth.data.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class HistorySignInUseCase implements IHistorySignInUseCase {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  /**
   * @description Método responsável por buscar o histórico de logins do usuário
   * @param data
   */
  async execute(query: QueryRequestDTO): Promise<ResponseAuthDataDto> {
    try {
      return await this.authRepository.signInHistory(query);
    } catch (e) {
      throw e;
    }
  }
}
