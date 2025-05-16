import { IResponseData } from '@/domain/interfaces/commons/response.data';
import { IViewAuth } from '@/domain/types/auth';
import { ViewAuthDto } from '@/modules/auth/api/dtos/view.auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDataDto implements IResponseData<IViewAuth> {
  @ApiProperty({
    description: 'Lista de dados de autenticação',
    type: [ViewAuthDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        isActive: true,
        createdAt: '2025-05-15T10:00:00.000Z',
        '...': '...',
      },
    ],
  })
  data: IViewAuth[];

  @ApiProperty({
    description: 'Total de registros encontrados',
    example: 100,
  })
  totalRecords: number;
}
