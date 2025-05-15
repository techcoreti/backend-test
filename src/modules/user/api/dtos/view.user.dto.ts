import { ProfileUserEnum } from '@/domain/commons/enum/profile.user.enum';
import { IViewUser } from '@/domain/types/user';

export class ViewUserDto implements IViewUser {
  name: string;
  username: string;
  password: string;
  email: string;
  profile: ProfileUserEnum;
  isActive: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
