import {
  ISignInRequest,
  ISignInResponse,
  ISignOutRequest,
} from '@/domain/interfaces/commons/auth.interface';
import { IResponseData } from '@/domain/interfaces/commons/response.data';
import { IViewAuth } from '@/domain/types/auth';
import { IViewUser } from '@/domain/types/user';
import { IQueryRequest } from '../commons/query.request';

export interface IAuthRepository {
  signIn(data: ISignInRequest): Promise<IViewUser>;
  signOut(data: ISignOutRequest): Promise<void>;
  signInRefresh(userId: string): Promise<any>;
  storeAuth(data: IViewUser, auth: ISignInResponse): Promise<any>;
  signInRefresh(userId: string): Promise<IViewUser>;
  isLogged(id: string): Promise<any>;
  signInHistory(query: IQueryRequest): Promise<IResponseData<IViewAuth>>;
}

export const IAuthRepository = Symbol('IAuthRepository');
