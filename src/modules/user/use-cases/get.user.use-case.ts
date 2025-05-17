import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IGetUserUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: QueryRequestDTO): Promise<ResponseUserDataDto> {
    try {
      return this.userRepository.getUsers(query);
    } catch (e) {
      throw e;
    }
  }
}
