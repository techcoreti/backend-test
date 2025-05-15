import {
  ISignInRequest,
  ISignInResponse,
} from '@/domain/commons/interfaces/auth.interface';

export interface ISignInUseCase {
  execute(data: ISignInRequest): Promise<ISignInResponse>;
}

export const ISignInUseCase = Symbol('ISignInUseCase');
