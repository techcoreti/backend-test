import { IResponseData } from '@/domain/commons/dtos/response.data';
import { IViewAuth } from '@/domain/types/auth';

export class ResponseAuthDataDto implements IResponseData<IViewAuth> {
  data: IViewAuth[];
  totalRecords: number;
}
