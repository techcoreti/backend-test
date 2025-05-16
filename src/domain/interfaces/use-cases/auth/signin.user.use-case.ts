import {
  ISignInRequest,
  ISignInResponse,
} from '@/domain/interfaces/commons/auth.interface';

export interface ISignInUseCase {
  execute(data: ISignInRequest): Promise<ISignInResponse>;
}

export const ISignInUseCase = Symbol('ISignInUseCase');
