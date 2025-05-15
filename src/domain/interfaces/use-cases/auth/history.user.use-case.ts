import { IResponseData } from '@/domain/commons/dtos/response.data';
import { IViewAuth } from '@/domain/types/auth';

export interface IHistorySignInUseCase {
  execute(query: any): Promise<IResponseData<IViewAuth>>;
}

export const IHistorySignInUseCase = Symbol('IHistorySignInUseCase');
