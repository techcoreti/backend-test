import { CryptService } from '@/commons/utils/encrypt.utils';
import { sanitize } from '@/commons/utils/sanitive.class.utils';
import { UserEntity } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/interfaces/repositories/user.repository';
import { ICreateUser, IUpdateUser } from '@/domain/types/user';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { ViewUserDto } from '@/modules/user/api/dtos/view.user.dto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: Logger,
    private readonly cryptService: CryptService,
  ) {
    this.logger = new Logger(UserRepository.name);
  }

  async createUser(data: ICreateUser): Promise<ResponseUserDataDto> {
    try {
      const passCrypted = await this.cryptService.passwordCrypt(data.password);
      const user = await this.userRepository.save({
        ...data,
        password: passCrypted,
      });
      return {
        data: [sanitize(ViewUserDto, user)],
        totalRecords: 1,
      };
    } catch (e) {
      if (e instanceof TypeORMError) {
        this.logger.warn(
          this.createUser.name,
          'Registro duplicado na base de dados',
        );
        throw new BadRequestException('Registro duplicado na base de dados');
      } else {
        this.logger.warn(this.createUser.name, e);
      }
      throw new Error('Erro ao cadastrar o usuário.');
    }
  }
  async updateUser(id: string, data: IUpdateUser): Promise<void> {
    try {
      const passCrypted = await this.cryptService.passwordCrypt(data.password);
      await this.userRepository.update(
        { id },
        { ...data, password: passCrypted },
      );
    } catch (e) {
      if (e instanceof TypeORMError) {
        this.logger.warn(
          this.createUser.name,
          'Registro duplicado na base de dados',
        );
        throw new BadRequestException('Registro duplicado na base de dados');
      } else {
        this.logger.warn(this.updateUser.name, e);
        throw new Error('Erro ao atualizar o usuário.');
      }
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
        data: data.map((e) => sanitize(ViewUserDto, e)),
        totalRecords,
      };
    } catch (e) {
      this.logger.warn(this.getUserById.name, e);
      throw new Error('Erro ao obter o cadastro do usuário.');
    }
  }
  async getUsers(query: QueryRequestDTO): Promise<ResponseUserDataDto> {
    try {
      const order: any = {
        [query.orderBy]: query.order,
      };
      const [data, totalRecords] = await this.userRepository.findAndCount({
        take: query.size,
        skip: (query.page - 1) * query.size,
        order,
      });
      return {
        data: data.map((e) => sanitize(ViewUserDto, e)),
        totalRecords,
      };
    } catch (e) {
      this.logger.warn(this.getUsers.name, e);
      throw new Error('Erro ao listar os usuário.');
    }
  }
}
