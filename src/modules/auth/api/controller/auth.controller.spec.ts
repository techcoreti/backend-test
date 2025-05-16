import { IHistorySignInUseCase } from '@/domain/interfaces/use-cases/auth/history.user.use-case';
import { ISignInRefreshTokenUseCase } from '@/domain/interfaces/use-cases/auth/signin.refresh.token.use-case';
import { ISignInUseCase } from '@/domain/interfaces/use-cases/auth/signin.user.use-case';
import { ISignOutUseCase } from '@/domain/interfaces/use-cases/auth/signout.user.use-case';
import { OrderDirectionSearchDatabaseEnum } from '@/domain/shareds/enum/order.diretion.enum';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseAuthDataDto } from '@/modules/commons/dtos/response.auth.data.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { SignInRequestDto } from '../dtos/signIn.request.dto';
import { SignInResponseDto } from '../dtos/signIn.response.dto';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let signInUseCase: ISignInUseCase;
  let signOutUseCase: ISignOutUseCase;
  let signInRefreshTokenUseCase: ISignInRefreshTokenUseCase;
  let historySignInUseCase: IHistorySignInUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: ISignInUseCase, useValue: { execute: jest.fn() } },
        { provide: ISignOutUseCase, useValue: { execute: jest.fn() } },
        {
          provide: ISignInRefreshTokenUseCase,
          useValue: { execute: jest.fn() },
        },
        { provide: IHistorySignInUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    signInUseCase = module.get<ISignInUseCase>(ISignInUseCase);
    signOutUseCase = module.get<ISignOutUseCase>(ISignOutUseCase);
    signInRefreshTokenUseCase = module.get<ISignInRefreshTokenUseCase>(
      ISignInRefreshTokenUseCase,
    );
    historySignInUseCase = module.get<IHistorySignInUseCase>(
      IHistorySignInUseCase,
    );
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should authenticate a user and return a token', async () => {
      const dto: SignInRequestDto = {
        username: 'user@example.com',
        password: 'password',
      };
      const result: SignInResponseDto = {
        expires: 3600,
        tokenJwt: 'token',
        refreshTokenJwt: 'refreshToken',
      };

      jest.spyOn(signInUseCase, 'execute').mockResolvedValue(result);

      expect(await authController.signIn(dto)).toEqual(result);
      expect(signInUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('signOut', () => {
    it('should invalidate the user session', async () => {
      const req = { user: { userId: '123' } };

      jest.spyOn(signOutUseCase, 'execute').mockResolvedValue(undefined);

      expect(await authController.signOut(req)).toBeUndefined();
      expect(signOutUseCase.execute).toHaveBeenCalledWith({ userId: '123' });
    });
  });

  describe('signInRefreshToken', () => {
    it('should refresh the authentication token', async () => {
      const req = { user: { userId: '123', refreshToken: 'refreshToken' } };
      const result: SignInResponseDto = {
        expires: 3600,
        tokenJwt: 'newToken',
        refreshTokenJwt: 'newRefreshToken',
      };

      jest
        .spyOn(signInRefreshTokenUseCase, 'execute')
        .mockResolvedValue(result);

      expect(await authController.signInRefreshToken(req)).toEqual(result);
      expect(signInRefreshTokenUseCase.execute).toHaveBeenCalledWith(
        '123',
        'refreshToken',
      );
    });
  });

  describe('signInHistory', () => {
    it('should return the login history', async () => {
      const query: QueryRequestDTO = {
        page: 1,
        size: 10,
        order: OrderDirectionSearchDatabaseEnum.desc,
        orderBy: 'createdAt',
      };
      const result: ResponseAuthDataDto = { data: [], totalRecords: 0 };

      jest.spyOn(historySignInUseCase, 'execute').mockResolvedValue(result);

      expect(await authController.signInHistory(query)).toEqual(result);
      expect(historySignInUseCase.execute).toHaveBeenCalledWith(query);
    });
  });
});
