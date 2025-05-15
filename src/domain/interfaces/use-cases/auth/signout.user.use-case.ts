import { ISignOutRequest } from '@/domain/commons/interfaces/auth.interface';

export interface ISignOutUseCase {
  execute(data: ISignOutRequest): Promise<void>;
}

export const ISignOutUseCase = Symbol('ISignOutUseCase');
