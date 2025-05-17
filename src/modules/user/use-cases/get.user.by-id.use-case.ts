import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IGetUserByIdUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ViewUserDto } from '../api/dtos/view.user.dto';

@Injectable()
export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<ResponseUserDataDto> {
    try {
      const value = await this.userRepository.getUserById(id);

      // Remove campos que não são necessários na resposta
      const user = value.data.map((user) => plainToInstance(ViewUserDto, user));
      return {
        data: user,
        totalRecords: value.totalRecords,
      };
    } catch (e) {
      throw e;
    }
  }
}
