import { IResponseData } from '@/domain/interfaces/commons/response.data';
import { IViewUser } from '@/domain/types/user';
import { ViewUserDto } from '@/modules/user/api/dtos/view.user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class ResponseUserDataDto implements IResponseData<IViewUser> {
  @ApiProperty({
    description: 'Lista de dados de usuários',
    type: [ViewUserDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'joaosilva',
        name: 'João Silva',
        email: 'joaosilva@email.com',
        profile: 'USER',
        isActive: true,
        createdAt: '2025-05-15T10:00:00.000Z',
        updatedAt: '2025-05-16T12:00:00.000Z',
        deletedAt: null,
      },
    ],
  })
  data: ViewUserDto[];

  @ApiProperty({
    description: 'Total de registros encontrados',
    example: 100,
  })
  totalRecords: number;
}
