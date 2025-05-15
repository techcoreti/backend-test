import { IHistorySignInUseCase } from '@/domain/interfaces/use-cases/auth/history.user.use-case';
import { ISignInRefreshTokenUseCase } from '@/domain/interfaces/use-cases/auth/signin.refresh.token.use-case';
import { ISignInUseCase } from '@/domain/interfaces/use-cases/auth/signin.user.use-case';
import { ISignOutUseCase } from '@/domain/interfaces/use-cases/auth/signout.user.use-case';
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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, JwtRefreshGuard } from '../../jwt.auth.guard';
import { SignInRequestDto } from '../dtos/signIn.request.dto';

@ApiTags('Authentication')
@Controller('auth')
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
  @ApiOperation({ summary: 'Authenticate user and password and send 2FA code' })
  @ApiBody({ type: SignInRequestDto })
  async signIn(@Body() data: SignInRequestDto) {
    return this.signInUseCase.execute(data);
  }

  @HttpCode(200)
  @Post('sign-out')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate refresh token' })
  @UseGuards(JwtGuard)
  async signOut(@Request() req: any) {
    return this.signOutUseCase.execute({ userId: req.user.userId });
  }

  @HttpCode(200)
  @Post('/refresh-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate refresh token' })
  @UseGuards(JwtRefreshGuard)
  async signInRefreshToken(@Request() req: any) {
    const { userId, refreshToken } = req.user;
    return this.signInRefreshTokenUseCase.execute(userId, refreshToken);
  }

  @HttpCode(200)
  @Get('/history')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validate refresh token' })
  @UseGuards(JwtGuard)
  async signInHistory(@Request() req: any, @Query() query: any) {
    console.log('query', query);
    console.log('req', req.user);
    return this.historySignInUseCase.execute(query);
  }
}
