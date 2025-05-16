import { ISignInResponse } from '@/domain/interfaces/commons/auth.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto implements ISignInResponse {
  @ApiProperty({
    description: 'Tempo de expiração do token em segundos',
    example: 3600,
  })
  expires: number;

  @ApiProperty({
    description: 'Token JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  tokenJwt: string;

  @ApiProperty({
    description: 'Token de atualização (refresh token)',
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
  })
  refreshTokenJwt: string;
}
