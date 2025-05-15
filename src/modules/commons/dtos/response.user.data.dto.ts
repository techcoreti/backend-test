import { IResponseData } from '@/domain/commons/dtos/response.data';
import { IViewUser } from '@/domain/types/user';

export class ResponseUserDataDto implements IResponseData<IViewUser> {
  data: IViewUser[];
  totalRecords: number;
}
