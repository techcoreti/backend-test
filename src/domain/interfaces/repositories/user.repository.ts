import { IResponseData } from '@/domain/commons/dtos/response.data';
import { ICreateUser, IUpdateUser, IViewUser } from '@/domain/types/user';

export interface IUserRepository {
  createUser(data: ICreateUser): Promise<IResponseData<IViewUser>>;
  updateUser(id: string, data: IUpdateUser): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getUserById(id: string): Promise<IResponseData<IViewUser>>;
  getUsers(): Promise<IResponseData<IViewUser>>;
}

export const IUserRepository = Symbol('IUserRepository');
