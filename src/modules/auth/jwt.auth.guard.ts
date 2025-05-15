import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('JwtGuard') {}
export class JwtRefreshGuard extends AuthGuard('JwtRefreshGuard') {}
