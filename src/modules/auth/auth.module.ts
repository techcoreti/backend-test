import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptService } from '@/commons/utils/encrypt.utils';
import { AuthEntity } from '@/domain/entities/auth.entity';
import { UserEntity } from '@/domain/entities/user.entity';
import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import { ISignInRefreshTokenUseCase } from '@/domain/interfaces/use-cases/auth/signin.refresh.token.use-case';
import { ISignInUseCase } from '@/domain/interfaces/use-cases/auth/signin.user.use-case';
import { ISignOutUseCase } from '@/domain/interfaces/use-cases/auth/signout.user.use-case';
import { AuthRepository } from '@/infrastructure/repositories/auth.repository';
import { AuthController } from './api/controller/auth.controller';

import { IHistorySignInUseCase } from '@/domain/interfaces/use-cases/auth/history.user.use-case';
import { JwtAuhtRefresh, JwtAuth } from './jwt.auth.strategy';
import { TokenService } from './services/token.service';
import { HistorySignInUseCase } from './use-cases/history.signin.use-case';
import { SignInRefreshTokenUseCase } from './use-cases/signIn.refresh.token.use-case';
import { SignInUseCase } from './use-cases/signIn.use-case';
import { SignOutUseCase } from './use-cases/signout.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    JwtAuth,
    JwtAuhtRefresh,
    TokenService,
    CryptService,
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    {
      provide: ISignInUseCase,
      useClass: SignInUseCase,
    },
    {
      provide: ISignOutUseCase,
      useClass: SignOutUseCase,
    },
    {
      provide: ISignInRefreshTokenUseCase,
      useClass: SignInRefreshTokenUseCase,
    },
    {
      provide: IHistorySignInUseCase,
      useClass: HistorySignInUseCase,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
