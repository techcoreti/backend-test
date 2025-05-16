import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { IUpdateUser } from '@/domain/types/user';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto implements IUpdateUser {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @Exclude()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senhaSegura123',
  })
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joaosilva@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Perfil do usuário',
    example: ProfileUserEnum.USER,
    enum: ProfileUserEnum,
  })
  @IsEnum(ProfileUserEnum)
  @IsOptional()
  @IsNotEmpty()
  profile: ProfileUserEnum;
}
