import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserByIdUseCase,
  IGetUserUseCase,
  IUpdateUseCase,
} from '@/domain/interfaces/use-cases/user/user.use-case';
import { JwtGuard } from '@/modules/auth/jwt.auth.guard';
import { ParamsRequestDTO } from '@/modules/commons/dtos/params.request.dto';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserUseCase } from '../../use-cases/create.user.use-case';
import { DeleteUserUseCase } from '../../use-cases/delete.user.use-case';
import { UpdateUserUseCase } from '../../use-cases/update.user.use-case';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';

@ApiTags('Usuários')
@Controller('users')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
@ApiUnauthorizedResponse({ description: 'Usuário não autorizado.' })
export class UserController {
  constructor(
    @Inject(ICreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(IDeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(IUpdateUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(IGetUserByIdUseCase)
    private readonly getUserByIdUseCase: IGetUserByIdUseCase,
    @Inject(IGetUserUseCase)
    private readonly getUserUseCase: IGetUserUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar um novo usuário',
    description: 'Este endpoint permite registrar um novo usuário no sistema.',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  createUser(@Body() data: CreateUserDto): Promise<ResponseUserDataDto> {
    return this.createUserUseCase.execute(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar perfil do usuário',
    description:
      'Este endpoint permite alterar o perfil de um usuário no sistema.',
  })
  @ApiResponse({ status: 200, description: 'Cadastro atualizado com sucesso.' })
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um usuário',
    description: 'Este endpoint permite excluir um usuário do sistema.',
  })
  @ApiResponse({ status: 200, description: 'Cadastro excluido com sucesso.' })
  deleteUser(@Param() { id }: ParamsRequestDTO) {
    return this.deleteUserUseCase.execute(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter usuário por ID',
    description: 'Este endpoint permite obter os dados de um usuário pelo ID.',
  })
  @ApiResponse({ status: 200, type: ResponseUserDataDto })
  getUserById(@Param() { id }: ParamsRequestDTO): Promise<ResponseUserDataDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Este endpoint permite listar todos os usuários do sistema.',
  })
  @ApiResponse({ status: 200, type: ResponseUserDataDto })
  getUsers(): Promise<ResponseUserDataDto> {
    return this.getUserUseCase.execute();
  }
}
