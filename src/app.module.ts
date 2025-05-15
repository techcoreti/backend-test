import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppEnvs from './infrastructure/config/app.config';
import { DataBaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppEnvs] }),
    AuthModule,
    UserModule,
    DataBaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
