import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ICreateUserUseCase } from '@/domain/interfaces/use-cases/user/user.use-case';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../api/dtos/create.user.dto';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<ResponseUserDataDto> {
    try {
      return this.userRepository.createUser(data);
    } catch (e) {
      throw e;
    }
  }
}
