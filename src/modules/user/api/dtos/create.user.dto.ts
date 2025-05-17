import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { ICreateUser } from '@/domain/types/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements ICreateUser {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Type profile of the user',
    example: ProfileUserEnum.USER,
    enum: ProfileUserEnum,
  })
  @IsEnum(ProfileUserEnum)
  @IsNotEmpty()
  profile: ProfileUserEnum;
}
