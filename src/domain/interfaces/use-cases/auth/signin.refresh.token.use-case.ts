import { ISignInResponse } from '@/domain/commons/interfaces/auth.interface';

export interface ISignInRefreshTokenUseCase {
  execute(userId: string, token: string): Promise<ISignInResponse>;
}

export const ISignInRefreshTokenUseCase = Symbol('ISignInRefreshTokenUseCase');
