import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        Object.assign(databaseConfig, { autoLoadEntities: true }),
    }),
  ],
  exports: [],
})
export class DataBaseModule {}
