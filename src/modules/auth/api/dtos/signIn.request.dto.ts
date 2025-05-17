import { ISignInRequest } from '@/domain/interfaces/commons/auth.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestDto implements ISignInRequest {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'user@example.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
