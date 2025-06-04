// config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export default () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.APP_ENV === 'development',
    autoLoadEntities: true,
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
  } as TypeOrmModuleOptions,
});
