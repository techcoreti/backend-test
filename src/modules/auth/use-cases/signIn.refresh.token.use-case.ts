import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import { ISignInRefreshTokenUseCase } from '@/domain/interfaces/use-cases/auth/signin.refresh.token.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class SignInRefreshTokenUseCase implements ISignInRefreshTokenUseCase {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(userId: string, token: string): Promise<any> {
    try {
      // Consultao repositório para verificar se o usuário existe
      const user = await this.authRepository.signInRefresh(userId);

      // Gerando o token e refresh token JWT
      const tokenJwt = await this.tokenService.byRefresh(user, token);

      // Armazenando os dados de autenticação no banco de dados
      await this.authRepository.storeAuth(user, tokenJwt);

      // Retornando o token JWT e o refresh token
      return tokenJwt;
    } catch (e) {
      throw e;
    }
  }
}
