import { UserEntity } from '@/domain/entities/user.entity';
import { IViewAuth } from '@/domain/types/auth';
import { ApiProperty } from '@nestjs/swagger';

export class ViewAuthDto implements IViewAuth {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'Token de autenticação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
    type: String,
  })
  token: string;

  @ApiProperty({
    description: 'Token de atualização (refresh token)',
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
    required: false,
    type: String,
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Indica se o usuário está logado',
    example: true,
    required: false,
    type: Boolean,
  })
  isLogged: boolean;

  @ApiProperty({
    description: 'Dados do usuário',
    type: UserEntity,
    required: false,
  })
  user: UserEntity;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2025-05-15T10:00:00.000Z',
    required: false,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2025-05-16T12:00:00.000Z',
    required: false,
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'ID do registro de autenticação',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false,
    type: String,
  })
  id: string;
}
