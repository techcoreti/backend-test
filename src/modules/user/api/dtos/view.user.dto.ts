import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { IViewUser } from '@/domain/types/user';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Expose()
export class ViewUserDto implements IViewUser {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Nome de usuário (username)',
    example: 'joaosilva',
  })
  username: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joaosilva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Perfil do usuário',
    example: ProfileUserEnum.USER,
    enum: ProfileUserEnum,
  })
  profile: ProfileUserEnum;

  @ApiProperty({
    description: 'Indica se o usuário está ativo',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2025-05-15T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do usuário',
    example: '2025-05-16T12:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do usuário (caso tenha sido excluído)',
    example: null,
  })
  deletedAt: Date;
}
