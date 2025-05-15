import { ISignInResponse } from '@/domain/commons/interfaces/auth.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignInResponseDto implements ISignInResponse {
  @ApiProperty({
    description: 'Token expiration time in seconds',
    example: 3600,
  })
  @Expose()
  expires: number;

  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Expose()
  tokenJwt: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
  })
  @Expose()
  refreshTokenJwt: string;
}
