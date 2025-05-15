import { UserEntity } from '../entities/user.entity';

export type ICreateUser = Omit<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'isActive'
>;
export type IUpdateUser = Omit<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'isActive'
>;
export type IViewUser = UserEntity;
