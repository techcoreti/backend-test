import { IResponseData } from '@/domain/interfaces/commons/response.data';
import { ICreateUser, IUpdateUser, IViewUser } from '@/domain/types/user';
import { IQueryRequest } from '../commons/query.request';

export interface IUserRepository {
  createUser(data: ICreateUser): Promise<IResponseData<IViewUser>>;
  updateUser(id: string, data: IUpdateUser): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getUserById(id: string): Promise<IResponseData<IViewUser>>;
  getUsers(query: IQueryRequest): Promise<IResponseData<IViewUser>>;
}

export const IUserRepository = Symbol('IUserRepository');
