import { UserEntity } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ICreateUser, IUpdateUser } from '@/domain/types/user';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(UserRepository.name);
  }

  async createUser(data: ICreateUser): Promise<ResponseUserDataDto> {
    try {
      const user = await this.userRepository.save(data);
      return {
        data: [user],
        totalRecords: 1,
      };
    } catch (e) {
      this.logger.warn(this.createUser.name, e);
      throw new Error('Erro ao cadastrar o usuário.');
    }
  }
  async updateUser(id: string, data: IUpdateUser): Promise<void> {
    try {
      await this.userRepository.update({ id }, data);
    } catch (e) {
      this.logger.warn(this.updateUser.name, e);
      throw new Error('Erro ao atualizar o usuário.');
    }
  }
  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.softDelete(id);
    } catch (e) {
      this.logger.warn(this.deleteUser.name, e);
      throw new Error('Erro ao excluir o usuário.');
    }
  }
  async getUserById(id: string): Promise<ResponseUserDataDto> {
    try {
      const [data, totalRecords] = await this.userRepository.findAndCount({
        where: { id },
      });
      return {
        data,
        totalRecords,
      };
    } catch (e) {
      this.logger.warn(this.getUserById.name, e);
      throw new Error('Erro ao obter o cadastro do usuário.');
    }
  }
  async getUsers(): Promise<ResponseUserDataDto> {
    try {
      const [data, totalRecords] = await this.userRepository.findAndCount();
      return {
        data,
        totalRecords,
      };
    } catch (e) {
      this.logger.warn(this.getUsers.name, e);
      throw new Error('Erro ao listar os usuário.');
    }
  }
}
