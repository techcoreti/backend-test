import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const databaseConfig = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: false,
  entities: ['dist/domain/entities/**/*.entity{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions;

// Utilizado para gerar e executar as migrations
const datasourceMigrations = async (): Promise<DataSource> => {
  return new DataSource({
    ...databaseConfig,
    ssl: false,
    migrations: ['dist/infrastructure/database/migrations/**/*.{js,ts}'],
    entities: ['src/domain/entities/**/*.entity{.ts,.js}'],
    synchronize: false,
  } as DataSourceOptions);
};

export const dataSourceMigrations = datasourceMigrations();
