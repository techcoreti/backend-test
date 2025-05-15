import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserByIdUseCase,
  IGetUserUseCase,
  IUpdateUseCase,
} from '@/domain/interfaces/use-cases/user/user.use-case';
import { JwtGuard } from '@/modules/auth/jwt.auth.guard';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../use-cases/create.user.use-case';
import { DeleteUserUseCase } from '../../use-cases/delete.user.use-case';
import { UpdateUserUseCase } from '../../use-cases/update.user.use-case';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtGuard)
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
    summary: 'Register a new user',
    description:
      'This endpoint allows you to register a new user in the system.',
  })
  createUser(@Body() data: CreateUserDto): Promise<ResponseUserDataDto> {
    return this.createUserUseCase.execute(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Change user profile',
    description:
      'This endpoint allows you to change the profile of a user in the system.',
  })
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'This endpoint allows you to delete a user from the system.',
  })
  deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'This endpoint allows you to register a new user in the system.',
  })
  getUserById(@Param('id') id: string): Promise<ResponseUserDataDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'This endpoint allows you to register a new user in the system.',
  })
  getUsers(): Promise<ResponseUserDataDto> {
    return this.getUserUseCase.execute();
  }
}
