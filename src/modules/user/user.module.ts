import { UserEntity } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserByIdUseCase,
  IGetUserUseCase,
  IUpdateUseCase,
} from '@/domain/interfaces/use-cases/user/user.use-case';
import { UserRepository } from '@/infrastructure/repositories/user.repository';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './api/controller/user.controller';
import { CreateUserUseCase } from './use-cases/create.user.use-case';
import { DeleteUserUseCase } from './use-cases/delete.user.use-case';
import { GetUserByIdUseCase } from './use-cases/get.user.by-id.use-case';
import { GetUserUseCase } from './use-cases/get.user.use-case';
import { UpdateUserUseCase } from './use-cases/update.user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    Logger,
    {
      provide: IUpdateUseCase,
      useClass: UpdateUserUseCase,
    },
    {
      provide: IDeleteUserUseCase,
      useClass: DeleteUserUseCase,
    },
    {
      provide: ICreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IGetUserByIdUseCase,
      useClass: GetUserByIdUseCase,
    },
    {
      provide: IGetUserUseCase,
      useClass: GetUserUseCase,
    },
  ],
})
export class UserModule {}
