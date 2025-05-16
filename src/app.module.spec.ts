import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import AppEnvs from './infrastructure/config/app.config';
import { DataBaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [AppEnvs] }),
        AuthModule,
        UserModule,
        DataBaseModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should load ConfigModule as global', () => {
    const configModule = appModule.get(ConfigModule);
    expect(configModule).toBeDefined();
  });

  it('should include AuthModule', () => {
    const authModule = appModule.get(AuthModule);
    expect(authModule).toBeDefined();
  });

  it('should include UserModule', () => {
    const userModule = appModule.get(UserModule);
    expect(userModule).toBeDefined();
  });

  it('should include DataBaseModule', () => {
    const databaseModule = appModule.get(DataBaseModule);
    expect(databaseModule).toBeDefined();
  });
});
