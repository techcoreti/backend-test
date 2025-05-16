import { ISignInResponse } from '@/domain/interfaces/commons/auth.interface';

export interface ISignInRefreshTokenUseCase {
  execute(userId: string, token: string): Promise<ISignInResponse>;
}

export const ISignInRefreshTokenUseCase = Symbol('ISignInRefreshTokenUseCase');
