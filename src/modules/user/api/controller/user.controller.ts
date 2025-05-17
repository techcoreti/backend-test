import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserByIdUseCase,
  IGetUserUseCase,
  IUpdateUseCase,
} from '@/domain/interfaces/use-cases/user/user.use-case';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { JwtGuard } from '@/modules/auth/jwt.auth.guard';
import { ParamsRequestDTO } from '@/modules/commons/dtos/params.request.dto';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseUserDataDto } from '@/modules/commons/dtos/response.user.data.dto';
import { Profiles } from '@/modules/commons/profile/profile.decorator';
import { ProfileGuard } from '@/modules/commons/profile/profile.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
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
  @UseGuards(JwtGuard, ProfileGuard)
  @Profiles(ProfileUserEnum.ADMIN)
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
  @UseGuards(JwtGuard, ProfileGuard)
  @Profiles(ProfileUserEnum.ADMIN)
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um usuário',
    description: 'Este endpoint permite excluir um usuário do sistema.',
  })
  @ApiResponse({ status: 200, description: 'Cadastro excluido com sucesso.' })
  @UseGuards(JwtGuard, ProfileGuard)
  @Profiles(ProfileUserEnum.ADMIN)
  deleteUser(@Param() { id }: ParamsRequestDTO) {
    return this.deleteUserUseCase.execute(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter usuário por ID',
    description: 'Este endpoint permite obter os dados de um usuário pelo ID.',
  })
  @ApiResponse({ status: 200, type: ResponseUserDataDto })
  @UseGuards(JwtGuard, ProfileGuard)
  @Profiles(ProfileUserEnum.ADMIN)
  getUserById(@Param() { id }: ParamsRequestDTO): Promise<ResponseUserDataDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Este endpoint permite listar todos os usuários do sistema.',
  })
  @ApiResponse({ status: 200, type: ResponseUserDataDto })
  @UseGuards(JwtGuard, ProfileGuard)
  @Profiles(ProfileUserEnum.ADMIN)
  getUsers(@Query() query: QueryRequestDTO): Promise<ResponseUserDataDto> {
    return this.getUserUseCase.execute(query);
  }
}
