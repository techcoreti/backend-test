import { CryptService } from '@/commons/utils/encrypt.utils';
import { AuthEntity } from '@/domain/entities/auth.entity';
import { UserEntity } from '@/domain/entities/user.entity';
import {
  ISignInRequest,
  ISignOutRequest,
} from '@/domain/interfaces/commons/auth.interface';
import { IAuthRepository } from '@/domain/interfaces/repositories/auth.repository';
import { SignInResponseDto } from '@/modules/auth/api/dtos/signIn.response.dto';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseAuthDataDto } from '@/modules/commons/dtos/response.auth.data.dto';
import { ViewUserDto } from '@/modules/user/api/dtos/view.user.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly cryptoService: CryptService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(AuthRepository.name);
  }

  /**
   * @description Método responsável por autenticar o usuário
   * @param data.username - Nome de usuário
   * @param data.password - Senha do usuário
   * @returns - Retorna o usuário
   * @throws - Lança uma exceção se o usuário não existir ou se a senha estiver incorreta
   * @throws - Lança uma exceção se ocorrer um erro ao validar o usuário
   */
  async signIn(data: ISignInRequest): Promise<ViewUserDto> {
    try {
      // Verifica se o usuário existe
      const userData = await this.userRepository.findOne({
        where: { username: data.username, isActive: true },
      });

      if (!userData) {
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      // Faz a comparação da senha fornecida com a senha armazenada
      const passIsValid = await this.cryptoService.passwordValidate(
        data.password,
        userData.password,
      );

      if (!passIsValid) {
        throw new UnauthorizedException('Senha incorreta.');
      }

      // Retorna os dados do usuário para gerar o token
      return userData;
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        this.logger.log(e.message);
      } else {
        this.logger.error('Erro ao validar o usuário.', e);
      }
      throw new UnauthorizedException();
    }
  }

  /**
   * @description Método responsável por deslogar o usuário
   * @param data
   * @throws - Lança uma exceção se ocorrer um erro deslogas o usuário
   */
  async signOut(data: ISignOutRequest): Promise<void> {
    try {
      const { affected } = await this.authRepository.update(
        { userId: data.userId },
        { isLogged: false },
      );
      if (affected < 1) {
        throw new UnauthorizedException(
          'Usuário não encontrado ou não logado.',
        );
      }
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        this.logger.log(e.message);
      } else {
        this.logger.error('Erro ao validar o usuário.', e);
      }
      throw new UnauthorizedException();
    }
  }

  /**
   * @description Método responsável por verificar pelo id se o usuário está logado
   * é possivel incluir o refreshToken
   * @param userId - ID do usuário
   * @throws - Lança uma exceção se o usuário não estiver logado
   */
  async signInRefresh(userId: string): Promise<ViewUserDto> {
    try {
      // Verifica se o usuário existe e está logado
      const userData = await this.userRepository.findOne({
        where: { id: userId, isActive: true },
      });

      if (!userData) {
        throw new UnauthorizedException('Usuário não encontrado ou logado.');
      }

      return userData;
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        this.logger.log(e.message);
      } else {
        this.logger.log('Erro ao validar o usuário.', e);
      }

      throw new UnauthorizedException();
    }
  }

  /**
   * @description Método responsável por armazenar os dados de autenticação do usuário
   * @param data ViewUserDto
   * @param auth SignInResponseDto
   */
  async storeAuth(data: ViewUserDto, auth: SignInResponseDto): Promise<any> {
    try {
      // Invalida o login anterior do usuário
      await this.authRepository.update(
        { userId: data.id, isLogged: true },
        { isLogged: false },
      );

      // Armazena os dados do novo login
      await this.authRepository.save({
        userId: data.id,
        token: auth.tokenJwt,
        refreshToken: auth.refreshTokenJwt,
        isLogged: true,
      });
    } catch (e) {
      this.logger.error('Erro ao validar o usuário.', e);
      throw new UnauthorizedException();
    }
  }

  /**
   * @description Método responsável por validar o token e login do usuário
   * @param token - Token do usuário
   * @param id - ID do usuário
   * @throws - Lança uma exceção se o usuário não existir
   */
  async isLogged(id: string): Promise<void> {
    const logged = await this.authRepository.findOne({
      where: { userId: id, isLogged: true },
    });
    if (!logged) {
      throw new UnauthorizedException();
    }
  }

  /**
   * @description Método responsável por buscar o histórico de logins do usuário
   * @returns - Retorna o histórico de logins do usuário
   * @throws - Lança uma exceção se ocorrer um erro ao buscar o histórico de logins
   * @param query - Query para buscar o histórico de logins
   */
  async signInHistory(query: QueryRequestDTO): Promise<ResponseAuthDataDto> {
    const order: any = {
      [query.orderBy]: query.order,
    };
    try {
      const [data, totalRecords] = await this.authRepository.findAndCount({
        take: query.size,
        skip: (query.page - 1) * query.size,
        order,
        relations: ['user'],
      });
      return {
        data,
        totalRecords,
      };
    } catch (e) {
      this.logger.error('Erro ao buscar o histórico de logins.', e);
      throw new UnauthorizedException();
    }
  }
}
