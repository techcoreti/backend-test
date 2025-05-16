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
      const user = await this.authRepository.signInRefresh(userId);

      // Gerando o token e refresh token JWT
      const tokenJwt = await this.tokenService.byRefresh(user, token);

      await this.authRepository.storeAuth(user, tokenJwt);

      return tokenJwt;
    } catch (e) {
      throw e;
    }
  }
}
