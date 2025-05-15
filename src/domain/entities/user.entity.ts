import { Column, Entity } from 'typeorm';
import { ProfileUserEnum } from '../commons/enum/profile.user.enum';
import { BaseEntity } from './commons/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: ProfileUserEnum,
    default: ProfileUserEnum.USER,
  })
  profile: ProfileUserEnum;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
