import { IResponseData } from '@/domain/commons/dtos/response.data';
import { ICreateUser, IUpdateUser, IViewUser } from '@/domain/types/user';

export interface ICreateUserUseCase {
  execute(data: ICreateUser): Promise<IResponseData<IViewUser>>;
}
export interface IDeleteUserUseCase {
  execute(id: string): Promise<void>;
}
export interface IListUserUseCase {
  execute(id: string): Promise<IViewUser[]>;
}
export interface IUpdateUserUseCase {
  execute(id: string, data: IUpdateUser): Promise<void>;
}
export interface IGetUserByIdUseCase {
  execute(id: string): Promise<IResponseData<IViewUser>>;
}
export interface IGetUserUseCase {
  execute(): Promise<IResponseData<IViewUser>>;
}

export const ICreateUserUseCase = Symbol('ICreateUserUseCase');
export const IUpdateUseCase = Symbol('IUpdateUseCase');
export const IDeleteUserUseCase = Symbol('IDeleteUserUseCase');
export const IListUserUseCase = Symbol('IListUserUseCase');
export const IGetUserByIdUseCase = Symbol('IGetUserByIdUseCase');
export const IGetUserUseCase = Symbol('IGetUserUseCase');
