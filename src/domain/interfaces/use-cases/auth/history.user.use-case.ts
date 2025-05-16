import { IResponseData } from '@/domain/interfaces/commons/response.data';
import { IViewAuth } from '@/domain/types/auth';
import { IQueryRequest } from '../../commons/query.request';

export interface IHistorySignInUseCase {
  execute(query: IQueryRequest): Promise<IResponseData<IViewAuth>>;
}

export const IHistorySignInUseCase = Symbol('IHistorySignInUseCase');
