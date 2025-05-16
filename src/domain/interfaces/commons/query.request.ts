import { OrderDirectionSearchDatabaseEnum } from '@/domain/shareds/enum/order.diretion.enum';

export interface IQueryRequest {
  order: OrderDirectionSearchDatabaseEnum;
  orderBy: string;
  page: number;
  size: number;
}
