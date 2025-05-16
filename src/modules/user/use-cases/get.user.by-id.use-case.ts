import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { IGetUserByIdUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<ResponseUserDataDto> {
    try {
      return this.userRepository.getUserById(id);
    } catch (e) {
      throw e;
    }
  }
}
