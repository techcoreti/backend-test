import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './commons/base.entity';
import { UserEntity } from './user.entity';

@Entity('authentications')
export class AuthEntity extends BaseEntity {
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    type: 'varchar',
  })
  token: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
  })
  refreshToken: string;

  @Column({
    name: 'is_logged',
    type: 'boolean',
    default: true,
  })
  isLogged: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
