import { IHistorySignInUseCase } from '@/domain/interfaces/use-cases/auth/history.user.use-case';
import { ISignInRefreshTokenUseCase } from '@/domain/interfaces/use-cases/auth/signin.refresh.token.use-case';
import { ISignInUseCase } from '@/domain/interfaces/use-cases/auth/signin.user.use-case';
import { ISignOutUseCase } from '@/domain/interfaces/use-cases/auth/signout.user.use-case';
import { ProfileUserEnum } from '@/domain/shareds/enum/profile.user.enum';
import { QueryRequestDTO } from '@/modules/commons/dtos/query.request.dto';
import { ResponseAuthDataDto } from '@/modules/commons/dtos/response.auth.data.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Profile } from '../../../commons/profile/profile.decorator';
import { ProfileGuard } from '../../../commons/profile/profile.guard';
import { JwtGuard, JwtRefreshGuard } from '../../jwt.auth.guard';
import { SignInRequestDto } from '../dtos/signIn.request.dto';
import { SignInResponseDto } from '../dtos/signIn.response.dto';

@ApiTags('Autenticação')
@Controller('auth')
@ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
@ApiUnauthorizedResponse({ description: 'Usuário não autorizado' })
@ApiOkResponse({ description: 'Requisição bem-sucedida' })
export class AuthController {
  constructor(
    @Inject(ISignInUseCase)
    private readonly signInUseCase: ISignInUseCase,
    @Inject(ISignOutUseCase)
    private readonly signOutUseCase: ISignOutUseCase,
    @Inject(ISignInRefreshTokenUseCase)
    private readonly signInRefreshTokenUseCase: ISignInRefreshTokenUseCase,
    @Inject(IHistorySignInUseCase)
    private readonly historySignInUseCase: IHistorySignInUseCase,
  ) {}

  @HttpCode(200)
  @Post('sign-in')
  @ApiOperation({
    summary: 'Autenticar usuário',
    description: 'Autentica o usuário com email e senha e envia o código 2FA.',
  })
  @ApiBody({
    description: 'Dados para autenticação do usuário',
    type: SignInRequestDto,
  })
  @ApiResponse({
    status: 200,
    type: SignInResponseDto,
    description: 'Usuário autenticado com sucesso.',
  })
  async signIn(@Body() data: SignInRequestDto) {
    return this.signInUseCase.execute(data);
  }

  @HttpCode(200)
  @Post('sign-out')
  @ApiOperation({
    summary: 'Sair da conta',
    description: 'Invalida o login do usuário.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso.' })
  async signOut(@Request() req: any) {
    return this.signOutUseCase.execute({ userId: req.user.userId });
  }

  @HttpCode(200)
  @Post('/refresh-token')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Renovar token',
    description:
      'Renova o token de autenticação utilizando o refresh token no header.',
  })
  @ApiResponse({
    status: 200,
    type: SignInResponseDto,
    description: 'Token renovado com sucesso.',
  })
  @UseGuards(JwtRefreshGuard)
  async signInRefreshToken(@Request() req: any) {
    const { userId, refreshToken } = req.user;
    return this.signInRefreshTokenUseCase.execute(userId, refreshToken);
  }

  @HttpCode(200)
  @Get('/history')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Histórico de login',
    description:
      'Obtém o histórico de login dos usuários. Apenas administradores têm acesso.',
  })
  @ApiResponse({ status: 200, type: ResponseAuthDataDto })
  @UseGuards(JwtGuard, ProfileGuard)
  @Profile(ProfileUserEnum.ADMIN)
  async signInHistory(
    @Query() query: QueryRequestDTO,
  ): Promise<ResponseAuthDataDto> {
    return this.historySignInUseCase.execute(query);
  }
}
