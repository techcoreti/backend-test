import * as dotenv from 'dotenv';

dotenv.config();

const AppEnvs = () => ({
  isDevelopment: process.env.ENVIRONMENT !== 'production',

  application: {
    serviceName: 'auth-service',
    port: process.env.HTTP_PORT,
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: +process.env.DATABASE_PORT,
    logging: false,
    synchronize: true,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  },
  auth: {
    jwtSecret: process.env.TOKEN_JWT_SECRET || '',
    tokenExpiresIn: process.env.TOKEN_JWT_EXPIRES || '',
    refreshTokenSecret: process.env.REFRESH_TOKEN_JWT_SECRET || '',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_JWT_EXPIRES || '',
    publicKey: process.env.PUBLIC_KEY || '',
    privateKey: process.env.PRIVATE_KEY || '',
  },
});

export type AppEnvsType = ReturnType<typeof AppEnvs>;
export default AppEnvs;
