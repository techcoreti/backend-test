import { IQueryRequest } from '@/domain/interfaces/commons/query.request';
import { OrderDirectionSearchDatabaseEnum } from '@/domain/shareds/enum/order.diretion.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class QueryRequestDTO implements IQueryRequest {
  @ApiProperty({
    name: 'order',
    type: 'string',
    description: 'Direção da ordenação dos registros. Padrão: desc',
    enum: OrderDirectionSearchDatabaseEnum,
    required: false,
  })
  @IsEnum(OrderDirectionSearchDatabaseEnum)
  @IsNotEmpty()
  order: OrderDirectionSearchDatabaseEnum =
    OrderDirectionSearchDatabaseEnum.desc;

  @ApiProperty({
    name: 'orderBy',
    type: 'string',
    description:
      'Nome da coluna pela qual os registros serão ordenados. Padrão: createdAt',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  orderBy: string = 'createdAt';

  @ApiProperty({
    name: 'page',
    type: 'number',
    description: 'Número da página que deseja visualizar. Padrão: 1.',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    name: 'size',
    type: 'number',
    description:
      'Quantidade de registros por página. Máximo: 100 registros. Padrão: 10.',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => +value)
  @IsOptional()
  size: number = 10;
}
