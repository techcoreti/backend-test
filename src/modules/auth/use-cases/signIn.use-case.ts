import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import { ISignInUseCase } from '@/domain/interfaces/use-cases/auth/signin.user.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { SignInRequestDto } from '../api/dtos/signIn.request.dto';
import { SignInResponseDto } from '../api/dtos/signIn.response.dto';
import { TokenService } from '../services/token.service';

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * @description Caso de uso para autenticação do usuário
   * @param data
   * @returns tokenJwt
   * @throws - Lança uma exceção se o usuário não existir ou se a senha estiver incorreta
   */
  async execute(data: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      // Consultao repositório para verificar se o usuário existe
      const user = await this.authRepository.signIn(data);

      // Gerando o token e refresh token JWT
      const tokenJwt = await this.tokenService.byLogin(user);

      // Armazenando os dados de autenticação no banco de dados
      await this.authRepository.storeAuth(user, tokenJwt);

      // Retornando o token JWT e o refresh token
      return tokenJwt;
    } catch (e) {
      throw e;
    }
  }
}
