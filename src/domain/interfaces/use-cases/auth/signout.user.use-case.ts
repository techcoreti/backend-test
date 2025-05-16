import { ISignOutRequest } from '@/domain/interfaces/commons/auth.interface';

export interface ISignOutUseCase {
  execute(data: ISignOutRequest): Promise<void>;
}

export const ISignOutUseCase = Symbol('ISignOutUseCase');
