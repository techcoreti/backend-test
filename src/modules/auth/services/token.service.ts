import { CryptService } from '@/commons/utils/encrypt.utils';
import { ISignInResponse } from '@/domain/commons/interfaces/auth.interface';
import { ViewUserDto } from '@/modules/user/api/dtos/view.user.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;
  constructor(
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get('auth.jwtSecret');
    this.jwtExpiresIn = this.configService.get('auth.tokenExpiresIn');
    this.refreshSecret = this.configService.get('auth.refreshTokenSecret');
    this.refreshExpiresIn = this.configService.get(
      'auth.refreshTokenExpiresIn',
    );
  }
  async createTokenJwt(user: any): Promise<string> {
    const tokenData = await this.cryptService.encryptData(
      JSON.stringify({
        sub: user.id,
        profile: user.profile,
        name: user.name,
      }),
    );

    return this.jwtService.sign(
      { data: tokenData },
      { secret: this.jwtSecret, expiresIn: this.jwtExpiresIn },
    );
  }
  async createRefreshToken(user: ViewUserDto): Promise<string> {
    const tokenData = await this.cryptService.encryptData(
      JSON.stringify({
        sub: user.id,
      }),
    );
    return this.jwtService.sign(
      { data: tokenData },
      { secret: this.refreshSecret, expiresIn: this.refreshExpiresIn },
    );
  }
  async byLogin(user: ViewUserDto): Promise<ISignInResponse> {
    // Cria o token de autenticação padrão
    const tokenJwt = await this.createTokenJwt(user);

    // Cria o refresh token
    const refreshTokenJwt = await this.createRefreshToken(user);

    // Prazo de validade do token
    const tokenExpiresIn = this.jwtExpiresIn.replace(/\D/g, '');

    return {
      tokenJwt,
      expires: Number(tokenExpiresIn),
      refreshTokenJwt,
    };
  }
  async byRefresh(user: ViewUserDto, token: string): Promise<ISignInResponse> {
    // Cria o token de autenticação padrão
    const tokenJwt = await this.createTokenJwt(user);

    // Prazo de validade do token
    const tokenExpiresIn = this.jwtExpiresIn.replace(/\D/g, '');

    return {
      tokenJwt,
      expires: Number(tokenExpiresIn),
      refreshTokenJwt: token,
    };
  }
}
