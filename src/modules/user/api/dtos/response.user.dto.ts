import { IResponseData } from '@/domain/interfaces/commons/response.data';
import { IViewUser } from '@/domain/types/user';
import { plainToInstance, Transform } from 'class-transformer';
import { ViewUserDto } from './view.user.dto';

export class UserResponseDto implements IResponseData<IViewUser> {
  @Transform(({ value }) =>
    value.map((item) => plainToInstance(ViewUserDto, item)),
  )
  data: ViewUserDto[];
  totalRecords: number;
}
