import { IResponseData } from '@/domain/commons/dtos/response.data';
import {
  ISignInRequest,
  ISignInResponse,
  ISignOutRequest,
} from '@/domain/commons/interfaces/auth.interface';
import { IViewAuth } from '@/domain/types/auth';
import { IViewUser } from '@/domain/types/user';

export interface IAuthRepository {
  signIn(data: ISignInRequest): Promise<IViewUser>;
  signOut(data: ISignOutRequest): Promise<void>;
  signInRefresh(userId: string): Promise<any>;
  storeAuth(data: IViewUser, auth: ISignInResponse): Promise<any>;
  signInRefresh(userId: string): Promise<IViewUser>;
  isLogged(id: string): Promise<any>;
  signInHistory(query: any): Promise<IResponseData<IViewAuth>>;
}

export const IAuthRepository = Symbol('IAuthRepository');
