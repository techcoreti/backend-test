import { CryptService } from '@/commons/utils/encrypt.utils';
import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import AppEnvs, { AppEnvsType } from '@/infrastructure/config/app.config';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const tokenConfig: AppEnvsType['auth'] = AppEnvs().auth;

@Injectable()
export class JwtAuth extends PassportStrategy(Strategy, 'JwtGuard') {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly cryptService: CryptService,
    private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: tokenConfig.jwtSecret,
    });
    this.logger = new Logger(JwtAuth.name);
  }

  async validate(token: any): Promise<any> {
    try {
      // Descriptografa o token
      const decrypted = await this.cryptService.decryptData(token.data);

      // Converte o token descriptografado de volta para um objeto JSON
      const value = JSON.parse(decrypted);

      // Verifica se o usuário está logado com o token informado
      await this.authRepository.isLogged(value.sub);

      // Retorna os dados do usuário
      return { profile: value.profile, userId: value.sub, name: value.name };
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        this.logger.error('Token inválido, expirado ou não logado.');
      } else {
        this.logger.error('Erro ao validar o token.', e);
      }

      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class JwtAuhtRefresh extends PassportStrategy(
  Strategy,
  'JwtRefreshGuard',
) {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly cryptService: CryptService,
    private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: tokenConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
    this.logger = new Logger(JwtAuhtRefresh.name);
  }

  async validate(request: any, token: any): Promise<any> {
    try {
      const refreshToken = request.get('Authorization')?.replace('Bearer ', '');

      // Descriptografa o token
      const decrypted = await this.cryptService.decryptData(token.data);

      // Converte o token descriptografado de volta para um objeto JSON
      const value = JSON.parse(decrypted);

      // Verifica se o usuário está logado com o token informado
      await this.authRepository.isLogged(value.sub);

      // Retorna os dados do usuário
      return {
        profile: value.profile,
        userId: value.sub,
        name: value.name,
        refreshToken,
      };
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        this.logger.error('Token inválido, expirado ou não logado.');
      } else {
        this.logger.error('Erro ao validar o token.', e);
      }

      throw new UnauthorizedException();
    }
  }
}
